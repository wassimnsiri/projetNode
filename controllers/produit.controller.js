import produit from "../models/produit.model.js";


export const addproduit = async (req, res) => {
    try {
      const { name, category, quantite, prix } = req.body;
      const newproduit = new produit({
        name,
        category,
        quantite,
        prix,
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
export const modifierproduit = async (req,res)=>{
    try {
        const {id} = req.params;
        const {name,category,quantite,prix} = req.body;
        const updatedproduit = await produit.findByIdAndUpdate(id, {name,category,quantite,prix}, {new: true});
        res.status(200).json({ message: 'produit updated successfully', produit: updatedproduit });

} catch (error) {
    res.status(500).json({ message: error.message });
}
};
export const deleteproduit = async(req,res)=>{
    try {
        const {id} = req.params;
        await produit.findByIdAndDelete(id);
        res.status(200).json({ message: 'produit deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

