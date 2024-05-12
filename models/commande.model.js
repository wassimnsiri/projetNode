import mongoose from "mongoose";
const { Schema, model } = mongoose; // Utiliser Schema et model du module mongoose


const commandeSchema = new mongoose.Schema(


        ); 


const commande = model("commande", commandeSchema);
export default commande;