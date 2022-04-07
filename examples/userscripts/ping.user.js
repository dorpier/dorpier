// ==UserScript==
// @name        Ping-SB
// @match       *://discord.com/*
// @grant       none
// @version     1.0
// @require https://raw.githubusercontent.com/13-05/discord.js-pure/main/src/main.js
// @author      1305
// @description A 'ping' selfbot written in the pure javascript version of discord.js!
// @run-at document-start
// ==/UserScript==
(async function() {
    /* required for the library to run */
    await Discord.load_required_variables();
    
    
    /* optional but highly recommended */
    let USERID = await client.get_userid();
    
    
    /* events */
    client.on_ready = function() {
      Discord.Logger.Log(`Selfbot's up and running on ${client.user}`);
      window.alert(`Selfbot's up and running on ${client.user}`);
    }
    
    client.on_message = function(message) {
      if (message.author.id != USERID) { return; } // makes it so the selfbot only responds to you
      
      if (message.content.trim() == "ping") { // `.trim()` is required due to the fact that discord straps whitespace to content ig
        await client.send_message("pong!", message.channel_id); // responds to the ping with pong in the message's channelid
      }
    }
    
    client.run(); // runs ya boy's selfbot
})();
