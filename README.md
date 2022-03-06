# DISCORD.JS-PURE
A Discord API wrapper, written in pure javascript! You could run it in the inspect element console of chrome, nothing to download! 
(NOTE: the main branch will always have the most stable version of the script, the unstable branch will always have our unstable releases, etc.)

## Usage
Add a reference to this in your code like so:
```js
// @require https://raw.githubusercontent.com/13-05/discord.js-pure/main/stable/discordjs-pure.js
```

Then, you can use it in your javascript like so:

```js
// ==UserScript==
// @name        testing discord.js-pure
// @match       https://discord.com/*
// @grant       none
// @version     1.0
// @author      1305
// @require https://raw.githubusercontent.com/13-05/discord.js-pure/main/stable/discordjs-pure.js
// ==/UserScript==


let GLOBAL_USER_TOKEN = client.get_token();


client.on_message = function(message, token) {
  let content = message.content.trim(); // sometimes the message content has whitespace at the end, so we just say message.content.trim() is == to message.content
  if (message.author.id.toString() != "YOURDISCORDUSERID") { // put your userid here!!!! <--------
    return;
  }
  else{
    if (content == "ping"){
      client.send_message("pong!", message.channel_id, token); // i looked at the "message" object and that's the path of a channelid; now it'll respond ez!
      client.delete_message(message, token);
    }
  }
}

client.run(GLOBAL_USER_TOKEN);
```

# Checklist/TODOs
- [x] Sending messages (text)
- [x] Add `on_message()` event and other gateway ones
- [x] Login feature
- [ ] Getting guild members
- [ ] More features over all

## Tests
My userscript tests with this code can be found at `https://github.com/13-05/discord.js-pure/blob/main/testing/testing-djs-pure.user.js`.




###### ive been procrasinating on this too much
