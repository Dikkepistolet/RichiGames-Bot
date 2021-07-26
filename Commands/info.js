const discord = require("discord.js");

module.exports.run = async(bot, message, args) => {

    var botEmbed = new discord.MessageEmbed()
            .setTitle("Info")
            .setDescription("----------")
            .setColor("#fff600")          
            .addFields(
                {name: "Bot naam", value: bot.user.username},
                {name: "Je ben gejoind op: ", value: message.member.joinedAt},
                {name: "Totaal members", value: message.guild.memberCount}
            )
            .setThumbnail("https://yt3.ggpht.com/ytc/AAUvwniGB79wSpjPwg2xAeBx-C6Po1bIzvua92Ri0orPWQ=s176-c-k-c0x00ffffff-no-rj")
            .setFooter(".info", "https://yt3.ggpht.com/ytc/AAUvwniGB79wSpjPwg2xAeBx-C6Po1bIzvua92Ri0orPWQ=s176-c-k-c0x00ffffff-no-rj")
            .setTimestamp();
        
        return message.channel.send(botEmbed);
    

}

module.exports.help = {
    name: "info"
}