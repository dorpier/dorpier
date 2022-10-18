import { lazy } from "../utils/lazy.js";
import webpack from "./api";

export default lazy(() => ({
    datetime: webpack.findByProps("parseZone"),
    hljs: webpack.findByProps("highlight"),
    markdown: webpack.findByProps("parseBlock"),
    string: webpack.findByProps("toASCII"),
    timestamp: webpack.findByProps("fromTimestamp"),
    URL: webpack.findByProps("Url"),
    app: webpack.findByProps("os"),
    constants: webpack.findByProps("ACTIVITY_PLATFORM_TYPES"),
    React: webpack.findByProps("createElement"),
    ReactDOM: webpack.findByProps("render"),
    strings: webpack.findByProps("DISCORD_DESC_SHORT"),
    analytics: webpack.findByProps("AnalyticEventConfigs"),
    dispatcher: webpack.findByProps("getUsers")._dispatcher,
    http: webpack.findByProps("getAPIBaseURL"),
    socket: webpack.findByProps("getSocket").getSocket(),
    transitionTo: webpack.findByCode("transitionTo - "),
}));
