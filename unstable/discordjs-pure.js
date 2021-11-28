function client() {}
client.send_message = function(message, chan_id, token) {
    if (!token) {
        console.warn("[discordjs-pure] no token was provided. aborting message send!");
    }
    if (!message) {
        console.warn("[discordjs-pure] no message was specified, aborting message send!");
    }
    if (!chan_id) {
        console.warn("[discordjs-pure] no channel id was specified, aborting message send!");
    }
    if (token && message && chan_id) {
        let post_url = `https://discord.com/api/v9/channels/${chan_id}/messages`;
        let once = 1;
        for (let i = 0; i < once; i++) {
            let request = new XMLHttpRequest();
            request.withCredentials = true;
            request.open("POST", post_url);
            request.setRequestHeader("authorization", token);
            request.setRequestHeader("accept", "/");
            request.setRequestHeader("authority", "discordapp.com");
            request.setRequestHeader("content-type", "application/json");
            request.send(JSON.stringify({
                content: message
            }));
        }
    } else {
        console.warn("[discordjs-pure] message send aborted!");
    }

}

client.spam_message = function(message, amount, chan_id, token) {
    if (!message) {
        console.warn("[discordjs-pure] no message was provided. aborting message spam!");
    }
    if (!amount) {
        console.warn("[discordjs-pure] no amount was provided. aborting message spam!");
    }
    if (!chan_id) {
        console.warn("[discordjs-pure] no channel id was provided. aborting message spam!");
    }
    if (!token) {
        console.warn("[discordjs-pure] no token was provided. aborting message spam!");
    }
    if (message && amount && chan_id && token) {
        let post_url = `https://discord.com/api/v9/channels/${chan_id}/messages`;
        for (let i = 0; i < amount; i++) {
            let request = new XMLHttpRequest();
            request.withCredentials = true;
            request.open("POST", post_url);
            request.setRequestHeader("authorization", token);
            request.setRequestHeader("accept", "/");
            request.setRequestHeader("authority", "discordapp.com");
            request.setRequestHeader("content-type", "application/json");
            request.send(JSON.stringify({
                content: message
            }));
        }
    }
}

client.login = function(token, bot){
  if (typeof bot != 'boolean'){
    console.warn('the bot variable is supposed to be a boolean, though it\'s not. login aborted!');
  }
  else if (bot == true){
    // TODO: normal discord bot login
  }
  else if (bot == false){
    // TODO: discord selfbot login
  }
}
// END.
