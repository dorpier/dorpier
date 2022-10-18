const originalFunctions = new Map();
const currentPatches = new Array();

function removePatchesFromList(signature) {
    for (var i = 0; i < currentPatches.length; i += 1) {
        let patch = currentPatches[i];
        if (patch.signature == signature) {
            currentPatches.splice(i, 1);
        }
    }
}

export default {
    _patchModule(type, module, func, callback, signature) {
        if (!module) {
            throw new TypeError("Must specify the module to patch");
        }
        if (!func) {
            throw new TypeError("Must specify what function to patch");
        }
        if (typeof module[func] !== "function") {
            throw new TypeError("Function to patch not found");
        }
        if (!callback) {
            throw new TypeError("Must specify a callback");
        }
        signature = signature || Symbol();

        let originalFunction = module[func];
        if (!originalFunctions[func]) {
            originalFunctions[func] = module[func];
        }

        const isPatchInCurrentOnes = currentPatches.find(
            (patch) => patch.signature === signature,
        );
        if (!isPatchInCurrentOnes) {
            currentPatches.push({
                signature: signature,
                patchType: type,
                patchOn: func,
                callback: callback,
            });
        }

        const unpatcher = () => this.unpatch(module, func, signature);

        switch (type) {
            case "before":
                originalFunction = module[func];
                module[func] = function () {
                    const res = callback.apply(this, arguments);
                    if (res?.result) return res.result;
                    else if (res?.arguments) {
                        return originalFunction.apply(this, res.arguments);
                    }
                    return originalFunction.apply(this, arguments);
                };
                return unpatcher;
            case "after":
                originalFunction = module[func];
                module[func] = function () {
                    const result = originalFunction.apply(this, arguments);
                    return callback.apply(this, [arguments, result]);
                };
                return unpatcher;
            case "instead":
                originalFunction = module[func];
                module[func] = callback;
                return unpatcher;
            default:
                throw new TypeError(
                    "Invalid patch type, must be one of: [before, after, instead]",
                );
        }
    },

    before(module, func, callback, signature) {
        this._patchModule("before", module, func, callback, signature);
    },

    instead(module, func, callback, signature) {
        this._patchModule("instead", module, func, callback, signature);
    },

    after(module, func, callback, signature) {
        this._patchModule("after", module, func, callback, signature);
    },

    unpatch(module, func, signature) {
        if (!module) {
            throw new TypeError("You must specify a module to unpatch");
        }
        if (!func) {
            throw new TypeError("You must specify a function to unpatch");
        }

        if (typeof signature === "undefined") {
            module[func] = originalFunctions[func];
            for (var i = 0; i < currentPatches.length; i += 1) {
                let patch = currentPatches[i];
                if (patch.patchOn == func) {
                    currentPatches.splice(i, 1);
                }
            }
        } else {
            this.unpatchAll(module, func);
            removePatchesFromList(signature);
            for (const patch of currentPatches) {
                this._patchModule(
                    patch.patchType,
                    module,
                    patch.patchOn,
                    patch.callback,
                    patch.signature,
                );
            }
        }
    },

    unpatchAll(module, func) {
        if (!module) {
            throw new TypeError("You must specify a module to unpatch");
        }
        if (!func) {
            throw new TypeError("You must specify a function to unpatch");
        }

        module[func] = originalFunctions[func];
    },
};
