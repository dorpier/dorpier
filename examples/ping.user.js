// ==UserScript==
// @name        testing discord.js-pure
// @match       https://discord.com/*
// @grant       none
// @version     1.0
// @author      1305
// @require https://raw.githubusercontent.com/13-05/discord.js-pure/main/stable/discordjs-pure.js
// ==/UserScript==


let GLOBAL_USER_TOKEN = client.get_token();
let USERID = client.get_userid(GLOBAL_USER_TOKEN);

client.on_message = function(message, token) {
  let content = message.content.trim(); // sometimes the message content has whitespace at the end, so we just say message.content.trim() is == to message.content
  if (message.author.id.toString() != USERID) {
    return;
  }
  else{
    if (content == "ping"){
      client.send_message("pong!", message.channel_id, token); // i looked at the "message" object and that's the path of a channelid; now it'll respond ez!
    }
  }
}

client.run(GLOBAL_USER_TOKEN);
