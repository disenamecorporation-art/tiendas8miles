import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const CONFIG_PATH = path.join(process.cwd(), "supabase_config.json");

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route to save Supabase config dynamically from the admin panel
  app.post("/api/config", (req, res) => {
    const { url, anonKey } = req.body;
    if (!url || !anonKey) {
      return res.status(400).json({ error: "URL and anonKey are required" });
    }
    try {
      fs.writeFileSync(
        CONFIG_PATH,
        JSON.stringify({ url: url.trim(), anonKey: anonKey.trim() }, null, 2)
      );
      console.log("Supabase config successfully persisted to:", CONFIG_PATH);
      return res.json({ success: true, message: "Configuration saved successfully on the server." });
    } catch (err: any) {
      console.error("Failed to write config file:", err);
      return res.status(500).json({ error: "Failed to persist configuration on server." });
    }
  });

  // API Route to retrieve the saved Supabase config
  app.get("/api/config", (req, res) => {
    // 1. Try to read from environment variables first
    const envUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const envKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
    
    if (envUrl && envKey) {
      return res.json({ url: envUrl, anonKey: envKey, source: "environment" });
    }

    // 2. Fallback to reading the dynamically saved json file
    if (fs.existsSync(CONFIG_PATH)) {
      try {
        const fileContent = fs.readFileSync(CONFIG_PATH, "utf-8");
        const parsed = JSON.parse(fileContent);
        return res.json({ ...parsed, source: "file" });
      } catch (err) {
        console.error("Failed to parse config file:", err);
      }
    }

    // 3. Fallback to default demo DB
    return res.json({
      url: "https://mkjxewpobfjgrytvnlib.supabase.co",
      anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ranhld3BvYmZqZ3J5dHZubGliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyMzE1ODUsImV4cCI6MjEwMTgwNzU4NX0.DGtvHNS1XZ7vPhR29M6VTFE7TI_pVH55zw-YCF34cb4",
      source: "default_fallback"
    });
  });

  // Vite middleware setup for assets/routing
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
