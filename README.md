# DISCORD.JS-PURE
A Discord API wrapper, written in pure javascript!

Special thanks to [L](https://github.com/L5050) and [Harry Tom](https://stackoverflow.com/users/14836368/harry-tom)!

## Usage
##### NOTE: Check the [Documentation](https://github.com/13-05/discord.js-pure/wiki) for a more detailed walkthrough of this lib's usage!
### Run It In the Console
If you're like most people, you don't want to download anything. Well, you're in luck! Follow the below steps to get this working in the inspect element JavaScript console of most browsers:
1) Go onto [Discord](https://discord.com/app) in your web browser
2) Open inspect element and then navigate to the `Console` section.
3) Copy the code from [here](https://raw.githubusercontent.com/13-05/discord.js-pure/main/inspect-console/minified.js) and paste it in the console section (it'll warn you, but you can read through the code to be sure it won't do anything bad)
4) Press enter, and it should say something like this:

![image of inspect console displaying stuff](https://raw.githubusercontent.com/13-05/discord.js-pure/main/images/image.png)

5) Paste the following to test it:
###### Example Code: 
```js
Discord.Logger.enable();
let USERID = await client.get_userid();

client.on_ready = function() {
  window.alert("Selfbot is ready!");
}

client.on_message = function(message) {
  if (message.author.id != USERID) return;
  if (message.content.trim() == "ping"){
    client.send_message("pong!", message.channel_id);
    }
}

client.run();
```

6) Say 'ping' in any channel in Discord, and it should respond with `pong`! If it does, then you did everything right; the library's working! Now, you can get to making your own scripts ;)

### Run It Automatically
Alright, so this method will automatically boot the selfbot every time you load up [Discord](https://discord.com/app) in your browser. Although, there's one catch: you need an extension. So, if you don't mind using an extension, you're good to go! Just follow the steps below:
1) Get [ViolentMonkey](https://violentmonkey.github.io/) for your browser
2) Navigate to the settings page by clicking the gear icon after clicking the logo.
3) Press the `+` symbol at the top left, and then click `New`
4) Paste an [example](https://github.com/13-05/discord.js-pure/blob/main/examples/slightly_advanced_selfbot.user.js) and then save the script
5) Open/reload [Discord](https://discord.com/app) in your browser
6) If you open the console, you should see messages from the library that look similar to the below:

![image](https://user-images.githubusercontent.com/64506392/158729759-e62f079b-ed43-4d8a-966e-9829da85ed39.png)

7) If you see that, just send a message in any server in the format of `YOURPREFIX.test`, and if it responds, you're good to go! Happy scripting ;)
