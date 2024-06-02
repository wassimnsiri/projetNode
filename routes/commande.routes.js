import { Router } from "express";
import { passecommande ,getallcommandeandmakethesamecommandeforsameusertogather,changestaus} from "../controllers/commande.controller.js";


const commanderouter = Router();

commanderouter.post('/addcommande', passecommande);
commanderouter.get('/getcommande', getallcommandeandmakethesamecommandeforsameusertogather);
commanderouter.post('/updatecommande', changestaus);


export default commanderouter;