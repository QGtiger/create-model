import { defineConfig } from "tsup";

export default defineConfig({
  entryPoints: ["src/index.tsx"],
  dts: true,
  clean: true,
  format: ["esm"],
  external: ["react"],
  treeshake: true,
  minify: true,
  sourcemap: false,
  splitting: true,
  ignoreWatch: ["**/dist", "**/node_modules"],
});
