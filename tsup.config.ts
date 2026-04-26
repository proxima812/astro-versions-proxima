import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/index.ts"],
    format: ["esm"],
    dts: true,
    outDir: "dist",
    outExtension: () => ({ js: ".mjs" }),
    clean: true,
    external: ["astro"],
  },
  {
    entry: ["src/runtime/config.ts"],
    format: ["esm"],
    dts: true,
    outDir: "dist/runtime",
    outExtension: () => ({ js: ".mjs" }),
    external: ["astro"],
  },
]);
