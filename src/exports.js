export const __version__ = {
    version: "5.0",
    nightly: true,
};
export const name = "Dorpier";

export * as utils from "./utils/index.js";
export { default as transitionTo } from "./utils/transition.js";
export * as ui from "./utils/ui.js";
export { default as webpack } from "./webpack/api.js";
export * as patcher from "./patcher.js";
