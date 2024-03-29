# DORPIER
Dorpier is a work-in-progress script-based, developer experience focused Discord client mod!

## Development
You can clone and build a development version by running the following (assuming node.js and git are installed):
```sh
npm install -g pnpm rollup
git clone https://github.com/dorpier/dorpier
pnpm install
pnpm build
```

You can then run the contents of `dist.js` in the client.

## Installation
As of now, we don't have an extension or injector ready.

If you want to use Dorpier right now, you have two options:

### Inject manually
Note that CSP has to be disabled for this to work.

1) Open Developer Tools on the webapp or desktop client.
3) Input the following:
```js
fetch(
  "https://raw.githubusercontent.com/dorpier/dists/master/dist.js"
)
  .then((response) => response.text())
  .then((data) => new Function(data)());
```
4) Press enter, and you should see something like this:

![Screenshot of Developer Tools](/images/loaded.png)

5. If you do, congrats! Dorpier has been injected.

### Use TamperMonkey/GreaseMonkey
Simply import from the URL `https://raw.githubusercontent.com/dorpier/dists/master/dist.js`.

## Example
Run this script after injection.
```js
client = new Client();

client.on("message_create", async function(d) {
    let message = d.message;
    if (message.content == "!ping" && message.author.id === client.user.id) {
        await client.sendEphemeralMessage(message.channel_id, "Pong!");
    }
});

client.connect();
```
Say `ping` in any channel in Discord, and it should respond with `pong`! If it does, then you did everything right; Dorpier is working! Now, you can get to making your own scripts.
