Plugins = {
    _plugins: [],
    _corePlugins: [{
        name: "doNotTrack",
        start: function() {
            Discord.patchModule("instead", Discord.getModule("track"), "track", function() {
                return;
            }, "DoNotTrack.1");
            Discord.patchModule("instead", window, "onerror", function() {
                return;
            }, "DoNotTrack.2");
            Discord._originalFunctions._DiscordSentry = window.DiscordSentry;
            window.DiscordSentry = {};
        },
        stop: function() {
            Discord.unpatchByPatchSignature(Discord.getModule("track"), "track", "DoNotTrack.1");
            Discord.unpatchByPatchSignature(window, "onerror", "DoNotTrack.2");
            if (typeof _originalDiscordSentry !== "undefined") {
                window.DiscordSentry = _originalDiscordSentry
            }
        }
    }, {
        name: "silentTyping",
        start: function() {
            Discord.patchModule("instead", Discord.getModule("startTyping"), "startTyping", function() {
                return;
            }, "silentTyping")
        },
        stop: function() {
            Discord.unpatchByPatchSignature(Discord.getModule("startTyping"), "startTyping", "silentTyping")
        }
    }, {
        name: "discordDeveloperMode",
        start: function() {
            Object.defineProperty((window.webpackChunkdiscord_app.push([
                [""], {}, (e) => {
                    m = [];
                    for (let c in e.c) {
                        m.push(e.c[c])
                    }
                }
            ]), m).find((m) => m?.exports?.default?.isDeveloper !== void 0).exports.default, "isDeveloper", {
                get: () => true,
                configurable: true
            });
            window.webpackChunkdiscord_app.pop();
        },
        stop: function() {
            Object.defineProperty((window.webpackChunkdiscord_app.push([
                [""], {}, (e) => {
                    m = [];
                    for (let c in e.c) {
                        m.push(e.c[c])
                    }
                }
            ]), m).find((m) => m?.exports?.default?.isDeveloper !== void 0).exports.default, "isDeveloper", {
                get: () => false,
                configurable: true
            });
            window.webpackChunkdiscord_app.pop();
        }
    }, {
        name: "allowNsfw",
        start: function() {
            Discord.getModule("getCurrentUser").getCurrentUser().nsfwAllowed = true;
        },
        stop: function() {
            Discord.getModule("getCurrentUser").getCurrentUser().nsfwAllowed = false;
        }
    }],
    _findPluginByName(name, pluginSet) {
        for (var i = 0; i < pluginSet.length; i += 1) {
            if (pluginSet[i].name == name) {
                return pluginSet[i]
            }
        }
    },
    start(name) {
        Plugins._findPluginByName(name, Plugins._plugins).start();
    },
    stop(name) {
        Plugins._findPluginByName(name, Plugins._plugins).stop();
    },
    add(json) {
        Plugins._plugins.push(json)
    }
};
(Logger = {
    _log: true,
    enable() {
        this._log = true;
    },
    disable() {
        this._log = false;
    },
    log(message) {
        if (this._log == true) {
            console.log(`%c[discordjs-pure] (LOGGER)%c ${message}`, "color: #9e0700", "color: #ffffff", );
        }
    }
}), (Utils = {
    random(min, max) {
        let rand = Math.floor(Math.random() * (max - min)) + min;
        return rand
    },
    sleep(milliseconds) {
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i += 1) {
            if (new Date().getTime() - start > milliseconds) {
                break
            }
        }
        return new Date().getTime() - start
    }
});
Discord = {
    __version__: {
        number: 3.5,
        nightly: true
    },
    _originalFunctions: {},
    _currentPatches: [],
    get webpackExports() {
        f = () => true;
        (e = webpackChunkdiscord_app.push([
            [Math.random()], {}, (e) => {
                webpackChunkdiscord_app.pop();
                return e
            }
        ])), (m = []);
        for (let i in e.c) {
            if (Object.hasOwnProperty.call(e.c, i)) {
                let o = e.c[i].exports;
                if (!o) {
                    continue
                }
                if (f(o)) {
                    m.push(o)
                }
            }
        }
        return m
    },
    _createCommand(name, description, options, type, callback) {
        options.forEach((option) => {
            option.displayName = option.name;
            option.displayDescription = option.description
        });
        actualCallback = function(data) {
            data.forEach((element) => {
                delete element.focused
            });
            callback(data)
        };
        this.getModule("BUILT_IN_COMMANDS").BUILT_IN_COMMANDS.push({
            applicationId: "-1",
            description: description,
            displayDescription: description,
            displayName: name,
            id: `-${this.getModule("BUILT_IN_COMMANDS").BUILT_IN_COMMANDS.length + 1}`,
            execute: actualCallback,
            name: name,
            inputType: 0,
            options: options,
            type: type
        })
    },
    _createMessage(content, embeds) {
        return this.getModule("createBotMessage").createBotMessage(this.getCurrentChannelID(), content, embeds)
    },
    _sendLocalMessage(channel, message) {
        return this.getModule("receiveMessage").receiveMessage(channel, message)
    },
    _getCurrentChannelID() {
        return this.getModule("getLastSelectedChannelId", "getChannelId").getChannelId()
    },
    get _cachedWebpack() {
        let webp = window.webpackChunkdiscord_app.push([
            [Symbol()], {},
            _ => _.c
        ]);
        window.webpackChunkdiscord_app.pop();
        return webp
    },
    showToast(message, type) {
        if (!type) {
            let type = 0
        }
        Discord.getModule("showToast").showToast({
            message: message,
            type: type
        })
    },
    async createPromptModal(title, defaultValue = "") {
        const cache = () => {
            let webp = window.webpackChunkdiscord_app.push([
                [Symbol()], {},
                _ => _.c
            ]);
            window.webpackChunkdiscord_app.pop();
            return webp
        };
        const TextInput = () => {
            let m = [];
            ((n) => {
                m.push(...Object.values(cache()).filter((m) => m?.exports && ((m?.exports?.default && Object.keys(m.exports.default).some((k) => k.toLowerCase().includes(n), )) || (m.exports?.default?.prototype && Object.keys(m.exports.default.prototype, ).some((k) => k.toLowerCase().includes(n), )) || Object.keys(m.exports).some((k) => k.toLowerCase().includes(n), )), ), )
            })("textinput");
            m.forEach((f) => m.push(typeof f?.exports?.default === "undefined" ? f?.exports : f?.exports?.default, ), );
            for (var i = 0; i < m.length; i += 1) {
                m.forEach((f, i) => typeof f?.id === "undefined" ? (m = m) : m.splice(i, 1), )
            }
            return [...m][3]
        };
        let ConfirmationModal = () => {
            let m = [];
            ((n) => {
                m.push(...Object.values(cache()).filter((m) => m?.exports && ((m?.exports?.default && Object.keys(m.exports.default).some((k) => k.toLowerCase().includes(n), )) || (m.exports?.default?.prototype && Object.keys(m.exports.default.prototype, ).some((k) => k.toLowerCase().includes(n), )) || Object.keys(m.exports).some((k) => k.toLowerCase().includes(n), )), ), )
            })("confirmmodal");
            m.forEach((f) => m.push(typeof f?.exports?.default === "undefined" ? f?.exports : f?.exports?.default, ), );
            for (var i = 0; i < m.length; i += 1) {
                m.forEach((f, i) => typeof f?.id === "undefined" ? (m = m) : m.splice(i, 1), )
            }
            return [...m][0]
        };
        let Button = () => {
            for (const m of Object.keys(cache()).map((x) => cache()[x].exports).filter((x) => x)) {
                if (m.default && m.default["ButtonColors"] !== undefined) {
                    return m.default
                }
            }
        };
        let Messages = () => {
            for (const m of Object.keys(cache()).map((x) => cache()[x].exports).filter((x) => x)) {
                if (m && m["COMMANDS"] !== undefined) {
                    return m
                }
            }
        };
        let openModal = () => {
            for (const m of Object.keys(cache()).map((x) => cache()[x].exports).filter((x) => x)) {
                if (m && m["openModal", "closeModal"] !== undefined) {
                    return m.openModal
                }
            }
        };
        let React = () => {
            for (const m of Object.keys(cache()).map((x) => cache()[x].exports).filter((x) => x)) {
                if (m && m["createElement"] !== undefined) {
                    return m
                }
            }
        };
        let toReturn = "";
        return new Promise((resolve) => {
            openModal()(props => {
                if (props.transitionState === 3) {
                    resolve(null)
                }
                return React().createElement(ConfirmationModal(), Object.assign({
                    header: title,
                    confirmButtonColor: Button().ButtonColors.BRAND,
                    confirmText: Messages().OKAY,
                    cancelText: Messages().CANCEL,
                    onConfirm: () => resolve(toReturn),
                    onCancel: () => resolve(null),
                    children: React().createElement(React().memo(() => {
                        const [value, setValue] = React().useState(defaultValue);
                        return React().createElement(TextInput(), {
                            value: value,
                            onInput: ({
                                target
                            }) => {
                                setValue(target.value);
                                toReturn = target.value
                            }
                        })
                    }))
                }, props))
            })
        })
    },
    async createAlertModal(title, descr) {
        const cache = () => {
            let webp = window.webpackChunkdiscord_app.push([
                [Symbol()], {},
                _ => _.c
            ]);
            window.webpackChunkdiscord_app.pop();
            return webp
        };
        let ConfirmationModal = () => {
            let m = [];
            ((n) => {
                m.push(...Object.values(cache()).filter((m) => m?.exports && ((m?.exports?.default && Object.keys(m.exports.default).some((k) => k.toLowerCase().includes(n), )) || (m.exports?.default?.prototype && Object.keys(m.exports.default.prototype, ).some((k) => k.toLowerCase().includes(n), )) || Object.keys(m.exports).some((k) => k.toLowerCase().includes(n), )), ), )
            })("confirmmodal");
            m.forEach((f) => m.push(typeof f?.exports?.default === "undefined" ? f?.exports : f?.exports?.default, ), );
            for (var i = 0; i < m.length; i += 1) {
                m.forEach((f, i) => typeof f?.id === "undefined" ? (m = m) : m.splice(i, 1), )
            }
            return [...m][0]
        };
        let Button = () => {
            for (const m of Object.keys(cache()).map((x) => cache()[x].exports).filter((x) => x)) {
                if (m.default && m.default["ButtonColors"] !== undefined) {
                    return m.default
                }
            }
        };
        let Messages = () => {
            for (const m of Object.keys(cache()).map((x) => cache()[x].exports).filter((x) => x)) {
                if (m && m["COMMANDS"] !== undefined) {
                    return m
                }
            }
        };
        let openModal = () => {
            for (const m of Object.keys(cache()).map((x) => cache()[x].exports).filter((x) => x)) {
                if (m && m["openModal", "closeModal"] !== undefined) {
                    return m.openModal
                }
            }
        };
        let React = () => {
            for (const m of Object.keys(cache()).map((x) => cache()[x].exports).filter((x) => x)) {
                if (m && m["createElement"] !== undefined) {
                    return m
                }
            }
        };
        let Markdown = () => {
            modules = [];
            filter = m => m.default?.displayName === "Markdown" && m.default.rules;
            for (let item in cache()) {
                if (Object.hasOwnProperty.call(cache(), item)) {
                    let element = cache()[item].exports;
                    if (!element) {
                        continue
                    }
                    if (filter(element)) {
                        modules.push(element)
                    }
                }
            }
            return modules[0].default
        };
        let Alert = () => {
            modules = [];
            filter = m => m.default?.displayName === "Alert";
            for (let item in cache()) {
                if (Object.hasOwnProperty.call(cache(), item)) {
                    let element = cache()[item].exports;
                    if (!element) {
                        continue
                    }
                    if (filter(element)) {
                        modules.push(element)
                    }
                }
            }
            return modules[0].default
        };
        return new Promise((resolve) => {
            openModal()(props => {
                if (props.transitionState === 3) {
                    resolve(null)
                };
                return React().createElement(ConfirmationModal(), Object.assign({
                    header: title,
                    confirmButtonColor: Button().ButtonColors.BRAND,
                    confirmText: Messages().OKAY,
                    cancelText: Messages().CANCEL,
                    onConfirm: () => resolve(true),
                    onCancel: () => resolve(false)
                }, props), React().createElement(Markdown(), {}, descr))
            })
        })
    },
    getModule(n, f = true) { // whether to return the first module
        let x = false;
        let mod;
        window.webpackChunkdiscord_app.push([
            [Math.random()], {}, (e) => {
                mod = mod || Object.values(e.c).find(m => m?.exports?.default?.[n]);
            }
        ]);
        window.webpackChunkdiscord_app.pop();
        if (typeof mod === "undefined") {
            window.webpackChunkdiscord_app.push([
                [Math.random()], {}, (e) => {
                    mod = mod || Object.values(e.c).find(m => m?.exports?.[n]);
                }
            ]);
            window.webpackChunkdiscord_app.pop();
        }
        if (typeof mod === "undefined") {
            x = true;
            if (f == true) {
                mod = mod || (typeof Discord.findAllModules(m => m?.default?.displayName === n) !== "undefined") ? Discord.findAllModules(m => m?.default?.displayName === n)?.[0] : Discord.findAllModules(m => m?.displayName === n)?.[0];
            } else {
                mod = mod || (typeof Discord.findAllModules(m => m?.default?.displayName === n) !== "undefined") ? Discord.findAllModules(m => m?.default?.displayName === n) : Discord.findAllModules(m => m?.displayName === n);
            }
        }

        if (x == false) {
            return (typeof mod.exports.default !== "undefined") ? mod.exports.default : mod.exports;
        } else if (x == true) {
            return (typeof mod.default !== "undefined") ? mod.default : mod;
        }
        return undefined;
    },
    findModuless(n, b) {
        (d = typeof b === "undefined" ? true : b), (n = n.toLowerCase()), (m = []);
        m.push(...Object.values(Discord._cachedWebpack).filter((m) => m?.exports && ((m?.exports?.default && Object.keys(m.exports.default).some((key) => key.toLowerCase().includes(n), )) || (m.exports?.default?.prototype && Object.keys(m.exports.default.prototype, ).some((key) => key.toLowerCase().includes(n), )) || Object.keys(m.exports).some((key) => key.toLowerCase().includes(n), )), ), );
        if (d) {
            m.forEach((f) => m.push(typeof f?.exports?.default === "undefined" ? f?.exports : f?.exports?.default, ), );
            for (var i = 0; i < m.length; i += 1) {
                m.forEach((f, i) => typeof f?.id === "undefined" ? (m = m) : m.splice(i, 1), )
            }
            return [...m];
        } else {
            return [...m];
        }
    },
    findAllModules(filter = (m) => m) {
        let modules = [];
        for (let item in Discord._cachedWebpack) {
            if (Object.hasOwnProperty.call(Discord._cachedWebpack, item)) {
                let element = Discord._cachedWebpack[item].exports;
                if (!element) {
                    continue
                }
                if (filter(element)) {
                    modules.push(element)
                }
            }
        }
        return modules
    },
    patchModule(type, module, func, callback, signature) {
        if (!type) {
            throw new TypeError("You must specify what type of patch to perform.", )
        }
        if (!module) {
            throw new TypeError("You must specify the module to patch.")
        }
        if (!func) {
            throw new TypeError("You must specify what function to patch.")
        }
        if (!callback) {
            throw new TypeError("You must specify a callback.")
        }
        if (!signature) {
            throw new TypeError("You must specify a signature/name for your patch.", )
        }
        let originalFunction = module[func];
        if (!this._originalFunctions[func]) {
            this._originalFunctions[func] = module[func]
        }
        var isPatchInCurrentOnes = false;
        for (var i = 0; i < this._currentPatches.length; i += 1) {
            let patch = this._currentPatches[i];
            if (patch.signature == signature) {
                isPatchInCurrentOnes = true
            }
        }
        if (isPatchInCurrentOnes != true) {
            this._currentPatches.push({
                signature: signature,
                patchType: type,
                patchOn: func,
                callback: callback
            })
        }
        switch (type) {
            case "before":
                originalFunction = module[func];
                module[func] = function() {
                    callback.apply(this, [...arguments]);
                    return originalFunction.apply(this, arguments)
                };
                break;
            case "after":
                originalFunction = module[func];
                module[func] = function() {
                    let result = originalFunction.apply(this, arguments);
                    callback.apply(this, [
                        [...arguments], result
                    ]);
                    return result
                };
                break;
            case "instead":
                originalFunction = module[func];
                module[func] = callback;
                break;
            default:
                Logger.log("Unknown patch, aborting!");
                break
        }
    },
    _unpatchEntireModule(module, func) {
        module[func] = this._originalFunctions[func];
    },
    _removePatchesFromList(func, signature) {
        for (var i = 0; i < this._currentPatches.length; i += 1) {
            let patch = this._currentPatches[i];
            if (patch.signature == signature) {
                this._currentPatches.splice(i, 1)
            }
        }
        return
    },
    _stepOneOfPatchSignatureUnpatching(module, func, signature) {
        Discord._unpatchEntireModule(module, func);
        Discord._removePatchesFromList(func, signature)
    },
    unpatchByPatchSignature(module, func, signature) {
        if (!module) {
            throw new TypeError("You must specify a module to unpatch.");
        }
        if (!func) {
            throw new TypeError("You must specify a function to unpatch.");
        }
        if (!signature) {
            throw new TypeError("You must specify a patch signature to unpatch by.");
        }
        Discord._stepOneOfPatchSignatureUnpatching(module, func, signature);
        for (var i = 0; i < this._currentPatches.length; i += 1) {
            let patch = this._currentPatches[i];
            Discord.patchModule(patch.patchType, module, patch.patchOn, patch.callback, patch.signature);
        }
    },
    unpatchModule(module, func) {
        if (!module) {
            throw new TypeError("You must specify a module to unpatch.")
        }
        if (!func) {
            throw new TypeError("You must specify a function to unpatch.")
        }
        module[func] = this._originalFunctions[func];
        for (var i = 0; i < this._currentPatches.length; i += 1) {
            let patch = this._currentPatches[i];
            if (patch.patchOn == func) {
                this._currentPatches.splice(i, 1)
            }
        }
    },
    dispatch(name, data) {
        data.type = name.toUpperCase();
        return this.getModule("dirtyDispatch").dirtyDispatch(data)
    },
    changeDeveloperOptions(settings) {
        if (!settings) {
            throw new TypeError("You must specify settings to change.")
        }
        this.getModule("setDeveloperOptionSettings").setDeveloperOptionSettings(settings)
    },
    login(token) {
        this.getModule("loginToken").loginToken(token)
    },
    getToken() {
        let token = this.getModule("getToken").getToken();
        if (token.includes(".") == false) {
            if (window.localStorage != undefined) {
                Logger.log("Grabbing token from localStorage...");
                return window.localStorage.getItem("token").replaceAll('"', "")
            } else {
                Logger.log("Grabbing token from popup...");
                let popup = window.open("");
                if (!popup) {
                    return alert("[discordjs-pure] The popup required to grab the token was blocked! Allow popups or this won't work. After you allow popups, reload this page and re-paste this script.", )
                }
                popup.document.write("Getting token...");
                window.dispatchEvent(new Event("beforeunload"));
                let token = JSON.parse(popup.localStorage.token);
                popup.close();
                return token
            }
        }
        Logger.log("Grabbing token from client...");
        return token
    },
    get React() {
        return this.getModule("createElement")
    },
    tracking: {
        disable: function() {
            Plugins._findPluginByName("doNotTrack", Plugins._corePlugins).start();
            Logger.log("Attempted to disable Discord's tracking.")
        },
        enable: function() {
            Plugins._findPluginByName("doNotTrack", Plugins._corePlugins).stop();
            Logger.log("Attempted to enable Discord's tracking.")
        }
    },
    typing: {
        disable: function() {
            Plugins._findPluginByName("silentTyping", Plugins._corePlugins).start();
            Logger.log("Attempted to disable typing notifications.")
        },
        enable: function() {
            Plugins._findPluginByName("silentTyping", Plugins._corePlugins).stop();
            Logger.log("Attempted to enable typing notifications.")
        }
    },
    developerMode: {
        enable: function() {
            Plugins._findPluginByName("discordDeveloperMode", Plugins._corePlugins).start();
            Logger.log("Attempted to enable hidden developer options.")
        },
        disable: function() {
            Plugins._findPluginByName("discordDeveloperMode", Plugins._corePlugins).stop();
            Logger.log("Attempted to disable hidden developer options.")
        }
    },
    nsfw: {
        enable: function() {
            Plugins._findPluginByName("allowNsfw", Plugins._corePlugins, ).start();
            Logger.log("Attempted to patch the current user and allow them to view NSFW media.", )
        },
        disable: function() {
            Plugins._findPluginByName("allowNsfw", Plugins._corePlugins).stop();
            Logger.log("Attempted to patch the current user and disallow them from viewing NSFW media.", )
        }
    },
    amoledDarkMode: {
        enable: function() {
            var css = `.theme-dark,.theme-light,:root{--background-primary:black;--background-secondary:rgb(20, 20, 20);--background-secondary-alt:rgb(28, 28, 28);--background-tertiary:rgb(10, 10, 10);--background-accent:var(--background-secondary-alt);--background-floating:rgb(12, 12, 12);--channeltextarea-background:rgb(15, 15, 15);--searcharea-background:var(--background-secondary);--input-background:var(--background-tertiary);--channels-default:#8b8b8b;--header-primary:#fff;--header-secondary:#b9bbbe;--text-normal:#dcddde;--text-muted:#969696;--scroller-thumb:rgb(30, 30, 30);--scroller-track:rgb(10, 10, 10);--background-modifier-rgb:40, 40, 40;--background-modifier-hover:rgba(var(--background-modifier-rgb), 0.4);--background-modifier-active:rgba(var(--background-modifier-rgb), 0.6);--background-modifier-selected:rgba(var(--background-modifier-rgb), 0.6);--background-modifier-accent:rgba(var(--background-modifier-rgb), 0.48);--interactive-normal:#b9bbbe;--interactive-hover:#dcddde;--interactive-active:#fff;--interactive-muted:rgb(75, 75, 75);--elevation-low:0 1px 0 rgba(40, 40, 50, 0.2), 0 1.5px 0 rgba(60, 60, 70, 0.05), 0 2px 0 rgba(40, 40, 50, 0.05)}#app-mount .layer-86YKbF .item-4m-12I[aria-checked=false]:not(:hover){background-color:var(--background-tertiary)}#app-mount .layer-86YKbF .cardFolder-3H4uH4{background-color:var(--background-secondary-alt)}#app-mount .layer-86YKbF .avatarUploaderInnerSquareDisabled-3M9eJS{background-color:var(--background-secondary-alt)}#app-mount .layer-86YKbF .container-3EtAkD{background-color:var(--background-secondary)}#app-mount .layer-86YKbF .container-3EtAkD:hover{background-color:var(--background-tertiary)}#app-mount .layer-86YKbF .container-3EtAkD:hover .icon-2DGsye{background-color:var(--background-primary)}#app-mount .layer-86YKbF .icon-2DGsye{background-color:var(--background-tertiary)}#app-mount .layer-86YKbF .primary-38Hs-h:hover:not(.disabled-184-il),#app-mount .layer-86YKbF .secondary-2bzKEX{background-color:var(--background-secondary-alt)}#app-mount .layer-86YKbF .primary-38Hs-h:hover:not(.disabled-184-il):hover,#app-mount .layer-86YKbF .secondary-2bzKEX:hover{background-color:var(--background-secondary)}#app-mount .layer-86YKbF .previewContainer-1GxmBJ{background-color:var(--background-secondary)}#app-mount .layer-86YKbF .previewContainer-1xQAsw .theme-light{display:none}#app-mount .layer-86YKbF .previewContainer-1xQAsw .messageContainer-3a6gLR{background-color:var(--background-secondary)}#app-mount .layer-86YKbF .tierHeaderLocked-30MLlO,#app-mount .layer-86YKbF .tierHeaderUnlocked-1OpOLf{background-color:var(--background-secondary)}#app-mount .layer-86YKbF .tierBody-1d3UiS{background-color:var(--background-secondary-alt)}#app-mount .layer-86YKbF .auditLog-1NVAY0{border-color:var(--background-secondary)}#app-mount .layer-86YKbF .divider-M3saWq,#app-mount .layer-86YKbF .headerExpanded-1-zwDr{background-color:var(--background-secondary)}#app-mount .layer-86YKbF .changeDetails-1kMZqI,#app-mount .layer-86YKbF .headerClickable-zGQJz3,#app-mount .layer-86YKbF .headerDefault-1e6yjj{background-color:var(--background-secondary-alt)}#app-mount .layer-86YKbF .card-WWLYDO{background-color:var(--background-secondary-alt)}#app-mount .layer-86YKbF .iconMask-1EYGrv{background-color:var(--background-secondary)}#app-mount .layer-86YKbF .css-17e1tep-control,#app-mount .layer-86YKbF .css-6fzn47-control,#app-mount .layer-86YKbF .css-gvi9bl-control,#app-mount .layer-86YKbF .inputWrapper-3a4ywb{background-color:var(--input-background)}#app-mount .layer-86YKbF .welcomeChannel-_Q4qAA{background-color:var(--background-secondary-alt)}#app-mount .layer-86YKbF:not(.baseLayer-W6S8cY) .copyInput-3AbKWB{border-color:var(--background-secondary);background-color:var(--background-tertiary)}#app-mount .sidebarRegionScroller-FXiQOh{background-color:var(--background-primary)}#app-mount .header-6h98Y_{background-color:var(--background-primary)}#app-mount .closeButton-PCZcma{border-color:var(--background-secondary-alt)}#app-mount .closeButton-PCZcma:hover{background-color:var(--background-secondary-alt)}#app-mount .keybind-13vtq8{color:var(--text-normal)}#app-mount .settingCard-xZSDjS{background-color:var(--background-secondary)}#app-mount .cardPrimary-3qRT__,#app-mount .cardPrimaryEditable-2mz_3i{background-color:var(--background-secondary)}#app-mount .iconWrapper-1sOtkE{background-color:var(--background-tertiary)}#app-mount .itemFilled-1cPbtg:not(:hover):not([aria-checked=true]){background-color:var(--background-secondary-alt)}#app-mount .itemFilled-1cPbtg[aria-checked=true]{background-color:var(--background-tertiary) !important}#app-mount .default-1Tkeeg{background-color:var(--background-secondary-alt)}#app-mount .container-30qY7E{background-color:var(--background-tertiary)}#app-mount .container-30qY7E.fileUpload-3JzU7g:not(:hover){border-color:var(--background-secondary)}#app-mount .noticeRegion-qjyUVg .container-20TyK0{background-color:var(--background-secondary) !important}#app-mount .bar-1Bhnl9:not(.microphone-2RrrW7,.speaking-2Crrvt),#app-mount .markDash-yk2kJ-{background-color:var(--background-secondary-alt)}#app-mount .layer-86YKbF .profileBannerPreview-3mLIdO{background-color:var(--background-tertiary)}#app-mount .layer-86YKbF .cardPrimaryOutline-1ofwVz{border-color:var(--background-secondary)}#app-mount .layer-86YKbF .accountList-Wii_T5{background-color:var(--background-secondary)}#app-mount .layer-86YKbF .accountBtn-3pgcgr .accountBtnInner-3ttD-i:not(:hover){background-color:var(--background-secondary-alt)}#app-mount .layer-86YKbF .connectionHeader-Ixbb1s{background-color:var(--background-secondary)}#app-mount .layer-86YKbF .connection-YOVI9j{background-color:var(--background-secondary-alt)}#app-mount .layer-86YKbF .outer-2JOHae{background-color:var(--background-secondary)}#app-mount .layer-86YKbF .outer-2JOHae:hover{background-color:var(--background-tertiary)}#app-mount .layer-86YKbF .noIcon-3gSX9V{background-color:var(--background-secondary-alt)}#app-mount .layer-86YKbF .gemIndicatorContainer-PqApbX{background-color:var(--background-tertiary)}#app-mount .layer-86YKbF .promotionCard-mo7ClH{background-color:var(--background-secondary)}#app-mount .layer-86YKbF .paginator-1eqD2g,#app-mount .layer-86YKbF .payment-2bOh4k,#app-mount .layer-86YKbF .paymentPane-ut5qKZ{background-color:var(--background-secondary)}#app-mount .layer-86YKbF .hoverablePayment-lE1s4t{background-color:var(--background-secondary)}#app-mount .layer-86YKbF .hoverablePayment-lE1s4t:hover{background-color:var(--background-tertiary)}#app-mount .layer-86YKbF .bottomDivider-ZmTm-j{border-color:var(--background-secondary-alt)}#app-mount .layer-86YKbF .expandedInfo-1W31i3{background-color:var(--background-secondary-alt)}#app-mount .layer-86YKbF .codeRedemptionRedirect-2hYMSQ{border-color:var(--background-tertiary);background-color:var(--background-secondary)}#app-mount .layer-86YKbF .previewMessage-2g_aBv{background-color:var(--background-secondary-alt)}#app-mount .layer-86YKbF .notches-2w7UZJ.gray-3wP137{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg height='20' width='8' xmlns='http://www.w3.org/2000/svg' fill='black'%3E%3Cpath d='M0 0h8v20H0zm4 2a2 2 0 00-2 2v12a2 2 0 104 0V4a2 2 0 00-2-2z' fill-rule='evenodd'/%3E%3C/svg%3E")}#app-mount .layer-86YKbF .cameraWrapper-3a7Ngv{border-color:var(--background-secondary)}#app-mount .layer-86YKbF .backgroundOptionInner-SSz19O{background-color:var(--background-tertiary)}#app-mount .layer-86YKbF .notDetected-M3Ghh2{background-color:var(--background-secondary-alt)}#app-mount .layer-86YKbF .game-2f2vPC{box-shadow:0 1px 0 0 var(--background-secondary-alt)}#app-mount .layer-86YKbF .option-1QI4c9:not(.selected-18Wszc):not(:hover){background-color:var(--background-secondary-alt)}#app-mount .layer-86YKbF .powercord-entities-manage-tabs{background-color:var(--background-secondary)}#app-mount .layer-86YKbF .container-2oNtJn{background-color:var(--background-secondary)}#app-mount .button-1EGGcP .buttonColor-3bP3fX,#app-mount .button-1EGGcP.buttonColor-3bP3fX,#app-mount .button-3Vyz67,#app-mount .lookFilled-yCfaCM.colorGrey-2iAG-B,#app-mount .lookFilled-yCfaCM.colorPrimary-2AuQVo{background-color:#282828}#app-mount .button-1EGGcP .buttonColor-3bP3fX:enabled:hover,#app-mount .button-1EGGcP.buttonColor-3bP3fX:enabled:hover,#app-mount .button-3Vyz67:enabled:hover,#app-mount .lookFilled-yCfaCM.colorGrey-2iAG-B:enabled:hover,#app-mount .lookFilled-yCfaCM.colorPrimary-2AuQVo:enabled:hover{background-color:#1e1e1e}#app-mount .button-3Vyz67:hover{background-color:#1e1e1e}#app-mount .container-2nx-BQ[style="opacity:1; background-color: hsl(218,calc(var(--saturation-factor,1) * 4.6%),46.9%);"]{background-color:#282828 !important}#app-mount .colorable-3rVGna.primaryDark-2UJt1G{background-color:#282828}.hljs-comment{color:#505050}.hljs-tag{color:#b0b0b0}.hljs-operator,.hljs-punctuation,.hljs-subst{color:#d0d0d0}.hljs-operator{opacity:0.7}.hljs-bullet,.hljs-deletion,.hljs-name,.hljs-selector-tag,.hljs-template-variable,.hljs-variable{color:#fb9fb1}.hljs-attr,.hljs-link,.hljs-literal,.hljs-number,.hljs-symbol,.hljs-variable.constant_{color:#eda987}.hljs-class .hljs-title,.hljs-title,.hljs-title.class_{color:#ddb26f}.hljs-strong{font-weight:bold;color:#ddb26f}.hljs-addition,.hljs-code,.hljs-string,.hljs-title.class_.inherited__{color:#acc267}.hljs-built_in,.hljs-doctag,.hljs-keyword.hljs-atrule,.hljs-quote,.hljs-regexp{color:#12cfc0}.hljs-attribute,.hljs-function .hljs-title,.hljs-section,.hljs-title.function_,.ruby .hljs-property{color:#6fc2ef}.diff .hljs-meta,.hljs-keyword,.hljs-selector-attr,.hljs-selector-class,.hljs-selector-id,.hljs-selector-pseudo,.hljs-template-tag,.hljs-type{color:#e1a3ee}.hljs-emphasis{color:#e1a3ee;font-style:italic}.hljs-meta,.hljs-meta .hljs-keyword,.hljs-meta .hljs-string{color:#deaf8f}.hljs-meta .hljs-keyword,.hljs-meta-keyword{font-weight:bold}.theme-light #app-mount::after{content:"This theme is NOT meant to be used in Light Mode. Please switch over to Dark Mode in Settings -> Appearance.";position:absolute;display:flex;align-items:center;justify-content:center;top:22px;right:0;bottom:calc(100% - 58px);left:72px;border-top-left-radius:8px;font-weight:500;font-size:14px;color:white;background-color:#ed4245}.theme-light #app-mount .container-YkUktl .flex-2S1XBF .button-12Fmur:last-child{-webkit-animation:flash 1s ease infinite;animation:flash 1s ease infinite;color:white;background-color:#ed4245}.theme-light #app-mount #user-settings-cog-Appearance{-webkit-animation:flash 1s ease infinite;animation:flash 1s ease infinite;color:white;background-color:#ed4245 !important}.theme-light #app-mount [aria-activedescendant^=user-settings-cog-Appearance] #user-settings-cog-Appearance--dark{-webkit-animation:flash 1s ease infinite;animation:flash 1s ease infinite;color:white;background-color:#ed4245 !important}.theme-light #app-mount [aria-controls=appearance-tab]{-webkit-animation:flash 1s ease infinite;animation:flash 1s ease infinite;color:white;background-color:#ed4245 !important}.theme-light #app-mount [aria-label=USER_SETTINGS] [tabindex="-1"] + [class=marginTop40-Q4o1tS] .item-2idW98:nth-of-type(1){-webkit-animation:flash 1s ease infinite;animation:flash 1s ease infinite;color:white;background-color:#ed4245 !important}.theme-light #app-mount .base-2jDfDU{margin-top:36px}.theme-light #app-mount .sidebar-1tnWFu{border-radius:0}@-webkit-keyframes flash{0%{box-shadow:0 2px 10px rgba(237, 66, 69, 0.2), 0 0 0 2px rgba(237, 65, 68, 0.1)}70%{box-shadow:0 0 20px 15px rgba(237, 66, 69, 0.1), 0 0 0 6px rgba(237, 65, 68, 0.1)}100%{box-shadow:0 0 20px 15px rgba(237, 66, 69, 0), 0 0 0 6px rgba(237, 65, 68, 0.1)}}@keyframes flash{0%{box-shadow:0 2px 10px rgba(237, 66, 69, 0.2), 0 0 0 2px rgba(237, 65, 68, 0.1)}70%{box-shadow:0 0 20px 15px rgba(237, 66, 69, 0.1), 0 0 0 6px rgba(237, 65, 68, 0.1)}100%{box-shadow:0 0 20px 15px rgba(237, 66, 69, 0), 0 0 0 6px rgba(237, 65, 68, 0.1)}}#app-mount .scrollerBase-_bVAAt.thin-31rlnD::-webkit-scrollbar-thumb{background-color:var(--scroller-thumb)}#app-mount .scrollerBase-_bVAAt.auto-2K3UW5::-webkit-scrollbar-thumb{background-color:var(--scroller-thumb)}#app-mount .scrollerBase-_bVAAt.auto-2K3UW5::-webkit-scrollbar-track{background-color:var(--scroller-track)}.titleBar-1it3bQ.typeWindows-2-g3UY::after{content:"";position:absolute;pointer-events:none;background:url('data:image/svg+xml;utf8,<svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="moon" class="svg-inline--fa fa-moon fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="%236b6b6b" d="M279.135 512c78.756 0 150.982-35.804 198.844-94.775 28.27-34.831-2.558-85.722-46.249-77.401-82.348 15.683-158.272-47.268-158.272-130.792 0-48.424 26.06-92.292 67.434-115.836 38.745-22.05 28.999-80.788-15.022-88.919A257.936 257.936 0 0 0 279.135 0c-141.36 0-256 114.575-256 256 0 141.36 114.576 256 256 256zm0-464c12.985 0 25.689 1.201 38.016 3.478-54.76 31.163-91.693 90.042-91.693 157.554 0 113.848 103.641 199.2 215.252 177.944C402.574 433.964 344.366 464 279.135 464c-114.875 0-208-93.125-208-208s93.125-208 208-208z"></path></svg>') center/100% no-repeat;width:16px;height:16px;left:5px;top:4px}.titleBar-1it3bQ .wordmarkWindows-2dq6rw{margin-left:13px;color:#6b6b6b}#app-mount .callContainer-HtHELf .tile-2TcwiO{background-color:var(--background-secondary)}#app-mount .container-3wLKDe{background-color:var(--background-primary)}#app-mount .container-3wLKDe .mainCard-3KBsBI,#app-mount .container-3wLKDe .sidebarCard-1Gn1ch{background-color:var(--background-secondary);border-color:var(--background-secondary)}#app-mount .container-3wLKDe .container-2IhveL{background-color:var(--background-secondary)}#app-mount .container-3wLKDe .reactionBox-1FeKQU{background-color:var(--background-tertiary)}#app-mount .background-fkKrXt{background-color:var(--background-primary)}#app-mount .container-2Hi7Km{background-color:var(--background-secondary)}#app-mount .container-3rZ3XA,#app-mount .container-xwOzwi{background-color:var(--background-secondary)}@media (max-width: 1300px){#app-mount .container-3rZ3XA,#app-mount .container-xwOzwi{background:none}}#app-mount .container-3HMTms{background-color:var(--background-secondary)}#app-mount .container-3HMTms:not(.fillerCard-28hW81):hover{background-color:var(--background-secondary-alt)}@media (max-width: 1300px){#app-mount .container-3HMTms:not(.fillerCard-28hW81):hover{background-color:var(--background-secondary)}}#app-mount .card-3x20HF .reaction-2A2y9y,#app-mount .container-4HqGB3.background-3X6Uak,#app-mount .emptyStateContainer-xWOMPJ,#app-mount .options-2psDVJ{background-color:var(--background-secondary-alt)}#app-mount .option-3x6TXa:hover{background-color:var(--background-modifier-hover)}#app-mount .card-3x20HF,#app-mount .homeContent-2_a0jF .wrapper-15CKyy{background-color:var(--background-secondary)}#app-mount .container-2o3qEW,#app-mount .members-3WRCEx,#app-mount .members-3WRCEx > div,#app-mount .membersWrap-3NUR2t{background-color:var(--background-primary)}#app-mount .messageListItem-ZZ7v6g:hover{background-color:rgba(255, 255, 255, 0.03)}#app-mount .wrapperAudio-1Bzv_Z .mediaBarWrapper-33h1oY,#app-mount .wrapperAudio-1Bzv_Z .mediaBarWrapper-33h1oY:after,#app-mount .wrapperAudio-1Bzv_Z .mediaBarWrapper-33h1oY:before{background-color:var(--background-secondary)}#app-mount .wrapperAudio-1Bzv_Z .buffer-3eVqKK,#app-mount .wrapperAudio-1Bzv_Z .buffer-3eVqKK:after,#app-mount .wrapperAudio-1Bzv_Z .buffer-3eVqKK:before{background-color:#3a3a3a !important}#app-mount .guildIconImage-74OdmM{background-color:var(--background-secondary)}#app-mount .wrapper-2vIMkT{background-color:var(--background-secondary)}#app-mount .upload-vLbqu-{background-color:var(--background-secondary-alt)}#app-mount .container-cH6QoY .callContainer-BGIngG,#app-mount .container-cH6QoY .container-3r7mfc,#app-mount .container-cH6QoY .participants-3hk3ND,#app-mount .container-cH6QoY .rowContainer-jDvyA4,#app-mount .container-cH6QoY .scroller-35tvpe{background-color:var(--background-primary)}#app-mount .container-cH6QoY .tileContainer-Os085F{background-color:var(--background-primary)}#app-mount .container-cH6QoY .tileContainer-Os085F:hover{background-color:var(--background-secondary-alt)}#app-mount .container-cH6QoY .divider-vv_iHh,#app-mount .container-cH6QoY .separator-3FDGQ4{background-color:var(--background-secondary);border-color:var(--background-secondary)}#app-mount .container-cH6QoY .container-1IyjjY{background-color:var(--background-secondary)}#app-mount .container-cH6QoY .container-1IyjjY:hover{background-color:var(--background-tertiary)}#app-mount .container-cH6QoY .iconBackground-3qSXiM{background-color:var(--background-secondary-alt)}#app-mount .container-1RZJZM .channelTextAreaInner-ITp5kW{background-color:var(--input-background)}#app-mount .folder-241Joy .folderIconWrapper-1oRIZr:hover{background-color:var(--background-secondary-alt)}#app-mount .folder-241Joy .noIcon-3gSX9V{background-color:var(--background-secondary-alt)}.wrapper-1_HaEi .childWrapper-1j_1ub,.wrapper-1_HaEi [class=circleIconButton-1VxDrg]{background-color:var(--background-secondary-alt)}#app-mount .keyboardShortcutsModal-2CRmCm{background-color:var(--background-secondary)}#app-mount .keybindShortcut-3zF1P9 span{box-shadow:inset 0 -4px 0 var(--background-tertiary);border-color:var(--background-tertiary);background-color:var(--background-secondary-alt)}#app-mount .root-g14mjS{box-shadow:0 2px 10px 0 rgba(0, 0, 0, 0.2);background-color:var(--background-secondary)}#app-mount .root-g14mjS .footer-31IekZ,#app-mount .root-g14mjS .footer-3Gu_Tl,#app-mount .root-g14mjS .footer-VCsJQY{box-shadow:none;background-color:var(--background-tertiary)}#app-mount .root-g14mjS .footer-1hTRRZ{background-color:var(--background-secondary)}#app-mount .root-g14mjS .input-3r5zZY{background-color:var(--input-background)}#app-mount .root-g14mjS .scroller-2GkvCq{background-color:var(--background-secondary-alt)}#app-mount .root-g14mjS .reactionSelected-1aMb2K{background-color:var(--background-modifier-selected)}#app-mount .root-g14mjS .container-KM8BU6,#app-mount .root-g14mjS .reactors-1VXca7{background-color:var(--background-secondary)}#app-mount .root-g14mjS .reactorDefault-3GSyaV{box-shadow:inset 0 -1px 0 var(--background-secondary-alt)}#app-mount .root-g14mjS .item-2OyinQ,#app-mount .root-g14mjS .qualitySettingsContainer-2LjkfM{border-color:var(--background-tertiary)}#app-mount .root-g14mjS .card-m7VgZ8,#app-mount .root-g14mjS .item-2OyinQ:not(.selectorButtonSelected-3cQUnj,.selectorButtonSelected-1VZ6hz){background-color:var(--background-secondary-alt)}#app-mount .root-g14mjS .message-G6O-Wv{box-shadow:none;background-color:var(--background-tertiary)}#app-mount .root-g14mjS .optionContainer-yOpaLq{background-color:var(--background-tertiary)}#app-mount .root-g14mjS .optionContainer-yOpaLq:hover{background-color:var(--background-primary)}#app-mount .root-g14mjS .previewLight-IOzFhi{display:none}#app-mount .root-g14mjS .previewDark-3Xp3UB{background-color:var(--background-secondary)}#app-mount .root-g14mjS .perks-2IIbWQ{background-color:var(--background-secondary-alt)}#app-mount .root-g14mjS .childButton-3o_dlg,#app-mount .root-g14mjS .eventCard-2ZL9GD{background-color:var(--background-tertiary)}#app-mount .root-g14mjS .childButton-3o_dlg:hover,#app-mount .root-g14mjS .eventCard-2ZL9GD:hover{background-color:var(--background-primary)}#app-mount .root-g14mjS .contentContainer-BWAau5{background-color:var(--background-secondary)}#app-mount .root-g14mjS .container-3zZkKh,#app-mount .root-g14mjS .rsvpCount-iCkObl{background-color:var(--background-secondary-alt)}#app-mount .root-g14mjS .sidebarContainer-gUKhtL{background-color:var(--background-secondary-alt)}#app-mount .root-g14mjS .contentWrapper-3oy4Xo{background-color:var(--background-secondary)}#app-mount .root-g14mjS .root-cw9rWQ{background-color:var(--background-secondary-alt)}#app-mount .root-g14mjS .modal-2TOYtq{background-color:var(--background-secondary)}#app-mount .root-g14mjS .formFieldWrapper-2LV3S6,#app-mount .root-g14mjS .guildSidebar-UHnQqs{background-color:var(--background-secondary-alt)}#app-mount .root-g14mjS .authBox-1HR6Ha{background-color:var(--background-secondary)}#app-mount .root-g14mjS .list-3-WAYB{background-color:var(--background-secondary-alt)}#app-mount .root-g14mjS .navRow-dG-XX8{background-color:var(--background-tertiary)}#app-mount .root-g14mjS .inviteBannerUpsell-1t_LYM{background-color:var(--background-secondary-alt)}#app-mount .root-g14mjS .ctaSection-3LqbxQ{background-color:var(--background-secondary-alt)}#app-mount .root-g14mjS .formSection-23ecNl{background-color:var(--background-secondary)}#app-mount .root-g14mjS .usagePill-P-Cmcv{background-color:var(--background-secondary)}#app-mount .root-g14mjS .channelsWrapper-51IUFR,#app-mount .root-g14mjS .rolesWrapper-1LLZrU{background-color:var(--background-secondary-alt)}#app-mount .root-g14mjS .authorize-2xTTr-{background-color:var(--background-secondary)}#app-mount .root-g14mjS .container-x8Y1ix,#app-mount .root-g14mjS .guildRow-3fJnG6{background-color:var(--background-secondary)}#app-mount .root-g14mjS .container-x8Y1ix:hover,#app-mount .root-g14mjS .guildRow-3fJnG6:hover{background-color:var(--background-tertiary)}#app-mount .root-g14mjS .rowContainer-3t7486{background-color:var(--background-tertiary)}#app-mount .root-g14mjS .rowContainer-3t7486:hover{background-color:var(--background-primary)}#app-mount .root-g14mjS .lookBlank-21BCro,#app-mount .root-g14mjS .lookLink-15mFoz.colorPrimary-2AuQVo{color:var(--header-primary)}#app-mount .root-g14mjS .formTitle-2YQyhj{color:var(--header-primary)}#app-mount .root-g14mjS .sampleLink-5BWNy9{color:var(--text-muted)}#app-mount .perksModal-CLcR1c{background-color:var(--background-primary)}#app-mount .perksModal-CLcR1c .tierMarkerBackground-G8FoN4{background-color:var(--background-primary)}#app-mount .perksModal-CLcR1c .tierHeaderLocked-3ItHYn{background-color:var(--background-tertiary)}#app-mount .perksModal-CLcR1c .tierBody-3ju-rc{background-color:var(--background-secondary)}#app-mount .perksModal-CLcR1c .perk-19D_HN{background-color:var(--background-secondary-alt)}#app-mount .pageWrapper-2PwDoS{background-color:var(--background-primary)}#app-mount .pageWrapper-2PwDoS .searchBox-pyIJJj:not(.searchBox-31Zv9h){background-color:var(--background-secondary)}#app-mount .container-2cd8Mz{background-color:var(--background-primary)}#app-mount .container-2cd8Mz .container-2oNtJn{background-color:var(--background-secondary)}#app-mount .container-2cd8Mz .wrapper-2RrXDg{background-color:var(--background-tertiary)}#app-mount .container-2cd8Mz .wrapper-2RrXDg:hover{background-color:var(--background-secondary)}#app-mount .container-2cd8Mz .wrapper-2RrXDg:hover .section-3G9aLW{background-color:var(--background-tertiary)}#app-mount .container-2cd8Mz .peopleListItem-u6dGxF:hover{background-color:var(--background-tertiary)}#app-mount .container-2cd8Mz .peopleListItem-u6dGxF:hover .actionButton-3-B2x-{background-color:var(--background-primary)}#app-mount .container-2cd8Mz .addFriendInputWrapper-kkoSV9{background-color:var(--background-secondary)}#app-mount .defaultIndicator-1AxErs{background-color:var(--background-accent)}#app-mount .installationPath-2PbaRC{box-shadow:0 1px 0 0 var(--background-secondary)}#app-mount .hiddenLibraryApplication-lfw1ab{border-bottom-color:var(--background-secondary)}#app-mount .hiddenLibraryApplication-lfw1ab::before{border-color:var(--background-secondary);background-color:var(--background-secondary)}#app-mount .feature-2IUcBI{background-color:var(--background-secondary)}#app-mount .autocomplete-3NRXG8{background-color:var(--background-secondary)}#app-mount .autocomplete-3NRXG8 .selected-3H3-RC{background-color:var(--background-secondary-alt)}#app-mount .autocomplete-3NRXG8 .categoryHeader-OpJ1Ly{background-color:var(--background-secondary)}#app-mount .autocomplete-3NRXG8 .wrapper-22rqw6,#app-mount .autocomplete-3NRXG8 .wrapper-3z7DuG{background-color:var(--background-tertiary)}#app-mount .autocomplete-3NRXG8 .selected-3B2w1z,#app-mount .autocomplete-3NRXG8 .selected-3B2w1z:hover{background-color:var(--background-secondary-alt)}#app-mount .contentWrapper-3vHNP2,#app-mount .emojiPicker-6YCk8a{background-color:var(--background-tertiary)}#app-mount .contentWrapper-3vHNP2 .wrapper-1NNaWG,#app-mount .emojiPicker-6YCk8a .wrapper-1NNaWG{background-color:var(--background-tertiary)}#app-mount .contentWrapper-3vHNP2 .categoryItemDefaultCategorySelected-2YeRUu,#app-mount .contentWrapper-3vHNP2 .categoryItemDefaultCategorySelected-2YeRUu:hover,#app-mount .contentWrapper-3vHNP2 .stickerCategoryGeneric-29JiZ2:hover,#app-mount .contentWrapper-3vHNP2 .stickerCategoryGenericSelected-DnO2K8,#app-mount .contentWrapper-3vHNP2 .stickerCategoryGenericSelected-DnO2K8:hover,#app-mount .emojiPicker-6YCk8a .categoryItemDefaultCategorySelected-2YeRUu,#app-mount .emojiPicker-6YCk8a .categoryItemDefaultCategorySelected-2YeRUu:hover,#app-mount .emojiPicker-6YCk8a .stickerCategoryGeneric-29JiZ2:hover,#app-mount .emojiPicker-6YCk8a .stickerCategoryGenericSelected-DnO2K8,#app-mount .emojiPicker-6YCk8a .stickerCategoryGenericSelected-DnO2K8:hover{background-color:var(--background-secondary-alt)}#app-mount .contentWrapper-3vHNP2 .inspector-DFKXwB,#app-mount .emojiPicker-6YCk8a .inspector-DFKXwB{background-color:var(--background-secondary-alt)}#app-mount .contentWrapper-3vHNP2 .navButtonActive-1EqC5l,#app-mount .emojiPicker-6YCk8a .navButtonActive-1EqC5l{background-color:var(--background-modifier-selected)}#app-mount .contentWrapper-3vHNP2 .container-1SX9VC,#app-mount .contentWrapper-3vHNP2 .container-2oNtJn,#app-mount .emojiPicker-6YCk8a .container-1SX9VC,#app-mount .emojiPicker-6YCk8a .container-2oNtJn{background-color:var(--searcharea-background)}#app-mount .contentWrapper-3vHNP2 .upsell-3B1lnN,#app-mount .emojiPicker-6YCk8a .upsell-3B1lnN{background-color:var(--background-secondary)}#app-mount .wrapper-22rqw6{background-color:var(--background-secondary)}#app-mount .primary-38Hs-h:hover:not(.disabled-184-il),#app-mount .secondary-2bzKEX,#app-mount .tertiary-1e-lAP{background-color:var(--background-secondary-alt)}#app-mount .primary-38Hs-h:hover:not(.disabled-184-il):hover,#app-mount .secondary-2bzKEX:hover,#app-mount .tertiary-1e-lAP:hover{background-color:var(--background-primary)}#app-mount .messageContainer-3VTXBC,#app-mount .messages-23can0{background-color:var(--background-secondary-alt)}#app-mount .messages-23can0 .content-3spvdd{background-color:var(--background-secondary-alt)}#app-mount .tutorialIcon-25VF3Q{background-color:var(--background-secondary-alt)}#app-mount .icon-2yhmi8{background-color:var(--background-secondary-alt)}#app-mount .messageGroupWrapper-1jf_7C{background-color:var(--background-secondary-alt)}#app-mount .layer-2aCOJ3 .header-1w9Q93 + div{background-color:var(--background-secondary)}#app-mount .layer-2aCOJ3 .tab-TRrPC8.active-1grPyy{background-color:var(--background-modifier-selected)}#app-mount .popout-1KHNAq{background-color:var(--background-secondary-alt)}#app-mount .overflowRolesPopout-1Puiuq{background-color:var(--background-tertiary)}#app-mount .container-2rzKKA{background-color:var(--background-tertiary);border-color:var(--background-tertiary)}#app-mount .container-2rzKKA:hover{border-color:var(--background-secondary)}#app-mount .notches-2w7UZJ.black-11MaxJ{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg height='20' width='8' xmlns='http://www.w3.org/2000/svg' fill='rgb(12, 12, 12)'%3E%3Cpath d='M0 0h8v20H0zm4 2a2 2 0 00-2 2v12a2 2 0 104 0V4a2 2 0 00-2-2z' fill-rule='evenodd'/%3E%3C/svg%3E")}#app-mount .colorPickerCustom-1swUKF{background-color:var(--background-secondary);border-color:var(--background-secondary-alt)}#app-mount .tooltipGrey-lpLZjh{background-color:var(--background-secondary)}#app-mount .tooltipGrey-lpLZjh .tooltipPointer-3L49xb{border-top-color:var(--background-secondary)}#app-mount .searchResult-O9NDji{background-color:var(--background-secondary-alt)}#app-mount .button-cfOvv-{background-color:var(--background-secondary)}#app-mount .searchAnswer-23w-CH,#app-mount .searchFilter-2UfsDk{background-color:var(--background-secondary-alt)}#app-mount .container-2McqkF{box-shadow:0 0 0 1px var(--background-tertiary), 0 2px 10px 0 rgba(0, 0, 0, 0.2);background-color:var(--background-tertiary)}#app-mount .container-2McqkF .focused-2FU0YH{background-color:var(--background-tertiary)}#app-mount .container-2McqkF .option-ayUoaq::after{background:none}#app-mount .calendarPicker-sDhzdi .react-datepicker,#app-mount .calendarPicker-sDhzdi .react-datepicker__header{background-color:var(--background-tertiary)}#app-mount .calendarPicker-sDhzdi .react-datepicker__navigation.react-datepicker__navigation--next,#app-mount .calendarPicker-sDhzdi .react-datepicker__navigation.react-datepicker__navigation--previous{background-color:var(--background-secondary)}#app-mount .calendarPicker-sDhzdi .react-datepicker__day--disabled,#app-mount .calendarPicker-sDhzdi .react-datepicker__day--outside-month,#app-mount .calendarPicker-sDhzdi .react-datepicker__day.react-datepicker__day--disabled,#app-mount .calendarPicker-sDhzdi .react-datepicker__day.react-datepicker__day--disabled:hover{background-color:var(--background-secondary)}#app-mount .calendarPicker-sDhzdi .react-datepicker__day,#app-mount .calendarPicker-sDhzdi .react-datepicker__day:last-of-type{border-color:var(--background-secondary-alt)}#app-mount .userPopout-2j1gM4{background-color:var(--background-tertiary)}#app-mount .userPopout-2j1gM4 .avatar-2Vndt_{border-color:var(--background-tertiary);background-color:var(--background-tertiary)}#app-mount .userPopout-2j1gM4 .bodyInnerWrapper-2bQs1k,#app-mount .userPopout-2j1gM4 .footer-3naVBw{background-color:var(--background-tertiary)}#app-mount .userPopout-2j1gM4 .input-2z42oC{background-color:var(--background-secondary)}#app-mount .container-1NXEtd .header-3OsQeK:hover,#app-mount .container-1NXEtd .selected-1GtAC5 .header-3OsQeK{background-color:var(--background-secondary)}#app-mount .container-1NXEtd .hasBanner-2IrYih .header-3OsQeK{background-color:transparent}#app-mount .container-1NXEtd .channelNotice-K4UfZY{border-color:var(--background-secondary)}#app-mount .container-1NXEtd .audienceVoiceUserIconContainer-1aQGLF{background-color:var(--background-secondary)}#app-mount .container-1NXEtd .wrapper-2fEmwW .users-2JoyGL{background-color:var(--background-secondary-alt)}#app-mount .container-1NXEtd .wrapper-2fEmwW .total-1c5KCN{background-color:var(--background-secondary)}#app-mount .container-1NXEtd .wrapper-2fEmwW .total-1c5KCN::after{border-right-color:var(--background-secondary)}#app-mount .scroller-WSmht3{background-color:var(--background-primary)}#app-mount .content-1SgpWY .sidebar-1tnWFu{background-color:var(--background-primary)}#app-mount .content-1SgpWY .sidebar-1tnWFu > nav{background-color:var(--background-primary)}#app-mount .panels-3wFtMD{background-color:var(--background-primary)}`,
                head = document.head || document.getElementsByTagName("head")[0],
                style = document.createElement("style");
            head.appendChild(style);
            style.type = "text/css";
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css))
            }
            Logger.log("Attempted to inject an AMOLED dark mode for Discord desktop.", )
        },
        disable: function() {
            Logger.log("Currently, AMOLED dark mode cannot be disabled automatically. Please reload the page to disable it.");
        }
    }
};
Client = class Client {
    constructor() {
        this.token = Discord.getToken();
        this.events = {}
    }
    get user() {
        return Discord.getModule("getCurrentUser").getCurrentUser();
    }
    on(event, callback) {
        if (this.events[event] === undefined) {
            this.events[event] = []
        }
        this.events[event].push(callback)
    }
    async emit(event, data) {
        if (this.events[event] === undefined) {
            return
        }
        for (let callback of this.events[event]) {
            try {
                await callback(data)
            } catch (e) {
                Logger.log(`Error in '${event}', callback: '${e}'`);
            }
        }
    }
    getGuild(id) {
        return Discord.getModule("getGuild").getGuild(id)
    }
    getChannel(id) {
        return Discord.getModule("hasChannel").getChannel(id)
    }
    getUser(id) {
        return Discord.getModule("getUser").getUser(id)
    }
    startLurking(id) {
        if (!id) {
            throw new TypeError("You must specify a guildID to preview.")
        }
        Discord.getModule("startLurking").startLurking(id, {}, undefined)
    }
    stopLurking(id) {
        if (!id) {
            throw new TypeError("You must specify a guildID to stop previewing.", )
        }
        Discord.getModule("stopLurking").stopLurking(id)
    }
    sendMessage(channel = null, content = "", tts = false, messageReference = null, allowedMentions = null, stickerIDs = null, ) {
        if (!content && !stickerIDs) {
            throw new Error("Must provide either content or stickerIDs.")
        }
        if (!channel) {
            channel = Discord._getCurrentChannelID();
        }
        let msg = {
            content: content,
            tts: tts
        };
        msg.invalidEmojis = [];
        msg.validNonShortcutEmojis = [];
        let params = {};
        if (messageReference != null) {
            params.messageReference = messageReference
        }
        if (allowedMentions != null) {
            params.allowedMentions = allowedMentions
        }
        if (stickerIDs != null) {
            params.stickerIds = stickerIDs
        }
        Discord.getModule("sendMessage").sendMessage(channel, msg, null, params);
        Logger.log(`Attempted to send message with '${content}' '${params}' to '${channel}'.`, )
    }
    createSlashCommand(name, description, options = [], callback) {
        Discord._createCommand(name, description, options, 1, callback)
    }
    createUserCommand(name, callback) {
        Discord._createCommand(name, "", [], 2, callback)
    }
    createMessageCommand(name, callback) {
        Discord._createCommand(name, "", [], 3, callback)
    }
    sendEphemeralMessage(content = "", embeds = [], author = new Client().user, type = 0, tts = false, stickerIDs = [], ) {
        let msg = this._createMessage(content, embeds);
        msg.author = author;
        msg.type = type;
        msg.tts = tts;
        msg.sticker_ids = stickerIDs;
        return Discord._sendLocalMessage(msg.channel_id, msg);
    }
    sendClydeMessage(content) {
        if (!content) {
            throw new TypeError("You must specify content to send.");
        }
        Discord.getModule("sendBotMessage").sendBotMessage(Discord._getCurrentChannelID(), content);
    }
    sendClydeError() {
        Discord.getModule("sendBotMessage").sendClydeError(Discord._getCurrentChannelID())
    }
    connect() {
        let state = this;
        Discord.getModule("Dispatcher").Dispatcher.prototype._interceptor = function(e) {
            let promise = state.emit(e.type.toLowerCase(), e);
            Promise.resolve(promise)
        };
        Logger.log("Successfully hooked into the client!");
    }
    disconnect() {
        Discord.getModule("Dispatcher").Dispatcher.prototype._interceptor = undefined;
        Logger.log("Successfully unhooked from the client!");
    }
};
