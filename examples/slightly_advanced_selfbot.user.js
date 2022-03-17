// ==UserScript==
// @name        PURE_SB
// @match       https://discord.com/*
// @grant       none
// @require https://raw.githubusercontent.com/13-05/discord.js-pure/main/stable/discordjs-pure.js
// @version     1.0
// @author      1305
// @description An example selfbot for Discord.JS-Pure...
// ==/UserScript==

(async function(){ // has to be an async function so we can use the userid-get function
  'use strict';
  let PREFIX = "YOUR_PREFIX_HERE."; // put your prefix here and whatever but keep the period; it's a separator between the prefix & cmd.
  Discord.Logger.enable(); // enable logs
  Discord.experimental.amoled_dark_mode.enable(); // enable pog dark mode
  let token = client.get_token(); // fetch token
  let userid = await client.get_userid(token); // grab the userid
  
  client.on_ready = function() { // onready event
    Discord.Logger.Log(`Selfbot is ready! Prefix is '${PREFIX}'`);
  }
  
  client.on_message = function(message, token){ // on_message event
    if (message.author.id != userid) return; // if the message author is not you, return.
    if (message.content.trim() == `${PREFIX}test`) { // you have to call message.content.trim() when getting message content because if you don't, there's sometimes whitespace that makes your message checking not work.
      client.send_message("test success!", message.channel_id, token); // say "test success!" cos why not
    }
  }
  
  
  client.run(token); // run the selfbot
})();
