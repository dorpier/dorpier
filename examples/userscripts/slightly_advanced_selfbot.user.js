// ==UserScript==
// @name        PURE_SB
// @match       https://discord.com/*
// @grant       none
// @require https://raw.githubusercontent.com/13-05/discord.js-pure/main/nightly/src/main.js
// @version     1.0
// @author      1305
// @description An example selfbot for Discord.JS-Pure...
// ==/UserScript==

(async function(){ // has to be an async function so we can use the userid-get function
    'use strict';
    client = new Client();
  
    /* optional stuff that makes it better */
    let USERID = await client.user.id
    let PREFIX = "?"; // put your prefix here and whatever 
  
    /* actual events for the bot yea ezpz xd */
    client.on('ready', async function() { // onready event
        Utils.Logger.log(`Logged into ${client.user.username}! Prefix is ${PREFIX}`);
        alert(`Logged into ${client.user.username}! Prefix is ${PREFIX}`);
    });

    client.on('message_create', async function(message){
        let message = message.message;
        if (message.author.id != USERID) return; // if the message author is not you, ignore the command.
        if (message.content.trim() == `${PREFIX}ping`) { // you have to call message.content.trim() when getting message content because if you don't, there's sometimes whitespace that makes your message checking not work.
            await client.sendMessage(message.channel_id, "pong!"); // reply 'pong!' in that message's channel
        }
    });

    client.connect();
})();
