import { Router } from "express";
import { addchauffeur, getchauffeurs ,affecterchaffeurpourdesCommnde} from "../controllers/chauffeur.controller.js";

    const chauffeurrouter = Router();

chauffeurrouter.post('/addchauffeur', addchauffeur);
chauffeurrouter.get('/getchauffeurs', getchauffeurs);
chauffeurrouter.put('/:id', affecterchaffeurpourdesCommnde);

export default chauffeurrouter;