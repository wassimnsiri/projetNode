import { Router } from "express";
import stripePackage from 'stripe';
import { addproduit ,getproduits} from "../controllers/produit.controller.js";
import produit from "../models/produit.model.js";


const stripe = (process.env.STRIPE_SECRET);


const produitrouter = Router();
produitrouter.post('/addproduit', addproduit);
produitrouter.get('/getproduits', getproduits);
produitrouter.post('/stripe', async (req, res) => {
    try {
        const { amount, id } = req.body;
        const payment = await stripe.paymentIntents.create({
            prix: produit.prix * produit.quantite,
            currency: "USD",
            description: "Esbpfe",
            payment_method: id,
            confirm: true
        });
        console.log("Payment", payment);
        res.json({
            message: "Payment successful",
            success: true,
            id: payment.id // Move this line inside the try block
        });
    } catch (error) {
        console.log("Error", error);
        res.json({
            message: "Payment failed",
            success: false
        });
    }
});


export default produitrouter;