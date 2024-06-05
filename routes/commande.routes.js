import { Router } from "express";
import { passecommande,totalprice, revenuedechagejour ,getallcommandeandmakethesamecommandeforsameusertogather,changestaus,getcommandebyuserId} from "../controllers/commande.controller.js";


const commanderouter = Router();

commanderouter.post('/addcommande', passecommande);
commanderouter.get('/getcommande', getallcommandeandmakethesamecommandeforsameusertogather);
commanderouter.post('/updatecommande', changestaus);
commanderouter.get('/getcommande/:userId', getcommandebyuserId);
commanderouter.get('/test',totalprice)
commanderouter.get('/revenue',revenuedechagejour)


export default commanderouter;