// ==UserScript==
// @name        Ping-SB
// @match       *://discord.com/*
// @grant       none
// @version     1.0
// @require https://raw.githubusercontent.com/13-05/discord.js-pure/main/stable/discordjs-pure.js
// @author      1305
// @description A 'ping' selfbot written in the pure javascript version of discord.js!
// @run-at document-start
// ==/UserScript==
(async function() {
    'use strict';
  Discord.experimental.amoled_dark_mode.enable();
  let token = client.get_token();
  var userid = await client.get_userid(token);
  let PREFIX = prompt("prefix: ");
  client.on_message=function(message,token){
    if (message.author.id.toString() != userid) return;
    if (message.content.trim() == `${PREFIX}ping`){
      client.send_message("pong!", message.channel_id, token);
      }
   }
  client.run(token);
})();
