import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import router from "./routes/user.routes.js";
import produitrouter from "./routes/produit.route.js";
import chauffeurrouter from "./routes/chauffeur.routes.js";
import path from "path";
import depotrouter from "./routes/depot.routes.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import chauffeur from "./models/chauffeur.model.js";




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

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Serve the 'index.html' file when the root URL is accessed

// Load environment variables
dotenv.config();

app.set("view engine", "ejs");
app.set("views", "./public");


// Connect to the database


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

app.use(cors());






app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

