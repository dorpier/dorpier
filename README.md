# DISCORD.JS-PURE
A Discord API wrapper, written in pure javascript!

Special thanks to [L](https://github.com/L5050) and [Harry Tom](https://stackoverflow.com/users/14836368/harry-tom)!

## Usage
##### NOTE: Check the [Documentation](https://github.com/13-05/discord.js-pure/wiki) for a more detailed walkthrough of this lib's usage!
### Manually Inject It
If you're like most people, you don't want to download anything. Well, you're in luck! Follow the below steps to get this working in the inspect element JavaScript console of most browsers:
1) Go onto [Discord](https://discord.com/app) in your web browser
2) Open inspect element and then navigate to the `Console` section.
3) Copy the code from [here](https://raw.githubusercontent.com/13-05/discord.js-pure/main/inspect-console/minified.js) and paste it in the console section (it'll warn you, but you can read through the code to be sure it won't do anything bad)
4) Press enter, and it should say something like this:

![image of inspect console displaying stuff](https://raw.githubusercontent.com/13-05/discord.js-pure/main/images/image.png)

5) Paste the following to test it:
###### Example Code: 
```js
Discord.library_event_logging.true(); // makes the logging of library events true; disable this if you don't want a cluttered console! (disabled with 'Discord.library_event_logging.false();' lol)
let GLOBAL_USER_TOKEN = client.get_token();
let USERID = await client.get_userid(GLOBAL_USER_TOKEN);

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
```

6) Say 'ping' in any channel in Discord, and it should respond with `pong`! If it does, then you did everything right; the library's working! Now, you can get to making your own scripts ;)

### Automatically Inject It (known as a bookmarklet)
1) Copy the code from [here](https://raw.githubusercontent.com/13-05/discord.js-pure/main/inspect-console/minified.js)
2) Make a new bookmark with the name as `inject discord.js-pure` and the url as `javascript:PASTETHECODEYOUCOPIEDJUSTNOWRIGHTHERE!!`
3) Now, save it and you can click it from discord whenever you wanna inject discord.js-pure into the discord webapp!

###### ive been procrasinating on this too much
