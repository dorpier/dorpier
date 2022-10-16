const _originalFunctions = new Map();
const _currentPatches = new Array();

function _patchModule(type, module, func, callback, signature) {
    if (!module) {
        throw new TypeError("Must specify the module to patch");
    }
    if (!func) {
        throw new TypeError("Must specify what function to patch");
    }
    if (!callback) {
        throw new TypeError("Must specify a callback");
    }
    signature = signature || crypto.randomUUID();

    let originalFunction = module[func];
    if (!this._originalFunctions[func]) {
        this._originalFunctions[func] = module[func];
    }

    const isPatchInCurrentOnes = this._currentPatches.find(
        (patch) => patch.signature === signature,
    );
    if (!isPatchInCurrentOnes) {
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
            return () => this.unpatch(module, func, signature);
        case "after":
            originalFunction = module[func];
            module[func] = function () {
                let result = originalFunction.apply(this, arguments);
                callback.apply(this, [[...arguments], result]);
                return result;
            };
            return () => this.unpatch(module, func, signature);
        case "instead":
            originalFunction = module[func];
            module[func] = callback;
            return () => this.unpatch(module, func, signature);
        default:
            throw new TypeError(
                "Invalid patch type, must be one of: [before, after, instead]",
            );
    }
}

function _removePatchesFromList(signature) {
    for (var i = 0; i < this._currentPatches.length; i += 1) {
        let patch = this._currentPatches[i];
        if (patch.signature == signature) {
            this._currentPatches.splice(i, 1);
        }
    }
}

export default {
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
            module[func] = this._originalFunctions[func];
            for (var i = 0; i < this._currentPatches.length; i += 1) {
                let patch = this._currentPatches[i];
                if (patch.patchOn == func) {
                    this._currentPatches.splice(i, 1);
                }
            }
        } else {
            this.unpatchAll(module, func);
            this._removePatchesFromList(signature);
            for (const patch of this._currentPatches) {
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

        module[func] = this._originalFunctions[func];
    },
};
