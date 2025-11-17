import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// ...existing code...
export default defineConfig(({ mode }) => ({
-  server: {
-    host: "::",
-    port: 8080,
-  },
+  server: {
+    // Use 0.0.0.0 to accept connections from LAN/localhost reliably on Windows.
+    // You can also use `host: true`.
+    host: "0.0.0.0",
+    port: 8080,
+    // don't fail if port is busy
+    strictPort: false,
+    // improve HMR behavior across network/containers
+    hmr: {
+      protocol: "ws",
+      host: "localhost",
+    },
+  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
