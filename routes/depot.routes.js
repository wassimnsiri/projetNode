    import { Router } from "express";

    import { adddepot ,getDepots    } from "../controllers/depot.controller.js";
import { de } from "naughty-words";

    const depotrouter = Router();
    depotrouter.post('/adddepot', adddepot);


    depotrouter.get('/getdepots', getDepots);



    export default depotrouter;