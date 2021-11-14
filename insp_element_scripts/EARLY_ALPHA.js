// --- START OF CODE TO PUT IN INSPECT CONSOLE ---
function login_bot() {
    let gateway_url = "https://discordapp.com/api/v9/gateway/bot";
    let tok = prompt('bot token: ');
    let request = new XMLHttpRequest();
    request.withCredentials = true;
    request.open("GET", gateway_url);
    request.setRequestHeader("authorization", tok);
    request.setRequestHeader("accept", "/");
    request.setRequestHeader("authority", "discordapp.com");
    request.setRequestHeader("content-type", "application/json");

    let socket = new WebSocket("wss://gateway.discord.gg");
    socket.onopen = function(e) {
        alert("[open] Connection established");
        alert("Sending to server");
        socket.send("My name is John");
    };
}

function send_message(message, chan_id, token) {
    //let cur_url = window.location.href.toString();
    //let chan_id = prompt('channel to send to: '); //cur_url.substring(cur_url.lastIndexOf('/')+1);
    let channel_url = `https://discord.com/api/v9/channels/${chan_id}/messages`;
    let once = 1; // we only want the message to send once
    for (let i = 0; i < once; i++) {
        let request = new XMLHttpRequest();
        request.withCredentials = true;
        request.open("POST", channel_url);
        request.setRequestHeader("authorization", token);
        request.setRequestHeader("accept", "/");
        request.setRequestHeader("authority", "discordapp.com");
        request.setRequestHeader("content-type", "application/json");
        request.send(JSON.stringify({
            content: message
        }));
    }
}
// --- END OF CODE --- (read below for instruction)


// first, send the console the command `let token = "[your token here]"` 
// after sending that in the inspect console, type a command in the format of `send_message("[message]", "[channelid]", token);` to send a message
