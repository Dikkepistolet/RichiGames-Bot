const discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("KICK_MEMBERS")) return message.reply("Sorry jij kan dit niet.");

    if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply("Geen permissie.");

    if (!args[0]) return message.reply("Geen gebruiker opgegeven.");

    var mutePerson = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

    if (!mutePerson) return message.reply("Gebruiker niet gevonden.");

    if (mutePerson.hasPermission("MANAGE_MESSAGES")) return message.reply("Ongeldige gebruiker");

    var memberRole = message.guild.roles.cache.get('827079696742875176');

    var muteRole = message.guild.roles.cache.get('868792072151388180');
    if (!muteRole) return message.reply("De rol muted bestaat niet.");

    var muteTime = args[2];

    if (!muteTime) return message.reply("Geen tijd opgegeven.");

    await (mutePerson.roles.add(muteRole.id));
    await (mutePerson.roles.remove(memberRole.id));
    message.reply(`${mutePerson} is gemuted voor ${muteTime}`);

    setTimeout(() => {

        mutePerson.roles.remove(muteRole.id);
        mutePerson.roles.add(memberRole.id);

        message.reply(`${mutePerson} is geunmute.`);

    }, ms(muteTime));

}

module.exports.help = {
    name: "tempmute"
}