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
    quantite:{

        type: Number,
    },
    prix: {
        type: Number,
    },
   
    quantitedispo: {
        type: Number,
    },
    image : { type: String , default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEVXDwzX6U-QdKhH5zxH8ki-fLadEfLkJSSsKQk8kRpg&s"},
}  ); 


const produit = model("produit", produitSchema);
export default produit;