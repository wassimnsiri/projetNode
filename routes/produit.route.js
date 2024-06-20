import { Router } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import {modifierproduit,deleteproduit, addproduit, getproduits } from "../controllers/produit.controller.js";
import produit from "../models/produit.model.js";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET);

const produitrouter = Router();
produitrouter.post('/addproduit', addproduit);
produitrouter.get('/getproduits', getproduits);
produitrouter.delete('/delete/:id',deleteproduit)
produitrouter.put('/modifier/:id',modifierproduit)
produitrouter.post('/stripe', async (req, res) => {
    const { paymentToken, userId, price } = req.body;

    // Validate input
    if (!paymentToken || !userId || !price) {
        return res.status(400).send({ error: 'Missing required fields' });
    }

    try {
        // Create a PaymentIntent with the provided payment token and amount
        const paymentIntent = await stripe.paymentIntents.create({
            amount: price, // price should be in the smallest currency unit (e.g., cents for USD)
            currency: 'usd',
            payment_method: paymentToken,
           
            confirm: true,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never',
            },
        });

        // If the payment requires additional actions (e.g., 3D Secure), handle them
        if (paymentIntent.status === 'requires_action' || paymentIntent.status === 'requires_source_action') {
            res.send({
                requiresAction: true,
                clientSecret: paymentIntent.client_secret,
            });
        } else if (paymentIntent.status === 'succeeded') {
            // Payment was successful
            res.send({ success: true });
        } else {
            // Unexpected status
            res.status(500).send({ error: 'Unexpected payment status' });
        }
    } catch (error) {
        // Handle errors from Stripe
        if (error.type === 'StripeCardError') {
            // Display a very specific error message for card errors
            res.status(400).send({ error: error.message });
        } else {
            // Generic catch-all error handling
            res.status(500).send({ error: error.message });
        }
    }
});

export default produitrouter;
