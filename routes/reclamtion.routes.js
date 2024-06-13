import { Router } from "express";
import {editreclamation, supprimerreclamation , addreclamation , consultermesreclamation,getallreclamation,changestatus} from "../controllers/reclamation.controller.js";
const reclamationrouter = Router();

reclamationrouter.post('/addreclamation', addreclamation);
reclamationrouter.get('/consultermesreclamation/:userId', consultermesreclamation);
reclamationrouter.get('/getall',getallreclamation)
reclamationrouter.post('/changestatus', changestatus);
reclamationrouter.delete('/supprimerreclamation/:reclamationId', supprimerreclamation);
reclamationrouter.put('/edit/:reclamationId',editreclamation)
export default reclamationrouter;