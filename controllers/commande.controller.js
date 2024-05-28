import { de } from "naughty-words";
import Commande from "../models/commande.model.js";


export const addCommande = async (req, res) => {
    try {
        const newCommande = new Commande(req.body);
        await newCommande.save();
        res.status(201).json(newCommande);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default Commande;