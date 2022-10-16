import {
    modules,
    find,
    findAll,
    findAndScope,
    byDisplayName,
    byProps,
    byCode,
    cached,
} from "./find";

export default {
    get modules() {
        return modules();
    },

    find: find,

    findAll: findAll,

    findByID(id) {
        id = parseInt(id);
        return cached().c[id]?.exports;
    },

    findByDisplayName(displayName) {
        return findAndScope((m) => byDisplayName(m, displayName));
    },

    findByDisplayNameAll(displayName) {
        return findAndScope((m) => byDisplayName(m, displayName), true);
    },

    findByProps(...props) {
        return findAndScope((m) => byProps(m, props));
    },

    findByPropsAll(...props) {
        return findAndScope((m) => byProps(m, props), true);
    },

    findByCode(code) {
        return byCode(code);
    },

    findByCodeAll(code) {
        return byCode(code, true);
    },

    _getModule(args, all = false) {
        if (args.length > 1) {
            return this.findByProps(...args);
        } else if (args[0] instanceof RegExp) {
            return byCode(args[0], all);
        } else if (Array.isArray(args[0])) {
            return (all ? this.findByPropsAll : this.findByProps)(...args[0]);
        } else {
            const arg = args[0];

            switch (typeof arg) {
                case "function":
                    return (all ? findAll : find)(arg);
                case "number":
                    return this.findByID(arg);
                default:
                    return findAndScope(
                        (m) => byDisplayName(m, arg) || byProps(m, [arg]),
                        all,
                    );
            }
        }
    },

    getModule(...args) {
        return this._getModule(args);
    },

    getModules(...args) {
        return this._getModule(args, true);
    },
};
