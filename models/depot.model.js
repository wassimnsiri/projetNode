import mongoose from "mongoose";
const { Schema, model } = mongoose;
const depotSchema = new mongoose.Schema({
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

const depot = mongoose.model('depot', depotSchema);

export default depot;
