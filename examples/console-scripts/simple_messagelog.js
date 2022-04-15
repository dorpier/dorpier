// Paste in minified library (https://raw.githubusercontent.com/13-05/discord.js-pure/main/minified.js)

client = new Discord.Client();

client.on("ready", () => {
    Utils.Logger.log(
        `MessageLogger is loaded and ready! Running on the current account, ${client.user}`,
    );
});

client.on("message_create", async (message) => {
    console.log(
        `${message.guild_id}/${message.channel_id} ${message.author.username}#${
            message.author.discriminator
        }: ${message.content.trim()}`,
    );
});

client.connect();
