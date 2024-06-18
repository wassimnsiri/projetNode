import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import router from "./routes/user.routes.js";
import produitrouter from "./routes/produit.route.js";
import commandeRouter from "./routes/commande.routes.js";
import chauffeurrouter from "./routes/chauffeur.routes.js";
import path from "path";
import depotrouter from "./routes/depot.routes.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import reclamationrouter from "./routes/reclamtion.routes.js";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const port = process.env.PORT || 3030;
const databaseName = 'esbpfe';

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose
  .connect(`mongodb://0.0.0.0:27017/${databaseName}`)
  .then(() => {
    console.log(`Connected to ${databaseName}`);
  })
  .catch(err => {
    console.log(err);
  });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Load environment variables
dotenv.config();

app.set("view engine", "ejs");
app.set("views", "./public");

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
app.use("/produit", produitrouter);
app.use("/depot", depotrouter);
app.use("/chauffeur", chauffeurrouter);
app.use("/commande", commandeRouter);
app.use("/reclamation", reclamationrouter);

io.on("connection", (socket) => {
  console.log("A user connected");
  
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
  socket.on("sendMessage", (data) => {
    // Handle incoming messages and broadcast to other users
    io.emit("receiveMessage", data);
  });
});

app.use(cors());

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
export { io };