import { Router } from "express";
import { countcommandebydate,passecommande,totalprice, revenuedechagejour ,
    getallcommandeandmakethesamecommandeforsameusertogather,changestaus,
    changeStatusOrCancel,getcommandebyuserId} from "../controllers/commande.controller.js";


const commanderouter = Router();

commanderouter.post('/addcommande', passecommande);
commanderouter.get('/getcommande', getallcommandeandmakethesamecommandeforsameusertogather);
commanderouter.post('/updatecommande', changestaus);
commanderouter.get('/getcommande/:userId', getcommandebyuserId);
commanderouter.get('/test',totalprice)
commanderouter.get('/revenue',revenuedechagejour)
commanderouter.get('/statC',countcommandebydate)
commanderouter.put('/annulation', changeStatusOrCancel);



export default commanderouter;