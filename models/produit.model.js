import mongoose from "mongoose";
const { Schema, model } = mongoose; // Utiliser Schema et model du module mongoose


const produitSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Carburants', 'Lubrifiants', 'Emballage']
    },
}  ); 


const produit = model("produit", produitSchema);
export default produit;