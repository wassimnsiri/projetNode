import { Router } from "express";

import { addproduit ,getproduits} from "../controllers/produit.controller.js";



const produitrouter = Router();
produitrouter.post('/addproduit', addproduit);
produitrouter.get('/getproduits', getproduits);

export default produitrouter;