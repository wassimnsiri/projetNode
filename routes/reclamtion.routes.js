import { Router } from "express";
import { addreclamation , consultermesreclamation} from "../controllers/reclamation.controller.js";
const reclamationrouter = Router();

reclamationrouter.post('/addreclamation', addreclamation);
reclamationrouter.get('/consultermesreclamation/:userId', consultermesreclamation);


export default reclamationrouter;