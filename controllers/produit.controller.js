import produit from "../models/produit.model.js";


export const addproduit = async (req, res) => {
    try {
        const { name, category } = req.body;
        const newproduit = new produit({
            name,
            category
        });
        await newproduit.save();
        res.status(200).json({ message: 'produit added successfully', produit: newproduit });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};