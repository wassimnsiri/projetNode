import mongoose from "mongoose";
const { Schema, model } = mongoose; // Utiliser Schema et model du module mongoose

const commandeSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user', // Assurez-vous d'avoir un modèle 'User' défini ailleurs dans votre projet
            required: true
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'produit', // Assurez-vous d'avoir un modèle 'Product' défini ailleurs dans votre projet
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            
        },
        orderDate: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ['pending', 'shipped', 'delivered', 'cancelled'],
            default: 'pending'
        }
    },
    {
        timestamps: true // Ajoute createdAt et updatedAt automatiquement
    }
);

const Commande = model("Commande", commandeSchema);
export default Commande;
