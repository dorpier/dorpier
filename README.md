# DISCORD.JS-PURE
A Discord API wrapper, written in pure javascript!

## Usage
FIRST, GET [ViolentMonkey](https://violentmonkey.github.io). AND CHROMIUM USERS: I'VE ONLY TESTED WITH FIREFOX.
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

client.run(GLOBAL_USER_TOKEN);```

# Checklist/TODOs
- [x] Sending messages (text)
- [x] Add `on_message()` event and other gateway ones
- [x] Login feature
- [ ] Getting guild members
- [ ] More features over all

## Tests
My userscript tests with this code can be found at `https://github.com/13-05/discord.js-pure/blob/main/testing/testing-djs-pure.user.js`.




###### ive been procrasinating on this too much
