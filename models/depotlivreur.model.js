import mongoose from "mongoose";
const { Schema, model } = mongoose;
const depotLivreurSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    adresse: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        required: true
    },
    // Ajoutez d'autres champs selon vos besoins

});

const DepotLivreur = mongoose.model('DepotLivreur', depotLivreurSchema);

export default DepotLivreur;
