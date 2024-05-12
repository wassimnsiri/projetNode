import { Router } from "express";

import { addproduit} from "../controllers/produit.controller.js";



const produitrouter = Router();
produitrouter.post('/addproduit', addproduit);

export default produitrouter;