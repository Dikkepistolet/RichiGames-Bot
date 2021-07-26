const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {


        if(!message.member.hasPermission("BAN_MEMBERS")) return message.reply("Sorry jij kan dit niet.");

        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.reply("Geen permissie.");

        if(!args[0]) return message.reply("Geen gebruiker opgegeven.");

        if(!args[2]) return message.reply("Geen redenen opgegeven.");

        var banUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

        var reason = args.slice(1).join(" ");

        if(!banUser) return message.reply("Gebruiker niet gevonden.");

        if(banUser.hasPermission("MANAGE_MESSAGES")) return message.reply("Ongeldige gebruiker");

        var embedPrompt = new discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor("Gelieve binnen 30 seconden te reageren.")
            .setDescription(`Wil je ${banUser} bannen?`);

        var embed = new discord.MessageEmbed()
            .setColor("ff0000")
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()  
            .setDescription(`** Gebant:** ${banUser} (${banUser.id})
            **Gebant door:** ${message.author}
            **Redenen: ** ${reason}`);
            
        message.channel.send(embedPrompt).then(async msg => {

            var emoji = await promptMessage(msg, message.author, 30, ["✅", "❌"]);

            message.channel.awaitMessages(m => m.author.id == message.author.id,
                     { max: 1, time: 30000 }).then(collected => {
     
                         if (collected.first().content.toLowerCase() == 'yes') {
                             message.reply('Ban speler.');
                         }
                         else
                             message.reply('Geanuleerd');
     
                     }).catch(() => {
                        message.reply('Geen antwoord na 30 sec, geanuleerd.');
                     });

            if(emoji === "✅"){

              msg.delete();
              
              banUser.ban(reason).catch(err => {
                  if (err) return message.channel.send("Er is iets fout gelopen");
              });

              message.reply(embed);             
 
            } else if (emoji === "❌") {

                msg.delete();

                return message.reply("Ban geanuleerd").then(m => m.delete(5000));

            }

        })  

    }



async function promptMessage(message, author, time, reactions){

    time *= 1000;

    for(const reaction of reactions){
        await message.react(reaction);
    }

    var filter = (reaction, user) => reactions.includes(reaction.emoji.name) && user.id === author.id;

    return message.awaitReactions(filter, { max:1, time: time }).then(collected => collected.first() && collected.first().emoji.name);

}



module.exports.help = {
    name: "ban"
}