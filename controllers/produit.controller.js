import produit from "../models/produit.model.js";


export const addproduit = async (req, res) => {
    try {
        const { name, category,quantite,prix } = req.body;
        const newproduit = new produit({
            name,
            category,
            quantite,
            prix,
            quantitedispo: quantite,
        });
        await newproduit.save();
        res.status(200).json({ message: 'produit added successfully', produit: newproduit });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getproduits = async (req, res) => {
    try {
        const produits = await produit.find({});
        res.status(200).json({ produits });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};