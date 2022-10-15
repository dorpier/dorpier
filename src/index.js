import { Client } from "./client.js";
import * as dorpier from "./exports.js";
import { loadLocalStorage } from "./utils/index.js";

// @ts-ignore
window.Dorpier = dorpier;
// @ts-ignore
window.Client = Client;

loadLocalStorage();

console.log("%c[dorpier] %cloaded successfully!", "color: purple", "");
