import { Router } from "express";
import { addchauffeur, getchauffeurs } from "../controllers/chauffeur.controller.js";

const chauffeurrouter = Router();

chauffeurrouter.post('/addchauffeur', addchauffeur);
chauffeurrouter.get('/getchauffeurs', getchauffeurs);

export default chauffeurrouter;