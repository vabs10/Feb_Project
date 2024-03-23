import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookie from "cookie-parser";
import upload from "express-fileupload";
import userRouter from './routes/userRouter.js';
import applicationRouter from './routes/applicationRouter.js';
import jobRouter from './routes/jobRouter.js';
import {dbConnect} from './database/dbConnect.js';
import {errorMiddleware} from './middleware/error.js';

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use(cookie());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  upload({
    useTempFiles: true,
    tempFileDir: "./tmp",
  })
);

app.use("/api/user", userRouter);
app.use("/api/application", applicationRouter);
app.use("/api/job", jobRouter);

dbConnect();
app.use(errorMiddleware);
export default app;
