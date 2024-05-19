import chauffeur from "../models/chauffeur.model.js";



export const addchauffeur = async (req, res) => {
    try {
        const { nom, prenom, telephone, depot } = req.body;
        const newchauffeur = new chauffeur({ nom, prenom, telephone, depot });
        await newchauffeur.save();
        res.status(201).json(newchauffeur);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
    
};
export const getchauffeurs = async (req, res) => {  
    try {
        const chauffeurs = await chauffeur.find().populate('depot');
        res.status(200).json(chauffeurs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};