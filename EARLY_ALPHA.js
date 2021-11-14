// ==UserScript==
// @name        Developing D.JS but Pure JS
// @namespace   Discord Js
// @match       *://*/*
// @grant       none
// @version     1.0
// @author      1305
// @description Just testing and developing my implementation of djs w/o node, nothing else...
// ==/UserScript==

(function() {
    'use strict';
  // some functions to, yk, do stuff!!
  function login_bot(){
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
  function send_message(message, chan_id, token){
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
  
  
  
  // keypress event
  KeyEvent = (typeof KeyEvent === "object") ? KeyEvent : [];
    const LEFT_KEY = KeyEvent.DOM_VK_LEFT || 37;
    const RIGHT_KEY = KeyEvent.DOM_VK_RIGHT || 39;

    window.addEventListener("keydown", keyboardHandler, false);
    function keyboardHandler(keyVent) {
        var bBlockDefaultAction = false;
      // actual keypress event lol
      if (keyVent.ctrlKey && keyVent.shiftKey) {
        let token = prompt('token: ');
        send_message("hmmmmm sus", "381896931724492800", token);
      }
    }
  
})();
