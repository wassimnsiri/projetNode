import ChauffeurModel from "../models/chauffeur.model.js";

export const addchauffeur = async (req, res) => {
    try {
        const { nom, prenom, telephone, depot } = req.body;
        const newchauffeur = new ChauffeurModel({ nom, prenom, telephone, depot });
        await newchauffeur.save();
        res.status(201).json(newchauffeur);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const getchauffeurs = async (req, res) => {  
    try {
        const chauffeurs = await ChauffeurModel.find().populate('depot').populate('commande');
        ;
        res.status(200).json(chauffeurs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const affecterchaffeurpourdesCommnde = async (req, res) => {
    try {
        const { id } = req.params;
        const { commande } = req.body;
        const chauffeur = await ChauffeurModel.findById(id);
        if (!chauffeur) {
            return res.status(404).json({ message: 'Chauffeur not found' });
        }
        chauffeur.commande = commande;
        await chauffeur.save();
        res.status(200).json(chauffeur);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
