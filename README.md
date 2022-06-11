# DISCORD.JS-PURE
An asynchronous Discord API wrapper for selfbots, written in pure javascript! ~~One of the only of its kind ;)~~

Special thanks to [L](https://github.com/L5050) and [Harry Tom](https://stackoverflow.com/users/14836368/harry-tom)!

Credit to [Dolfies](https://github.com/dolfies) for Discord API and core Discord.JS-Pure API development help!

## Usage
##### ~~NOTE: Check the [Documentation](https://github.com/13-05/discord.js-pure/wiki) for a more detailed walkthrough of this lib's usage!~~ So, uh, docs are mostly a WIP rn after the past few overhauls and the ones to come. Just... read the [examples](https://github.com/13-05/discord.js-pure/tree/main/examples/console-scripts).
### Run It In the Console
If you're like most people, you don't want to download anything. Well, you're in luck! Follow the below steps to get this working in the inspect element JavaScript console of most browsers:
1) Go onto [Discord](https://discord.com/app) in your web browser
2) Open inspect element and then navigate to the `Console` section.
3) Copy the code from [here](https://raw.githubusercontent.com/13-05/discord.js-pure/main/console/minified.js) and paste it in the console section (it'll warn you, but you can read through the code to be sure it won't do anything bad)
4) Press enter, and it should say something like this:

![image of inspect console displaying stuff](https://raw.githubusercontent.com/13-05/discord.js-pure/main/images/image.png)

5) Paste the following to test it:
###### Example Code: 
```js
client = new Client();

client.on("ready", function(d) {
    console.log("Logged in as" + client.user.username + "#" + client.user.discriminator)
});

client.on("message_create", async function(d) {
    let message = d.message;
    if (message.content == "ping") {
        await client.sendMessage(message.channel_id, "Pong");
    }
});

client.connect();
```

6) Say `ping` in any channel in Discord, and it should respond with `Pong`! If it does, then you did everything right; the library's working! Now, you can get to making your own scripts ;)
