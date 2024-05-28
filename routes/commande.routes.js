import { Router } from "express";
import { addCommande } from "../controllers/commande.controller.js";


const commanderouter = Router();

commanderouter.post('/addcommande', addCommande);



export default commanderouter;