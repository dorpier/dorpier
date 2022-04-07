// ==UserScript==
// @name        PURE_SB
// @match       https://discord.com/*
// @grant       none
// @require https://raw.githubusercontent.com/13-05/discord.js-pure/main/src/main.js
// @version     1.0
// @author      1305
// @description An example selfbot for Discord.JS-Pure...
// ==/UserScript==

(async function(){ // has to be an async function so we can use the userid-get function
  'use strict';
  /* required for the selfbot to run */
  await Discord.load_required_variables();
  
  /* optional stuff that makes it better */
  let userid = await client.get_userid(); // let the selfbot only work for you
  let PREFIX = "?"; // put your prefix here and whatever 
  
  
  /* actual events for the bot yea ezpz xd */
  client.on_ready = async function() { // onready event
    Discord.Logger.Log(`Logged into ${client.user}! Prefix is ${PREFIX}`);
    alert(`Logged into ${client.user}! Prefix is ${PREFIX}`);
  }
  
  client.on_message = async function(message){
    if (message.author.id != userid) return; // if the message author is not you, ignore the command.
    if (message.content.trim() == `${PREFIX}ping`) { // you have to call message.content.trim() when getting message content because if you don't, there's sometimes whitespace that makes your message checking not work.
      await client.send_message("pong!", message.channel_id); // reply 'pong!' in that message's channel
    }
  }
  
  
  client.run(); // run the selfbot
})();
