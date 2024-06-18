import { Router } from "express";
import { countcommandebydate,passecommande,totalprice, revenuedechagejour ,
    getallcommandeandmakethesamecommandeforsameusertogather,changestaus,
    changeStatusOrCancel,getcommandebyuserId} from "../controllers/commande.controller.js";
import Notification from "../models/notification.model.js";

const commanderouter = Router();

commanderouter.post('/addcommande', passecommande);
commanderouter.get('/getcommande', getallcommandeandmakethesamecommandeforsameusertogather);
commanderouter.post('/updatecommande', changestaus);
commanderouter.get('/getcommande/:userId', getcommandebyuserId);
commanderouter.get('/test',totalprice)
commanderouter.get('/revenue',revenuedechagejour)
commanderouter.get('/statC',countcommandebydate)
commanderouter.put('/annulation', changeStatusOrCancel);
commanderouter.get('/notifications', async (req, res) => {
    try {
     
      const notifications = await Notification.find().sort({ timestamp: -1 });
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });



export default commanderouter;