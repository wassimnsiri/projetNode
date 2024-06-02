import { de } from "naughty-words";
import Commande from "../models/commande.model.js";
import User from "../models/user.model.js"; 


export const addCommande = async (req, res) => {
    try {
        const newCommande = new Commande(req.body);
        await newCommande.save();
        res.status(201).json(newCommande);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const passecommande = async (req, res) => {
    try {
        const { userId, produits,commandeprice } = req.body; // Reçoit l'userId et une liste d'objets de produits avec quantités
        const commandes = [];

        // Crée une commande pour chaque produit dans la liste
        for (const produit of produits) {
            const newCommande = new Commande({
                userId,
                commandeprice,
                productId: produit.productId,
                quantity: produit.quantity,
                // Supposons que chaque produit a un prix
            });
            await newCommande.save();
            commandes.push(newCommande);
        }

        res.status(201).json(commandes);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const getallcommandeandmakethesamecommandeforsameusertogather = async (req, res) => {
    try {
        const commandes = await Commande.find();

        // Grouper les commandes par userId
        const commandesGroupedByUser = commandes.reduce((acc, commande) => {
            if (!acc[commande.userId]) {
                acc[commande.userId] = [];
            }
            acc[commande.userId].push(commande);
            return acc;
        }, {});

        // Récupérer les informations des utilisateurs
        const userIds = Object.keys(commandesGroupedByUser);
        const users = await User.find({ _id: { $in: userIds } });

        // Créer un dictionnaire pour un accès rapide aux informations des utilisateurs
        const userDict = users.reduce((acc, user) => {
            acc[user._id] = user;
            return acc;
        }, {});

        // Ajouter les informations des utilisateurs aux groupes de commandes
        const result = userIds.map(userId => ({
            user: userDict[userId],
            commandes: commandesGroupedByUser[userId]
        }));

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export default Commande;