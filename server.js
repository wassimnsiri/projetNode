import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

import bodyParser from "body-parser";
import router from "./routes/user.routes.js";
import path from "path";
import connectDB from "./config/connectDB.js";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { fileURLToPath } from "url";
import { dirname } from "path";






const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Serve the 'index.html' file when the root URL is accessed

// Load environment variables
dotenv.config();

app.set("view engine", "ejs");
app.set("views", "./public");

// Connect to the database
connectDB();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/img", express.static("public/images"));
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.static("public"));


app.use("/user", router);

app.use(cors());






server.listen(process.env.PORT, () => {
  console.log(
    `Server is running ${process.env.HOST} on port ${process.env.PORT}`
  );
});

export { io };