Dorpier = {
    __version__: {
        number: 4.0,
        nightly: true,
    },

    // Logger

    logger: {
        _log: true,

        enable() {
            this._log = true;
        },

        disable() {
            this._log = false;
        },

        log(message) {
            if (this._log) {
                console.log(
                    `%c[dorpier]%c ${message}`,
                    "color: #9e0700",
                    "color: #ffffff",
                );
            }
        },
    },

    // Utilities

    utils: {
        // Custom
        random(min, max) {
            let rand = Math.floor(Math.random() * (max - min)) + min;
            return rand;
        },

        sleep(milliseconds) {
            var start = new Date().getTime();
            for (var i = 0; i < 1e7; i += 1) {
                if (new Date().getTime() - start > milliseconds) {
                    break;
                }
            }
            return new Date().getTime() - start;
        },

        // Discord classes
        get Datetime() {
            return Dorpier.webpack.getModule("dateFormat");
        },

        get HLJS() {
            return Dorpier.webpack.getModule("highlight");
        },

        get Markdown() {
            return Dorpier.webpack.getModule("parseBlock");
        },

        get Path() {
            return Dorpier.webpack.getModule("createPath");
        },

        get String() {
            return Dorpier.webpack.getModule("toASCII");
        },

        get Timestamp() {
            return Dorpier.webpack.getModule("fromTimestamp");
        },

        get Timezone() {
            return Dorpier.webpack.getModule("parseZone")();
        },

        get URL() {
            return Dorpier.webpack.getModule("Url");
        },
    },

    // Webpack

    webpack: {
        get _cached() {
            const webp = window.webpackChunkdiscord_app.push([
                [Symbol()],
                {},
                (_) => _.c,
            ]);
            window.webpackChunkdiscord_app.pop();
            return webp;
        },

        get modules() {
            const ret = [];
            for (const module of Object.values(this._cached)) {
                if (module.exports && module.exports !== window) {
                    ret.push(module.exports);
                }
            }
            return ret;
        },

        find(filter) {
            return this.modules.find(filter);
        },

        findAll(filter) {
            return this.modules.filter(filter);
        },

        _findAndScope(filter, all = false) {
            const func = all ? "findAll" : "find";
            var results = all ? [] : null;

            const modules = this[func](function (module) {
                const res = filter(module);
                if (res) {
                    all ? results.push(res) : (results = res);
                }
                return res;
            });

            return all
                ? results.map((res, index) =>
                      typeof res === "string"
                          ? modules[index][res]
                          : modules[index],
                  )
                : typeof results === "string"
                ? modules[results]
                : modules;
        },

        findByID(id) {
            id = parseInt(id);
            return this._cached[id]?.exports;
        },

        _displayName(exports, name) {
            if (exports?.displayName === name) {
                return true;
            }

            for (const i of Object.getOwnPropertyNames(exports)) {
                if (exports[i]?.displayName === name) {
                    return i;
                }
            }
        },

        findByDisplayName(displayName) {
            return this._findAndScope((m) => this._displayName(m, displayName));
        },

        findByDisplayNameAll(displayName) {
            return this._findAndScope(
                (m) => this._displayName(m, displayName),
                true,
            );
        },

        _props(exports, props) {
            var ret = null;
            for (const prop of props) {
                if (exports && typeof exports === "object" && prop in exports) {
                    continue;
                }

                let res = null;
                for (const i of Object.getOwnPropertyNames(exports)) {
                    if (i !== "default" && i.length > 3) {
                        continue;
                    }

                    const object = exports[i];
                    if (
                        object &&
                        typeof object === "object" &&
                        prop in object
                    ) {
                        res = i;
                        break;
                    }
                }

                if (!res) {
                    return;
                }
                ret = res;
            }
            return ret || true;
        },

        findByProps(...props) {
            return this._findAndScope((m) => this._props(m, props));
        },

        findByPropsAll(...props) {
            return this._findAndScope((m) => this._props(m, props), true);
        },

        _getModule(args, all = false) {
            if (args.length > 1) {
                return this.findByProps(...args);
            }
            else {
                const arg = args[0];
                switch (typeof arg) {
                    case "function":
                        return all ? this.findAll(arg) : this.find(arg);
                    case "number":
                        return this.findByID(arg);
                    case "object" && Array.isArray(arg):
                        return all ? this.findByPropsAll(...arg) : this.findByProps(...arg);
                    default:
                        return this._findAndScope((m) => this._displayName(m, arg) || this._props(m, [arg]), all);
                }
            }
        },

        getModule(...args) {
            return this._getModule(args);
        },

        getModules(...args) {
            return this._getModule(args, true);
        },
    },

    // Patches

    patcher: {
        _originalFunctions: {},
        _currentPatches: [],

        _patchModule(type, module, func, callback, signature) {
            if (!type) {
                throw new TypeError(
                    "Must specify what type of patch to perform",
                );
            }
            if (!module) {
                throw new TypeError("Must specify the module to patch");
            }
            if (!func) {
                throw new TypeError("Must specify what function to patch");
            }
            if (!callback) {
                throw new TypeError("Must specify a callback");
            }
            if (!signature) {
                throw new TypeError("Must specify a signature for your patch");
            }
            let originalFunction = module[func];
            if (!this._originalFunctions[func]) {
                this._originalFunctions[func] = module[func];
            }
            var isPatchInCurrentOnes = false;
            for (var i = 0; i < this._currentPatches.length; i += 1) {
                let patch = this._currentPatches[i];
                if (patch.signature == signature) {
                    isPatchInCurrentOnes = true;
                }
            }
            if (isPatchInCurrentOnes != true) {
                this._currentPatches.push({
                    signature: signature,
                    patchType: type,
                    patchOn: func,
                    callback: callback,
                });
            }
            switch (type) {
                case "before":
                    originalFunction = module[func];
                    module[func] = function () {
                        callback.apply(this, [...arguments]);
                        return originalFunction.apply(this, arguments);
                    };
                    break;
                case "after":
                    originalFunction = module[func];
                    module[func] = function () {
                        let result = originalFunction.apply(this, arguments);
                        callback.apply(this, [[...arguments], result]);
                        return result;
                    };
                    break;
                case "instead":
                    originalFunction = module[func];
                    module[func] = callback;
                    break;
                default:
                    throw new TypeError(
                        "Invalid patch type, must be one of: [before, after, instead]",
                    );
            }
        },

        _unpatchEntireModule(module, func) {
            module[func] = this._originalFunctions[func];
        },

        _removePatchesFromList(signature) {
            for (var i = 0; i < this._currentPatches.length; i += 1) {
                let patch = this._currentPatches[i];
                if (patch.signature == signature) {
                    this._currentPatches.splice(i, 1);
                }
            }
            return;
        },

        before: (module, func, callback, signature) => {
            Dorpier._patchModule("before", module, func, callback, signature);
        },

        instead: (module, func, callback, signature) => {
            Dorpier._patchModule("instead", module, func, callback, signature);
        },

        after: (module, func, callback, signature) => {
            Dorpier._patchModule("after", module, func, callback, signature);
        },

        unpatch(module, func, signature) {
            if (!module) {
                throw new TypeError("You must specify a module to unpatch");
            }
            if (!func) {
                throw new TypeError("You must specify a function to unpatch");
            }

            if (typeof signature === "undefined") {
                module[func] = this._originalFunctions[func];
                for (var i = 0; i < this._currentPatches.length; i += 1) {
                    let patch = this._currentPatches[i];
                    if (patch.patchOn == func) {
                        this._currentPatches.splice(i, 1);
                    }
                }
            } else {
                Dorpier._unpatchEntireModule(module, func);
                Dorpier._removePatchesFromList(signature);
                for (var i = 0; i < this._currentPatches.length; i += 1) {
                    let patch = this._currentPatches[i];
                    Dorpier.patchModule(
                        patch.patchType,
                        module,
                        patch.patchOn,
                        patch.callback,
                        patch.signature,
                    );
                }
            }
        },
    },

    // UI

    showToast(message, type) {
        // type = {normal: 0, success: 1, error: 2}
        Dorpier.webpack.getModule("showToast").showToast({
            message: message,
            type: type || 0,
        });
    },

    showNotification(
        title,
        body,
        icon = "https://cdn.discordapp.com/embed/avatars/0.png",
        { sound = "message1", volume = 0.4 },
    ) {
        Dorpier.webpack
            .getModule("showNotification")
            .showNotification(icon, title, body, null, {
                sound: sound,
                volume: volume,
            });
    },

    playSound(sound = "message1", volume = 0.4) {
        Dorpier.webpack.getModule("playSound").playSound(sound, volume);
    },

    // Constants

    get App() {
        return this.webpack.getModule("os");
    },

    get Constants() {
        return this.webpack.getModule("ACTIVITY_PLATFORM_TYPES");
    },

    get Electron() {
        return this.webpack.getModule("os");
    },

    get React() {
        return this.webpack.getModule("createElement");
    },

    get ReactDOM() {
        return this.webpack.getModule("render");
    },

    get Strings() {
        return this.webpack.getModule("DISCORD_DESC_SHORT");
    },

    // Helpers

    get Analytics() {
        return this.webpack.getModule("AnalyticEventConfigs");
    },

    get Dispatcher() {
        return this.webpack.getModule("isDispatching");
    },

    get Experiments() {
        return this.webpack.getModule("ExperimentStore");
    },

    get HTTP() {
        return this.webpack.getModule("getAPIBaseURL");
    },

    get Router() {
        return this.webpack.getModule("Router");
    },

    // Other

    _createCommand(name, description, options, type, callback, inputType = 0) {
        this.logger.log(`Registering command ${name}...`);
        const commands =
            this.webpack.getModule("BUILT_IN_COMMANDS").BUILT_IN_COMMANDS;
        options.forEach((option) => {
            option.displayName = option.name;
            option.displayDescription = option.description;
            if (option.choices) {
                option.choices.forEach((choice) => {
                    choice.displayName = choice.name;
                });
            }
        });
        actualCallback = function (data) {
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
    },

    _createMessage(content, embeds) {
        return this.webpack
            .getModule("createBotMessage")
            .createBotMessage(this._getCurrentChannelID(), content, embeds);
    },

    _sendLocalMessage(channel, message) {
        return this.webpack
            .getModule("receiveMessage")
            .receiveMessage(channel, message);
    },

    dispatch(name, data) {
        this.logger.log(`DirtyDispatching ${name.toUpperCase()}...`);
        dispatcher = this.Dispatcher;
        data.type = name.toUpperCase();
        if (dispatcher.isDispatching()) {
            setImmediate(dispatcher.dispatch.bind(dispatcher, data));
        } else {
            dispatcher.dispatch(data);
        }
    },

    editDeveloperOptions(settings) {
        this.webpack
            .getModule("setDeveloperOptionSettings")
            .setDeveloperOptionSettings(settings);
    },

    toggleGuildFolder(id) {
        Dorpier.webpack
            .getModule("toggleGuildFolderExpand")
            .toggleGuildFolderExpand(id);
    },

    login(token) {
        this.logger.log(`Logging in with token ${token}...`);
        this.webpack.getModule("loginToken").loginToken(token);
    },

    getToken(id) {
        return this.webpack.getModule("hideToken").getToken(id);
    },

    _getCurrentChannelID() {
        return this.webpack
            .getModule("getLastSelectedChannelId")
            .getChannelId();
    },

    _getCurrentGuildID() {
        return this.webpack.getModule("getLastSelectedGuildId").getGuildId();
    },

    get currentChannel() {
        return this.webpack
            .getModule("hasChannel")
            .getChannel(this._getCurrentChannelID());
    },

    get currentGuild() {
        return this.webpack
            .getModule("getGuild")
            .getGuild(this._getCurrentGuildID());
    },

    createSlashCommand(name, description, options = [], callback) {
        this._createCommand(name, description, options, 1, callback);
    },

    //    createUserCommand(name, callback) {
    //        Dorpier._createCommand(name, "", [], 2, callback);
    //    }

    //    createMessageCommand(name, callback) {
    //        Dorpier._createCommand(name, "", [], 3, callback);
    //    }

    transitionTo: {
        get history() {
            return this.webpack.getModule("transitionTo").getHistory();
        },
        route(path) {
            return Dorpier.webpack.getModule("transitionTo").transitionTo(path);
        },
        back() {
            return Dorpier.webpack.getModule("transitionTo").back();
        },
        forward() {
            return Dorpier.webpack.getModule("transitionTo").forward();
        },
        guild(id) {
            return Dorpier.webpack
                .getModule("transitionToGuild")
                .transitionToGuild(id);
        },
        channel(id) {
            return Dorpier.webpack
                .getModule("transitionToChannel")
                .transitionToChannel(id);
        },
        thread(id) {
            return Dorpier.webpack
                .getModule("transitionToThread")
                .transitionToThread(id);
        },
        message(channelID, id) {
            return Dorpier.webpack
                .getModule("transitionToMessage")
                .transitionToMessage(channelID, id);
        },
    },
};


class Client {
    constructor() {
        this.events = {};
    }

    connect() {
        let state = this;
        Dorpier.Dispatcher._interceptor = function (e) {
            let promise = state.emit(e.type.toLowerCase(), e);
            Promise.resolve(promise);
        };
        Dorpier.logger.log("Successfully hooked into the client!");
    }

    disconnect() {
        Dorpier.Dispatcher._interceptor = undefined;
        Dorpier.logger.log("Successfully unhooked from the client!");
    }

    on(event, callback) {
        if (this.events[event] === undefined) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    async emit(event, data) {
        if (this.events[event] === undefined) {
            return;
        }
        for (let callback of this.events[event]) {
            try {
                await callback(data);
            } catch (e) {
                Dorpier.logger.log(`Error in '${event}', callback: '${e}'`);
            }
        }
    }

    get sessionID() {
        return Dorpier.webpack.getModule("getSessionId").getSessionId();
    }

    get fingerprint() {
        return Dorpier.webpack.getModule("getFingerprint").getFingerprint();
    }

    get user() {
        return Dorpier.webpack.getModule("getCurrentUser").getCurrentUser();
    }

    get guilds() {
        return Dorpier.webpack.getModule("getGuilds").getGuilds();
    }

    get sortedGuilds() {
        return Dorpier.webpack.getModule("getSortedGuilds").getSortedGuilds();
    }

    get privateChannels() {
        return Dorpier.webpack
            .getModule("getMutablePrivateChannels")
            .getSortedPrivateChannels();
    }

    getGuild(id) {
        return Dorpier.webpack.getModule("getGuild").getGuild(id);
    }

    joinGuild(id, lurking = false) {
        return Dorpier.webpack.getModule("joinGuild").joinGuild(id, {
            lurker: lurking,
        });
    }

    getGuildChannels(guildID) {
        return Object.values(
            Dorpier.webpack
                .getModule("getMutableGuildChannelsForGuild")
                .getMutableGuildChannelsForGuild(guildID),
        );
    }

    getChannel(id) {
        return Dorpier.webpack.getModule("hasChannel").getChannel(id);
    }

    getChannelThreads(channelID) {
        return Dorpier.webpack
            .getModule("getAllThreadsForParent")
            .getAllThreadsForParent(channelID);
    }

    createDM(id) {
        existing = Dorpier.webpack
            .getModule("getDMFromUserId")
            .getDMFromUserId(id);
        if (existing) {
            return this.getChannel(existing);
        }
        return Dorpier.webpack
            .getModule("openPrivateChannel")
            .openPrivateChannel(id);
    }

    getUser(id) {
        return Dorpier.webpack.getModule("getUser").getUser(id);
    }

    getGuildMember(guildID, id) {
        return Dorpier.webpack.getModule("getMember").getMember(guildID, id);
    }

    getGuildMembers(guildID) {
        return Dorpier.webpack.getModule("getMembers").getMembers(guildID);
    }

    requestGuildMembers(
        ids,
        { query = "", limit = 10, presences = true, userIDs = [] },
    ) {
        if (userIDs) {
            return Dorpier.webpack
                .getModule("requestMembers")
                .requestMembersById(ids, userIDs, presences);
        } else {
            return Dorpier.webpack
                .getModule("requestMembers")
                .requestMembers(ids, query, limit, presences);
        }
    }

    getChannelMessages(channelID) {
        return Dorpier.webpack.getModule("getMessages").getMessages(channelID);
    }

    sendMessage(
        channel,
        content = "",
        {
            tts = false,
            messageReference = null,
            allowedMentions = null,
            stickerIDs = null,
        },
    ) {
        if (!content && !stickerIDs) {
            throw new TypeError("Must provide either content or stickerIDs");
        }
        if (!channel) {
            channel = Dorpier._getCurrentChannelID();
        }
        let msg = {
            content: content,
            tts: tts,
            invalidEmojis: [],
            validNonShortcutEmojis: [],
        };
        let params = {};
        if (messageReference != null) {
            params.messageReference = messageReference;
        }
        if (allowedMentions != null) {
            params.allowedMentions = allowedMentions;
        }
        if (stickerIDs != null) {
            params.stickerIds = stickerIDs;
        }
        return Dorpier.webpack
            .getModule("sendMessage")
            .sendMessage(channel, msg, null, params);
    }

    sendEphemeralMessage(
        content,
        embeds,
        {
            author,
            type = 0,
            tts = false,
            stickerIDs = [],
            messageReference,
            allowedMentions,
        },
    ) {
        let msg = Dorpier._createMessage(content, embeds);
        msg.author = author || this.user;
        msg.type = type;
        msg.tts = tts;
        msg.sticker_ids = stickerIDs;
        msg.message_reference = messageReference;
        msg.allowed_mentions = allowedMentions;
        return Dorpier._sendLocalMessage(msg.channel_id, msg);
    }

    sendClydeMessage(content, embeds) {
        return Dorpier.webpack
            .getModule("sendBotMessage")
            .sendBotMessage(Dorpier._getCurrentChannelID(), content, embeds);
    }

    sendClydeError() {
        return Dorpier.webpack
            .getModule("sendBotMessage")
            .sendClydeError(Dorpier.getCurrentChannelID());
    }

    acceptInvite(invite, transition = true) {
        if (transition) {
            return Dorpier.webpack
                .getModule("acceptInvite")
                .acceptInviteAndTransitionToInviteChannel(invite);
        } else {
            return Dorpier.webpack
                .getModule("acceptInvite")
                .acceptInvite(invite);
        }
    }
}
