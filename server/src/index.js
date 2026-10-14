import mongoose from "mongoose";
import { createApp } from "./app.js";
import { connectDb } from "./db.js";
import { env } from "./env.js";
await connectDb(env.MONGODB_URI);
const server = createApp().listen(env.PORT, () => {
  console.log(`API listening on http://localhost:${env.PORT} (${env.NODE_ENV})`);
});
async function shutdown(signal) {
  console.log(`${signal} received, shutting down`);
  server.close(async () => {
    await mongoose.disconnect();
    process.exit(0);
  });
}
process.on("SIGINT", () => void shutdown("SIGINT"));
process.on("SIGTERM", () => void shutdown("SIGTERM"));
