import modules from "./webpack/modules.js";
import properties from "./utils/topLevel.js";

export const __version__ = {
    version: "5.0",
    nightly: true,
};

export * from "./utils/topLevel.js";
export * as utils from "./utils/index.js";
export { default as transitionTo } from "./utils/transition.js";
export * as ui from "./utils/ui.js";
export { default as webpack } from "./webpack/api.js";
export { default as patcher } from "./patcher.js";
export const { socket, dispatcher, http, strings, constants, app, analytics } =
    modules;
export const { currentGuild, currentChannel } = properties;
