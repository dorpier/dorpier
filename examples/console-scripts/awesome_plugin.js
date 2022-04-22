// Paste in minified library (https://raw.githubusercontent.com/13-05/discord.js-pure/main/minified.js)

// Define plugin
Plugins.add({
    name: "myAwesomePlugin",
    start: function () {
        console.log("Started awesome plugin :)");
    },
    stop: function () {
        console.log("Stopped awesome plugin :(");
    },
});

// Start plugin
Utils.plugins.start("myAwesomePlugin");

// Stop plugin
Utils.plugins.stop("myAwesomePlugin");
