import { default as webpack } from "../webpack/api.js";
import modules from "../webpack/modules.js";

const { transitionTo } = modules;

function find(string) {
    const results = [];
    for (const i of Object.getOwnPropertyNames(transitionTo)) {
        const object = transitionTo[i];
        if (
            typeof object === "function" &&
            object.toString().includes(string)
        ) {
            results.push(object);
        }
    }
    return results.length > 1 ? results : results?.[0];
}

export default {
    get history() {
        const results = find("(){return");
        for (const i of results) {
            const ret = i();
            if (ret) return ret;
        }
    },
    route(path) {
        return find("transitionTo - Transitioning to ")(path);
    },
    replace(path) {
        return find("Replacing route with ")(path);
    },
    back() {
        return find(".goBack()")();
    },
    forward() {
        return find(".goForward()")();
    },
    guild(id) {
        return find("transitionToGuild")(id);
    },
    channel(id) {
        return this.message(id);
    },
    message(channelID, id) {
        const guildID = webpack
            .findByProps("getChannel")
            .getChannel(channelID)?.guild_id;
        return find("transitionToGuild")(guildID, channelID, id);
    },
};
