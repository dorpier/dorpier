// this example can be pasted in your console after you paste the minified library (https://raw.githubusercontent.com/13-05/discord.js-pure/main/inspect-console/minified.js)

client = new Discord.Client();

client.on('ready', async function() {
  Utils.Logger.Log(`MessageLogger is loaded and ready! Running on the current account, ${client.user}`);
});

client.on('message_create', async function(message) {
  console.log(`${message.guild_id}/${message.channel_id} ${message.author.username}#${message.author.discriminator}: ${message.content.trim()}`);
});

client.connect();
