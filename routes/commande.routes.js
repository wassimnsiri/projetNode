import { Router } from "express";
import { passecommande ,getallcommandeandmakethesamecommandeforsameusertogather} from "../controllers/commande.controller.js";


const commanderouter = Router();

commanderouter.post('/addcommande', passecommande);
commanderouter.get('/getcommande', getallcommandeandmakethesamecommandeforsameusertogather);



export default commanderouter;