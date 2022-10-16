/**
 * Makes a lazy function. On first call, the value is computed.
 * On subsequent calls, the same computed value will be returned
 * @param {() => any} factory Factory function
 */
export function makeLazy(factory) {
    let cache;

    return () => cache ?? (cache = factory());
}

/**
 * Wraps the result of {@link makeLazy} in a Proxy you can consume as if it wasn't lazy.
 * On first property access, the lazy is evaluated
 * @param {() => any} factory lazy factory
 * @returns {any}
 *
 * Note that the example below exists already as an api, see {@link lazyWebpack}
 * @example const mod = lazy(() => findByProps("blah")); console.log(mod.blah);
 *
 * @type {<T>(fn: () => T) => T}
 */
export const lazy = function (factory) {
    const lazy = makeLazy(factory);

    return new Proxy(function () {}, {
        get: (_, prop) => lazy()[prop],
        set: (_, prop, value) => (lazy()[prop] = value),
        has: (_, prop) => prop in lazy(),
        apply: (_, $this, args) => lazy().apply($this, args),
        ownKeys: () => Reflect.ownKeys(lazy()),
        construct: (_, args) => Reflect.construct(lazy(), args),
        deleteProperty: (_, prop) => delete lazy()[prop],
        defineProperty: (_, property, attributes) =>
            !!Object.defineProperty(lazy(), property, attributes),
        getPrototypeOf: () => Object.getPrototypeOf(lazy()),
    });
};
