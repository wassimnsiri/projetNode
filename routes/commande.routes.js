import { Router } from "express";
import { passecommande ,getallcommandeandmakethesamecommandeforsameusertogather,changestaus,getcommandebyuserId} from "../controllers/commande.controller.js";


const commanderouter = Router();

commanderouter.post('/addcommande', passecommande);
commanderouter.get('/getcommande', getallcommandeandmakethesamecommandeforsameusertogather);
commanderouter.post('/updatecommande', changestaus);
commanderouter.get('/getcommande/:userId', getcommandebyuserId);


export default commanderouter;