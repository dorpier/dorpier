# DISCORD.JS-PURE
A Discord API wrapper, written in pure javascript! You could run it in the inspect element console of chrome, nothing to download! 
(NOTE: the main branch will always have the most stable version of the script, the unstable branch will always have our unstable releases, etc.)

## Usage
Add a reference to this in your code like so:

for HTML (websites):
```js
<script src="https://raw.githubusercontent.com/13-05/discord.js-pure/main/stable/discordjs-pure.js"></script>
```

or, JS (userscripts):
```js
// @require https://raw.githubusercontent.com/13-05/discord.js-pure/main/stable/discordjs-pure.js
```

Then, you can use it in your javascript like so:

```js
client.send_message("sup world!", "694201234564206969", "osdf.-sdfKLFJDSkkl-LSKDjldf.dsdjklSKLDJFsl"); //message, channelid, token
```

# Checklist/TODOs
- [x] Sending messages (text)
- [ ] Add `on_message()` event and other gateway ones
- [ ] Login feature
- [ ] Getting guild members
- [ ] More features over all

## Tests
My userscript tests with this code can be found at `https://github.com/13-05/discord.js-pure/blob/main/testing/testing-djs-pure.user.js`.




###### ive been procrasinating on this too much
