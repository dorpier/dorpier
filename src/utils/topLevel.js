import { logger } from "./index.js";
import { default as webpack } from "../webpack/api";
import modules from "../webpack/modules.js";

export function dispatch(name, data) {
    logger.verbose(`DirtyDispatching ${name.toUpperCase()}...`);
    data.type = name.toUpperCase();

    const { dispatcher } = modules;
    if (dispatcher.isDispatching()) {
        setTimeout(dispatcher.dispatch.bind(dispatcher, data), 0);
    } else {
        dispatcher.dispatch(data);
    }
}

export const loginToken = (token) =>
    webpack.findByProps("loginToken").loginToken(token);

export const getToken = (id) => webpack.findByProps("hideToken").getToken(id);

const getCurrentGuildID = () =>
    webpack.getModule("getLastSelectedGuildId").getGuildId();

const getCurrentChannelID = () =>
    webpack.getModule("getLastSelectedChannelId").getChannelId();

export default {
    get currentGuild() {
        webpack
            .getModule("getGuild", "getGuilds")
            .getGuild(getCurrentGuildID());
    },

    get currentChannel() {
        webpack.getModule("hasChannel").getChannel(getCurrentChannelID());
    },
};
