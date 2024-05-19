import { Router } from "express";

import { adddepotlivreur } from "../controllers/depotlivreur.controller.js";

const depotlivreurrouter = Router();
depotlivreurrouter.post('/adddepotlivreur', adddepotlivreur);






export default depotlivreurrouter;