import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

const app = express();

// --------------------------------------
// 🔐 Security Middleware
// --------------------------------------
app.use(helmet()); // Sets secure HTTP headers
app.use(cors({
    origin: "*", // TODO: In production, use a whitelist like ["https://yourdomain.com"]
    methods: ["GET", "POST", "PUT", "DELETE"],
}));
// --------------------------------------
// 🧾 Logging
// --------------------------------------
app.use(morgan("dev")); // Logs HTTP requests
// --------------------------------------
// 📦 Body Parsing
// --------------------------------------
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({
    extended: true,
    limit: "10mb", // Increase if you expect large form submissions
}));
// --------------------------------------
// 📂 Static Files
// --------------------------------------
app.use(express.static("public")); // Serve static assets from /public
// --------------------------------------
// 🚫 Rate Limiting
// --------------------------------------
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// --------------------------------------
// 📌 Routes
// --------------------------------------
app.get("/", (req, res) => {
    res.send("Hello World from Express!");
});

// --------------------------------------
// ❌ 404 Handler
// --------------------------------------
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// --------------------------------------
// ❗ Error Handler
// --------------------------------------
app.use((err, req, res, next) => {
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Internal Server Error" });
});


export default app;
