Utils.plugins.add({
    name: "myAwesomePlugin",
    start: function () {
        console.log("Started My Awesome Plugin!");
    },
    stop: function () {
        console.log("Stopped My Awesome Plugin!");
    },
});

/*
Utils.plugins.start("myAwesomePlugin");

- to start a plugin
*/
/*
Utils.plugins.stop("myAwesomePlugin");

- to stop a plugin
*/
