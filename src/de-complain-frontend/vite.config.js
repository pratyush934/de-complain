import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import environment from "vite-plugin-environment";

// Load environment variables
dotenv.config({ path: "../../.env" });

export default defineConfig(({ mode }) => {
  // Load env variables
  const env = loadEnv(mode, process.cwd(), "");

  return {
    // Define global constants
    define: {
      "process.env.NODE_ENV": JSON.stringify(mode),
      "process.env": JSON.stringify(env),
    },

    // Build configuration
    build: {
      emptyOutDir: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return "vendor";
            }
          },
        },
      },
    },

    // Dependency optimization
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: "globalThis",
        },
      },
    },

    // Development server configuration
    server: {
      port: 3000,
      open: true,
      proxy: {
        "/api": {
          target: "http://127.0.0.1:4943", // ✅ Ensure it points to your backend
          changeOrigin: true,
          secure: false,
        },
      },
      headers: {
        "Content-Security-Policy":
          "default-src 'self' 'unsafe-inline' http://localhost:* http://127.0.0.1:* https://icp0.io https://*.icp0.io https://icp-api.io; script-src 'self' 'unsafe-inline' 'unsafe-eval';",
      },
    },

    // Plugins configuration
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
            try {
              const fs = require("fs");
              const didContent = fs.readFileSync(id, "utf-8");
              return `export default \`${didContent}\`;`;
            } catch (error) {
              console.error(`Failed to load .did file: ${id}`, error);
              return null;
            }
          }
        },
      },
    ],

    // Resolve configuration
    resolve: {
      alias: [
        {
          find: "@",
          replacement: path.resolve(__dirname, "src"),
        },
        {
          find: "declarations",
          replacement: path.resolve(__dirname, "../declarations"),
        },
      ],
      extensions: [".js", ".jsx", ".json", ".did"],
    },

    // Performance optimization
    performance: {
      maxEntrypointSize: 1024000, // 1MB
      maxAssetSize: 1024000, // 1MB
      hints: "warning",
    },
  };
});
