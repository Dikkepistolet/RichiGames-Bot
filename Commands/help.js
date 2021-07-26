const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    try {

        var text = "**RICHIGAMES BOT** \n\n **__Commands__** \n .hallo - geeft hallo terug. \n .info - geeft info. \n .help - dit scherm. \n\n **__Admin Commands__** \n .kick - kickt de vernoemde persoon. \n .warn - waarschuwt de vermelde persoon \n .tempmute - mute de vermelde persoon voor een x aantal sec, min, uren \n";

        message.author.send(text);

        message.reply("Alle commands kun je vinden in je DM's");

    } catch (error) {
        message.reply("Er is iets fout gelopen");
    }
}

module.exports.help = {
    name: "help"
}