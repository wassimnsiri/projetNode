import { Router } from "express";
import { addreclamation , consultermesreclamation,getallreclamation,changestatus} from "../controllers/reclamation.controller.js";
const reclamationrouter = Router();

reclamationrouter.post('/addreclamation', addreclamation);
reclamationrouter.get('/consultermesreclamation/:userId', consultermesreclamation);
reclamationrouter.get('/getall',getallreclamation)
reclamationrouter.post('/changestatus', changestatus);

export default reclamationrouter;