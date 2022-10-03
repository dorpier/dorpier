# DISCORD.PURE
A script-based, developer experience focused client mod for Discord!

## Usage
### Run It In the Console
If you're like most people, you don't want to download anything. Well, you're in luck! Follow the below steps to get this working in the inspect element JavaScript console of most browsers:
1) Go onto [Discord](https://discord.com/app) in your web browser
2) Open inspect element and then navigate to the `Console` section.
3) Copy the code from [here](https://raw.githubusercontent.com/dolfies/discord.pure/main/console/minified.js) and paste it in the console section (it'll warn you, but you can read through the code to be sure it won't do anything bad)
4) Press enter, and it should say something like this:

![image of inspect console displaying stuff](https://raw.githubusercontent.com/dolfies/discord.pure/main/images/image.png)

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

6) Say `ping` in any channel in Discord, and it should respond with `Pong`! If it does, then you did everything right; the library's working! Now, you can get to making your own scripts.
