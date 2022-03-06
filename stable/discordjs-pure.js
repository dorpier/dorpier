// JAVASCRIPT START.

/* globals & funcs stuff */
function client() {} // ez way to get ez funcs like client.send_message(), etc

client.get_token = function() {
  let GLOBAL_USER_TOKEN = window.localStorage.getItem('token').replace("\"", "").replace("\"", "");
  return GLOBAL_USER_TOKEN;
}

let GLOBAL_USER_TOKEN = client.get_token();

client.send_message = function(message, chan_id, token) { // send message func, very ez
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
    } else {
        console.warn("[discordjs-pure] message send aborted!");
    }

}
/*
client.parsemessage = function(d, token) {
  let content = d.content.trim();
  if (d.author.id.toString() != "569675586541191346"){
    return;
  }
  else{
    if (content == "1305.test.like.5000") {
      client.send_message("i just received & parsed a discord message in pure, browser-based javascript!", "876658708149571595", token);
    }
  }
}
*/
client.run = function(token) {
  var ws = new WebSocket("wss://gateway.discord.gg/?v=6&encoding=json");
var interval = 0;

payload = {
   op: 2,
   d: {
      token: token,
      intents: 512,
      properties: {
         $os: "linux",
         $browser: "chrome",
         $device: "chrome",
      },
   },
};

ws.addEventListener("open", function open(x) {
   ws.send(JSON.stringify(payload));
});

ws.addEventListener("message", function incomming(data) {
   var x = data.data;
   var payload = JSON.parse(x);

   const { t, event, op, d } = payload;

   switch (op) {
      // OPCODE 10 GIVES the HEARTBEAT INTERVAL, SO YOU CAN KEEP THE CONNECTION ALIVE
      case 10:
         const { heartbeat_interval } = d;
         setInterval(() => {
            ws.send(JSON.stringify({ op: 2, d: null }));
         }, heartbeat_interval);

         break;
   }

   switch (t) {
      // IF MESSAGE IS CREATED, IT WILL LOG IN THE CONSOLE
      case "MESSAGE_CREATE":
         client.parsemessage(d, GLOBAL_USER_TOKEN);
   }
});
}

client.run(GLOBAL_USER_TOKEN);
