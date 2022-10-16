export function cached() {
    const webp = window.webpackChunkdiscord_app.push([
        [Symbol()],
        {},
        (_) => _,
    ]);
    window.webpackChunkdiscord_app.pop();
    return webp;
}

export function modules() {
    const ret = [];
    for (const module of Object.values(cached().c)) {
        if (module.exports && module.exports !== window) {
            ret.push(module.exports);
        }
    }
    return ret;
}

export function find(filter) {
    return modules().find(filter);
}

export function findAll(filter) {
    return modules().filter(filter);
}

export function findAndScope(filter, all = false) {
    const func = all ? findAll : find;
    var results = all ? [] : null;

    const modules = func(function (module) {
        const res = filter(module);
        if (res) {
            all ? results.push(res) : (results = res);
        }
        return res;
    });

    return all
        ? results.map((res, index) =>
              typeof res === "string" ? modules[index][res] : modules[index],
          )
        : typeof results === "string"
        ? modules[results]
        : modules;
}

export function byDisplayName(exports, name) {
    if (exports?.displayName === name) {
        return true;
    }

    for (const i of Object.getOwnPropertyNames(exports)) {
        if (exports[i]?.displayName === name) {
            return i;
        }
    }
}

export function byProps(exports, props) {
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
            if (object && typeof object === "object" && prop in object) {
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
}

export function byCode(code, all = false) {
    if (typeof code === "string") {
        const originalCode = code;
        code = {
            test: (e) => (e.includes ? e.includes(originalCode) : false),
        };
    }

    const { m, c } = cached();
    const results = Object.entries(m).filter(([, module]) =>
        code.test(module.toString()),
    );

    if (all) {
        const ret = [];
        for (const [id] of results) {
            const exports = c[id]?.exports;
            if (exports) {
                ret.push(exports);
            }
        }
        return ret;
    } else {
        return c[results.find(([id]) => c[id]?.exports)?.id || null]?.exports;
    }
}
