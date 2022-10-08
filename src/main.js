Discord = {
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
            return Discord.getModule("dateFormat");
        },

        get HLJS() {
            return Discord.getModule("highlight");
        },

        get Markdown() {
            return Discord.getModule("parseBlock");
        },

        get Path() {
            return Discord.getModule("createPath");
        },

        get String() {
            return Discord.getModule("toASCII");
        },

        get Timestamp() {
            return Discord.getModule("fromTimestamp");
        },

        get Timezone() {
            return Discord.getModule("parseZone")();
        },

        get URL() {
            return Discord.getModule("Url");
        },
    },

    // Webpack

    webpack: {
        get modules() {
            (e = webpackChunkdiscord_app.push([
                [Symbol()],
                {},
                (e) => {
                    webpackChunkdiscord_app.pop();
                    return e;
                },
            ])),
                (m = []);
            for (let i in e.c) {
                if (Object.hasOwnProperty.call(e.c, i)) {
                    let o = e.c[i].exports;
                    if (!o) {
                        continue;
                    }
                    m.push(o);
                }
            }
            return m;
        },

        get _cached() {
            let webp = window.webpackChunkdiscord_app.push([
                [Symbol()],
                {},
                (_) => _.c,
            ]);
            window.webpackChunkdiscord_app.pop();
            return webp;
        },

        getModule(n, first = true) {
            let x = false;
            let mod;
            window.webpackChunkdiscord_app.push([
                [Symbol()],
                {},
                (e) => {
                    mod =
                        mod ||
                        Object.values(e.c).find(
                            (m) => m?.exports?.default?.[n],
                        );
                },
            ]);
            window.webpackChunkdiscord_app.pop();
            if (typeof mod === "undefined") {
                window.webpackChunkdiscord_app.push([
                    [Math.random()],
                    {},
                    (e) => {
                        mod =
                            mod ||
                            Object.values(e.c).find((m) => m?.exports?.[n]);
                    },
                ]);
                window.webpackChunkdiscord_app.pop();
            }
            if (typeof mod === "undefined") {
                x = true;
                if (first == true) {
                    mod =
                        mod ||
                        typeof Discord.findAllModules(
                            (m) => m?.default?.displayName === n,
                        ) !== "undefined"
                            ? Discord.findAllModules(
                                  (m) => m?.default?.displayName === n,
                              )?.[0]
                            : Discord.findAllModules(
                                  (m) => m?.displayName === n,
                              )?.[0];
                } else {
                    mod =
                        mod ||
                        typeof Discord.findAllModules(
                            (m) => m?.default?.displayName === n,
                        ) !== "undefined"
                            ? Discord.findAllModules(
                                  (m) => m?.default?.displayName === n,
                              )
                            : Discord.findAllModules(
                                  (m) => m?.displayName === n,
                              );
                }
            }

            if (x == false) {
                return typeof mod.exports.default !== "undefined"
                    ? mod.exports.default
                    : mod.exports;
            } else if (x == true) {
                return typeof mod.default !== "undefined" ? mod.default : mod;
            }
            return undefined;
        },

        findModules(n, b) {
            (d = typeof b === "undefined" ? true : b),
                (n = n.toLowerCase()),
                (m = []);
            m.push(
                ...Object.values(this._cached).filter(
                    (m) =>
                        m?.exports &&
                        ((m?.exports?.default &&
                            Object.keys(m.exports.default).some((key) =>
                                key.toLowerCase().includes(n),
                            )) ||
                            (m.exports?.default?.prototype &&
                                Object.keys(m.exports.default.prototype).some(
                                    (key) => key.toLowerCase().includes(n),
                                )) ||
                            Object.keys(m.exports).some((key) =>
                                key.toLowerCase().includes(n),
                            )),
                ),
            );
            if (d) {
                m.forEach((f) =>
                    m.push(
                        typeof f?.exports?.default === "undefined"
                            ? f?.exports
                            : f?.exports?.default,
                    ),
                );
                for (var i = 0; i < m.length; i += 1) {
                    m.forEach((f, i) =>
                        typeof f?.id === "undefined" ? (m = m) : m.splice(i, 1),
                    );
                }
                return [...m];
            } else {
                return [...m];
            }
        },

        findAllModules(filter = (m) => m) {
            let modules = [];
            for (let item in this._cached) {
                if (Object.hasOwnProperty.call(this._cached, item)) {
                    let element = this._cached[item].exports;
                    if (!element) {
                        continue;
                    }
                    if (filter(element)) {
                        modules.push(element);
                    }
                }
            }
            return modules;
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
            Discord._patchModule("before", module, func, callback, signature);
        },

        instead: (module, func, callback, signature) => {
            Discord._patchModule("instead", module, func, callback, signature);
        },

        after: (module, func, callback, signature) => {
            Discord._patchModule("after", module, func, callback, signature);
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
                Discord._unpatchEntireModule(module, func);
                Discord._removePatchesFromList(signature);
                for (var i = 0; i < this._currentPatches.length; i += 1) {
                    let patch = this._currentPatches[i];
                    Discord.patchModule(
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
        Discord.getModule("showToast").showToast({
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
        Discord.getModule("showNotification").showNotification(
            icon,
            title,
            body,
            null,
            { sound: sound, volume: volume },
        );
    },

    playSound(sound = "message1", volume = 0.4) {
        Discord.getModule("playSound").playSound(sound, volume);
    },

    // Constants

    get App() {
        return this.getModule("os");
    },

    get Constants() {
        return this.getModule("ACTIVITY_PLATFORM_TYPES");
    },

    get Electron() {
        return this.getModule("os");
    },

    get React() {
        return this.getModule("createElement");
    },

    get ReactDOM() {
        return this.getModule("render");
    },

    get Strings() {
        return this.getModule("DISCORD_DESC_SHORT");
    },

    // Helpers

    get Analytics() {
        return this.getModule("AnalyticEventConfigs");
    },

    get Dispatcher() {
        return this.getModule("getUser")._dispatcher;
    },

    get Experiments() {
        return this.getModule("ExperimentStore");
    },

    get HTTP() {
        return this.getModule("getAPIBaseURL");
    },

    get Router() {
        return this.getModule("Router");
    },

    // Other

    _createCommand(name, description, options, type, callback, inputType = 0) {
        console.log(`Registering command ${name}...`);
        const commands = this.getModule("BUILT_IN_COMMANDS").BUILT_IN_COMMANDS;
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
        return this.getModule("createBotMessage").createBotMessage(
            this._getCurrentChannelID(),
            content,
            embeds,
        );
    },

    _sendLocalMessage(channel, message) {
        return this.getModule("receiveMessage").receiveMessage(
            channel,
            message,
        );
    },

    dispatch(name, data) {
        Logger.log(`DirtyDispatching ${name.toUpperCase()}...`);
        dispatcher = this.Dispatcher;
        data.type = name.toUpperCase();
        if (dispatcher.isDispatching()) {
            setImmediate(dispatcher.dispatch.bind(dispatcher, data));
        } else {
            dispatcher.dispatch(data);
        }
    },

    editDeveloperOptions(settings) {
        this.getModule("setDeveloperOptionSettings").setDeveloperOptionSettings(
            settings,
        );
    },

    toggleGuildFolder(id) {
        Discord.getModule("toggleGuildFolderExpand").toggleGuildFolderExpand(
            id,
        );
    },

    login(token) {
        Logger.log(`Logging in with token ${token}...`);
        this.getModule("loginToken").loginToken(token);
    },

    getToken(id) {
        return (token = this.getModule("hideToken").getToken(id));
    },

    _getCurrentChannelID() {
        return this.getModule("getLastSelectedChannelId").getChannelId();
    },

    _getCurrentGuildID() {
        return this.getModule("getLastSelectedGuildId").getGuildId();
    },

    get currentChannel() {
        return this.getModule("hasChannel").getChannel(
            this._getCurrentChannelID(),
        );
    },

    get currentGuild() {
        return this.getModule("getGuild").getGuild(this._getCurrentGuildID());
    },

    createSlashCommand(name, description, options = [], callback) {
        this._createCommand(name, description, options, 1, callback);
    },

    //    createUserCommand(name, callback) {
    //        Discord._createCommand(name, "", [], 2, callback);
    //    }

    //    createMessageCommand(name, callback) {
    //        Discord._createCommand(name, "", [], 3, callback);
    //    }

    transitionTo: {
        get history() {
            return this.getModule("transitionTo").getHistory();
        },
        route(path) {
            return Discord.getModule("transitionTo").transitionTo(path);
        },
        back() {
            return Discord.getModule("transitionTo").back();
        },
        forward() {
            return Discord.getModule("transitionTo").forward();
        },
        guild(id) {
            return Discord.getModule("transitionToGuild").transitionToGuild(id);
        },
        channel(id) {
            return Discord.getModule("transitionToChannel").transitionToChannel(
                id,
            );
        },
        thread(id) {
            return Discord.getModule("transitionToThread").transitionToThread(
                id,
            );
        },
        message(channelID, id) {
            return Discord.getModule("transitionToMessage").transitionToMessage(
                channelID,
                id,
            );
        },
    },
};

class Client {
    constructor() {
        this.events = {};
    }

    connect() {
        let state = this;
        Discord.Dispatcher._interceptor = function (e) {
            let promise = state.emit(e.type.toLowerCase(), e);
            Promise.resolve(promise);
        };
        Discord.logger.log("Successfully hooked into the client!");
    }

    disconnect() {
        Discord.Dispatcher._interceptor = undefined;
        Discord.logger.log("Successfully unhooked from the client!");
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
                Logger.log(`Error in '${event}', callback: '${e}'`);
            }
        }
    }

    get sessionID() {
        return Discord.getModule("getSessionId").getSessionId();
    }

    get fingerprint() {
        return Discord.getModule("getFingerprint").getFingerprint();
    }

    get user() {
        return Discord.getModule("getCurrentUser").getCurrentUser();
    }

    get guilds() {
        return Discord.getModule("getGuilds").getGuilds();
    }

    get sortedGuilds() {
        return Discord.getModule("getSortedGuilds").getSortedGuilds();
    }

    get privateChannels() {
        return Discord.getModule(
            "getMutablePrivateChannels",
        ).getSortedPrivateChannels();
    }

    getGuild(id) {
        return Discord.getModule("getGuild").getGuild(id);
    }

    joinGuild(id, lurking = false) {
        return Discord.getModule("joinGuild").joinGuild(id, {
            lurker: lurking,
        });
    }

    getGuildChannels(guildID) {
        return Object.values(
            Discord.getModule(
                "getMutableGuildChannelsForGuild",
            ).getMutableGuildChannelsForGuild(guildID),
        );
    }

    getChannel(id) {
        return Discord.getModule("hasChannel").getChannel(id);
    }

    getChannelThreads(channelID) {
        return Discord.getModule(
            "getAllThreadsForParent",
        ).getAllThreadsForParent(channelID);
    }

    createDM(id) {
        existing = Discord.getModule("getDMFromUserId").getDMFromUserId(id);
        if (existing) {
            return this.getChannel(existing);
        }
        return Discord.getModule("openPrivateChannel").openPrivateChannel(id);
    }

    getUser(id) {
        return Discord.getModule("getUser").getUser(id);
    }

    getGuildMember(guildID, id) {
        return Discord.getModule("getMember").getMember(guildID, id);
    }

    getGuildMembers(guildID) {
        return Discord.getModule("getMembers").getMembers(guildID);
    }

    requestGuildMembers(
        ids,
        { query = "", limit = 10, presences = true, userIDs = [] },
    ) {
        if (userIDs) {
            return Discord.getModule("requestMembers").requestMembersById(
                ids,
                userIDs,
                presences,
            );
        } else {
            return Discord.getModule("requestMembers").requestMembers(
                ids,
                query,
                limit,
                presences,
            );
        }
    }

    getChannelMessages(channelID) {
        return Discord.getModule("getMessages").getMessages(channelID);
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
            channel = Discord._getCurrentChannelID();
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
        return Discord.getModule("sendMessage").sendMessage(
            channel,
            msg,
            null,
            params,
        );
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
        let msg = Discord._createMessage(content, embeds);
        msg.author = author || this.user;
        msg.type = type;
        msg.tts = tts;
        msg.sticker_ids = stickerIDs;
        msg.message_reference = messageReference;
        msg.allowed_mentions = allowedMentions;
        return Discord._sendLocalMessage(msg.channel_id, msg);
    }

    sendClydeMessage(content, embeds) {
        return Discord.getModule("sendBotMessage").sendBotMessage(
            Discord._getCurrentChannelID(),
            content,
            embeds,
        );
    }

    sendClydeError() {
        return Discord.getModule("sendBotMessage").sendClydeError(
            Discord.getCurrentChannelID(),
        );
    }

    acceptInvite(invite, transition = true) {
        if (transition) {
            return Discord.getModule(
                "acceptInvite",
            ).acceptInviteAndTransitionToInviteChannel(invite);
        } else {
            return Discord.getModule("acceptInvite").acceptInvite(invite);
        }
    }
}
