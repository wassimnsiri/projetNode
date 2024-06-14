import mongoose from "mongoose";
const { Schema, model } = mongoose;

const commandeSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'produit',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        commandeprice: { // Correction du nom du champ
            type: Number,
            required: true
        },
        orderDate: {
            type: Date,
            default: Date.now
        },
        status: {
            type: String,
            enum: ['pending', 'shipped', 'delivered', 'cancelled'],
            default: 'pending'
        },
        reason: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
);

const Commande = model("Commande", commandeSchema);
export default Commande;
