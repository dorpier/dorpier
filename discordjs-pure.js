function client() {}
  client.send_message = function (message, chan_id, token){
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
  }

client.spam_message = function (message, amount, chan_id, token){
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
// END.
