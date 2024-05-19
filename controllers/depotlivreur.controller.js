import depot from '../models/depotlivreur.model.js';

export const adddepotlivreur = async (req, res) => {
    try {
        const depotLivreur = new depot(req.body);
        await depotLivreur.save();
        res.status(201).json(depotLivreur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};