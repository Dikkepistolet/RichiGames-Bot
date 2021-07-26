const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const client = new discord.Client();
client.login(process.env.Token); 
client.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsfiles = files.filter(f => f.split(".").pop() === "js");

    if (jsfiles.length <= 0) {
        console.log("Kon geen files vinden");
        return;
    }

    jsfiles.forEach((f, i) => {

        var fileGet = require(`./Commands/${f}`);
        console.log(`${f} command is geladen`);

        client.commands.set(fileGet.help.name, fileGet);

    })

});

client.on("guildMemberAdd", member => {

    var role = member.guild.roles.cache.get('827079696742875176')

    if (!role) return;

    member.roles.add(role);

    var channel = member.guild.channels.cache.get('827075209223864361');

    if (!channel) return;

    channel.send(`Hoi ${member}, welkom bij de **RichiGames DC 2.0**!`);

})

client.on("ready", async () => {

    console.log(`${client.user.username} is online`);
    client.user.setActivity(".help", { type: "LISTENING" });

});

client.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type == "dm") return;

    var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    if (!message.content.startsWith(prefix)) return;

    var arguments = messageArray.slice(1);

    var commands = client.commands.get(command.slice(prefix.length));

    if (commands) commands.run(client, message, arguments);

})
