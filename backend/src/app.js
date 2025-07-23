import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";

const app = express();

// Security Middleware
app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:8000", // Replace with your frontend origin
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Logging
app.use(morgan("dev"));

// Body Parsing
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

// Cookie Parser
app.use(cookieParser());

// Static Files
app.use(express.static("public"));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Routes
import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";

app.get("/", (req, res) => {
  res.send("Hello World from Express!");
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

// Error Middleware
app.use(errorMiddleware);

export default app;
