import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import environment from "vite-plugin-environment";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: "../../.env" });

export default defineConfig({
  build: {
    emptyOutDir: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
    {
      name: "did-resolver",
      resolveId(source) {
        if (source.endsWith(".did")) {
          return source;
        }
      },
      load(id) {
        if (id.endsWith(".did")) {
          // Read the .did file contents
          const fs = require("fs");
          const didContent = fs.readFileSync(id, "utf-8");
          return `export default \`${didContent}\`;`;
        }
      },
    },
  ],
  resolve: {
    alias: [
      {
        find: "declarations",
        replacement: path.resolve(__dirname, "../declarations"),
        "@": "/src",
      },
    ],
    extensions: [".js", ".json", ".did"],
  },
});
