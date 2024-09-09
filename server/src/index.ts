import express from "express";
// import {app,server} from "./socket/index"
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/index.route";
import STATUS from "./utils/status";
import dbConnect from "./config/db";
import * as cron from 'cron';
import rootCron from "./cron/index"
import updateStatusShippedToSuccess from "./cron/job1";
import { createServer } from "http";
import { initSocket } from "./socket";
const job = new cron.CronJob(rootCron.jobSchedules.job1, updateStatusShippedToSuccess, null, true, rootCron.timezone);

// Bắt đầu công việc cron
job.start();

dotenv.config();
const app = express();
const server = createServer(app);

// cấu hình req
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL!,
      "http://localhost:4000",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
// connect db
dbConnect();

initSocket(server)

app.use("/api/v1", router);

app.use("*", (req, res) => {
  res.status(STATUS.BAD_REQUEST).json({
    message: "Đường dẫn không đúng",
    path: req.baseUrl,
  });
});

server.listen(process.env.PORT, () => {
  console.log(`listening listening http://localhost:${process.env.PORT}`);
});
