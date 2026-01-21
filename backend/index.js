import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import courseRouter from "./routes/course.routes.js";
import testRouter from "./routes/test.routes.js";
import McqRouter from "./routes/mcq.routes.js";
import DsaRouter from "./routes/dsa.routes.js";

dotenv.config();

const app = express();


connectDB();


app.use(
  cors({
    origin: "https://codeversefrontend.vercel.app/",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

/* ROUTES */
app.use("/api/auth", authRouter);
app.use("/api/courses", courseRouter);
app.use("/api/tests", testRouter);
app.use("/api/mcqs", McqRouter);
app.use("/api/dsa", DsaRouter);

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("Backend live on Vercel 🚀");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;


