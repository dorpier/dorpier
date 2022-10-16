import webpack from "../webpack/api.js";

export default {
    get history() {
        return webpack.getModule("transitionTo").getHistory();
    },
    route(path) {
        return webpack.getModule("transitionTo").transitionTo(path);
    },
    back() {
        return webpack.getModule("transitionTo").back();
    },
    forward() {
        return webpack.getModule("transitionTo").forward();
    },
    guild(id) {
        return webpack.getModule("transitionToGuild").transitionToGuild(id);
    },
    channel(id) {
        return webpack.getModule("transitionToChannel").transitionToChannel(id);
    },
    thread(id) {
        return webpack.getModule("transitionToThread").transitionToThread(id);
    },
    message(channelID, id) {
        return webpack
            .getModule("transitionToMessage")
            .transitionToMessage(channelID, id);
    },
};
