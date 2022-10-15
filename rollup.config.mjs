import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import swc from "rollup-plugin-swc3";

/**
 * @type {import("rollup").RollupOptions}
 */
const config = {
  input: "src/index.js",
  output: {
    file: "dist.js",
    format: "iife",
    compact: true,
  },
  plugins: [
    nodeResolve({ modulesOnly: true }),
    commonjs({
      include: ["./src/index.js", "node_modules/**"],
      sourceMap: false,
    }),
    swc({
      jsc: {
        parser: {
          syntax: "typescript",
        },
        target: "es2022",
      },
      minify: true,
    }),
  ],
};

export default config;
