// this example can be pasted in your console after you paste the minified library (https://raw.githubusercontent.com/13-05/discord.js-pure/main/inspect-console/minified.js)

await Discord.load_required_variables();
Discord.Logger.enable();

client.on_ready = async function() {
  Discord.Logger.Log(`MessageLogger is loaded and ready! Running on the current account, ${client.user}`);
}

client.on_message = async function(message) {
  console.log(`${message.guild_id}/${message.channel_id} ${message.author.username}#${message.author.discriminator}: ${message.content.trim()}`);
}

client.run();
