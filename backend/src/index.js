import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import DBConnect from "./db/db.js";
import app from "./app.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;

let server; // to store server instance

// Start app
(async () => {
  try {
    await DBConnect();
    server = app.listen(PORT, () => {
      console.log(`🚀 Server running → http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err.message || err);
    process.exit(1);
  }
})();

// Graceful shutdown
const gracefulShutdown = async (signal) => {
  console.log(`\n📴 ${signal} received. Shutting down gracefully...`);
  if (server) {
    server.close(() => {
      console.log("🛑 Server closed");
    });
  }
  // Close DB connection
  await mongoose.connection.close();
  console.log("🔌 MongoDB connection closed");
  process.exit(0);
};

// Handle signals
process.on("SIGINT", () => gracefulShutdown("SIGINT"));   // Ctrl+C
process.on("SIGTERM", () => gracefulShutdown("SIGTERM")); // kill command
process.on("uncaughtException", (err) => {
  console.error("💥 Uncaught Exception:", err);
  gracefulShutdown("uncaughtException");
});
process.on("unhandledRejection", (reason) => {
  console.error("💥 Unhandled Promise Rejection:", reason);
  gracefulShutdown("unhandledRejection");
});
