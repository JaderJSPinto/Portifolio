import express from "express";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving
    // In this environment, we might not need this block if we rely on the dev server
    // but good practice to have it or just rely on Vite middleware for now since we are in dev.
    // However, the instructions say "The container's Node version supports TypeScript type stripping."
    // and "Set the start script in package.json to node server.ts".
    // So we should probably handle production serving too if needed, but for now dev is priority.
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
