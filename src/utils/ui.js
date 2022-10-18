import { default as webpack } from "../webpack/api.js";
import modules from "../webpack/modules.js";

export const { React, ReactDOM } = modules;

export function showToast(message, type) {
    // type = {normal: 0, success: 1, error: 2}
    webpack.findByProps("showToast").showToast({
        message: message,
        type: type || 0,
    });
}

export function showNotification(
    title,
    body,
    icon = "https://cdn.discordapp.com/embed/avatars/0.png",
    { sound = "message1", volume = 0.4 },
) {
    webpack
        .findByProps("showNotification")
        .showNotification(icon, title, body, null, {
            sound: sound,
            volume: volume,
        });
}

export function playSound(sound = "message1", volume = 0.4) {
    webpack.findByProps("playSound").playSound(sound, volume);
}
