const discord = require("discord.js");
const fs = require("fs");
const warns = JSON.parse(fs.readFileSync("./warnings.json", "utf8"));

module.exports.run = async(bot, message, args) => {

        if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Sorry jij kan dit niet.");

        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Geen permissie.");

        if(!args[0]) return message.reply("Geen gebruiker opgegeven.");

        if(!args[2]) return message.reply("Geen redenen opgegeven.");

        var warnUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        var reason = args.slice(1).join(" ");

        if(!warnUser) return message.reply("Gebruiker niet gevonden.");

        if(warnUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Ongeldige gebruiker");

        if(!warns[warnUser.id]) warns[warnUser.id] = {
            warns: 0
        };

        warns[warnUser.id].warns++;

        fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
            if (err) console.log(err);
        });

        var embed = new discord.MessageEmbed()
            .setColor("ff0000")
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()  
            .setDescription(`** Gewarnt:** ${warnUser} (${warnUser.id})
            **Gewarnt door:** ${message.author}
            **Redenen: ** ${reason}`)
            .addField("Aantal warns", warns[warnUser.id].warns);


        var channel = message.member.guild.channels.cache.get("848069689912721418");

        if(!channel) return;

        channel.send(embed);

        if (warns[warnUser.id].warns == 3) {

            var embed = new discord.MessageEmbed()
            .setColor("ff0000")
            .setDescription("PAS OP")           
            .addField("Bericht", "Je hebt nog 1 waarschuwing voor een kick!");

            message.channel.send(embed);

        } else if(warns[warnUser.id].warns == 4){
            message.guild.member(warnUser).kick(reason);
            message.channel.send(`${warnUser} is gekickt door RichiGames Bot wegens te veel waarschuwingen`);
        }

    }

module.exports.help = {
    name: "warn"
}