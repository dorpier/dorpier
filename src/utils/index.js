import { default as webpack } from "../webpack/api";
import modules from "../webpack/modules.js";
import { lazy } from "./lazy.js";

export function random(min, max) {
    if (max < min) {
        [min, max] = [max, min];
    }

    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * @param {number} ms
 *
 * @example await sleep(3000)
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export * from "../webpack/modules.js";
export * as lazy from "./lazy.js";

export const logger = lazy(
    () => new (webpack.findByProps("logger").logger.constructor)("dorpier"),
);

export function loadLocalStorage() {
    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    // @ts-ignore
    window.localStorage ??= iframe.contentWindow?.localStorage;
    iframe.remove();
    return window.localStorage;
}

export function createCommand(
    name,
    description,
    options,
    type,
    callback,
    inputType = 0,
) {
    logger.log(`Registering command ${name}...`);
    const commands = webpack.findByProps("BUILT_IN_COMMANDS").BUILT_IN_COMMANDS;

    options.forEach((option) => {
        option.displayName = option.name;
        option.displayDescription = option.description;
        if (option.choices) {
            option.choices.forEach((choice) => {
                choice.displayName = choice.name;
            });
        }
    });

    const actualCallback = function (data) {
        data.forEach((element) => {
            delete element.focused;
        });
        callback(data);
    };

    commands.push({
        applicationId: "-1",
        description: description,
        displayDescription: description,
        displayName: name,
        id: `-${commands.length + 1}`,
        execute: actualCallback,
        name: name,
        inputType: inputType,
        options: options,
        type: type,
    });
}

export const createMessage = (channel, content, embeds) =>
    webpack
        .findByProps("createBotMessage")
        .createBotMessage(channel, content, embeds);

export const sendLocalMessage = (channel, message) =>
    webpack.findByProps("receiveMessage").receiveMessage(channel, message);

export function dispatch(name, data) {
    logger.debug(`DirtyDispatching ${name.toUpperCase()}...`);

    data.type = name.toUpperCase();

    const { dispatcher } = modules;

    if (dispatcher.isDispatching()) {
        setTimeout(dispatcher.dispatch.bind(dispatcher, data), 0);
    } else {
        dispatcher.dispatch(data);
    }
}

export const editDeveloperOptions = (settings) =>
    webpack
        .findByProps("setDeveloperOptionSettings")
        .setDeveloperOptionSettings(settings);

export const toggleGuildFolder = (id) =>
    webpack.findByProps("toggleGuildFolderExpand").toggleGuildFolderExpand(id);

export const loginToken = (token) =>
    webpack.findByProps("loginToken").loginToken(token);

export const getToken = (id) => webpack.findByProps("hideToken").getToken(id);

// TODO: current channel/guild id

// get currentChannel() {
//   return this.webpack
//     .getModule("hasChannel")
//     .getChannel(this._getCurrentChannelID());
// },

// get currentGuild() {
//   return this.webpack
//     .getModule("getGuild", "getGuilds")
//     .getGuild(this._getCurrentGuildID());
// },
