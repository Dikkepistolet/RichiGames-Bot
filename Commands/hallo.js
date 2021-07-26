const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    return message.channel.send("Hallo! Ik ben de RichiGames bot.");

}

module.exports.help = {
    name: "hallo"
}