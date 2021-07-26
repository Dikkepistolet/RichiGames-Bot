const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Sorry jij kan dit niet doen.");

    var seperator = "|";

    if (args[0] == null) {

        var embed = new discord.MessageEmbed()
            .setTitle("Gebruik")
            .setColor("#fff600")
            .setDescription(`Maak een announcement door gebruik te maken van: \n .announcement titel ${seperator} bericht ${seperator} kleur ${seperator} kanaal`);

        return message.reply(embed);

    }

    var argsList = args.join(" ").split(seperator);

    if (argsList[2] === undefined) argsList[2] = "#fff600";
    if (argsList[3] === undefined) argsList[3] = "📣-mededelingen";

    var options = {

        titel: argsList[0],
        bericht: argsList[1] || "Geen inhoud meegegeven",
        kleur: argsList[2].trim(),
        kanaal: argsList[3].trim()

    }

    var announceEmbed = new discord.MessageEmbed()
        .setTitle("Announcement")
        .setColor(options.kleur)
        .setDescription(`Bericht van ${message.author} \n\n **${options.titel}** \n\n ${options.bericht}`)
        .setTimestamp();

    var channel = message.member.guild.channels.cache.find(channels => channels.name === options.kanaal);
    if (!channel) return message.reply("Dit kanaal bestaat niet");

    channel.send(announceEmbed);

}

module.exports.help = {
    name: "announcement"
}