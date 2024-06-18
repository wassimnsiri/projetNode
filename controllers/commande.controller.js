import { de } from "naughty-words";
import Commande from "../models/commande.model.js";
import User from "../models/user.model.js"; 
import Product from "../models/produit.model.js";
import sendEmail from '../utils/mailer.js';
import { io } from "../server.js";
import Notification from "../models/notification.model.js";
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
      const { userId, produits, commandeprice } = req.body; // Receives userId and a list of product objects with quantities
      const commandes = [];
  
      // Loop through each product in the list
      for (const produit of produits) {
        const { productId, quantity } = produit;
  
        // Validate quantity
        if (typeof quantity !== 'number' || isNaN(quantity) || quantity <= 0) {
          return res.status(400).json({ message: `Invalid quantity for product ${productId}` });
        }
  
        // Find the product in the database
        const existingProduit = await Product.findById(productId);
  
        // Check if the product exists and has enough quantity
        if (!existingProduit) {
          return res.status(404).json({ message: `Product with ID ${productId} not found` });
        }
  
        if (existingProduit.quantite < quantity) {
          return res.status(400).json({ message: `Not enough stock for product ${existingProduit.name}` });
        }
  
        // Deduct the quantity from the available stock
        existingProduit.quantite -= quantity;
        await existingProduit.save();
  
        // Create a new order
        const newCommande = new Commande({
          userId,
          commandeprice,
          productId,
          quantity,
        });
        await newCommande.save();
        commandes.push(newCommande);
      }
  
      // Fetch user for notification
      const user = await User.findById(userId);
      if (user) {
        const notification = {
          message: `Dear Agil,  order has been passed by ${user.username}.`,
          commandes,
        };
  
        // Save notification to the database
        const newNotification = new Notification({
          userId: user._id,
          message: notification.message,
        });
        await newNotification.save();
  
        // Emit notification via socket.io
        io.emit("orderPlaced", notification);
      }
  
      res.status(201).json(commandes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
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

        // Récupérer les informations des produits
        const productIds = commandes.map(commande => commande.productId);
        const products = await Product.find({ _id: { $in: productIds } });

        // Créer des dictionnaires pour un accès rapide aux informations des utilisateurs et des produits
        const userDict = users.reduce((acc, user) => {
            acc[user._id] = user;
            return acc;
        }, {});

        const productDict = products.reduce((acc, product) => {
            acc[product._id] = product;
            return acc;
        }, {});

        // Ajouter les informations des utilisateurs et des produits aux groupes de commandes
        const result = userIds.map(userId => ({
            user: userDict[userId],
            commandes: commandesGroupedByUser[userId].map(commande => ({
                ...commande._doc,
                product: productDict[commande.productId]
            }))
        }));

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const changestaus = async (req, res) => {
    try {
        const { commandeId, newStatus } = req.body;
        const commande = await Commande.findByIdAndUpdate
            (commandeId, { status: newStatus }, { new: true });
        res.status(200).json(commande);
    }catch (error){
    res.status(500).json({ message: error.message });
}
}
export const getcommandebyuserId = async (req, res) => {
    try {
        const commandes = await Commande.find({ userId: req.params.userId });
        res.status(200).json(commandes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const totalprice = async (req, res) => {
    try {
        
        const commandes = await Commande.find();
        const totalprice = commandes.reduce((acc, commande) => acc + commande.commandeprice, 0);
        res.status(200).json({ totalprice });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const revenuebydate = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;
        const commandes = await Commande.find({
            createdAt: {
                $gte: new Date(startDate),
                $lt: new Date(endDate)
            }
        });
        const totalprice = commandes.reduce((acc, commande) => acc + commande.commandeprice, 0);
        res.status(200).json({ totalprice });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}   
export const revenuedechagejour = async (req, res) => {
    try {
        // Aggregate commandes to group by date and sum the prices
        const commandes = await Commande.aggregate([
            {
                // Project to extract date only (without time) from the createdAt field or a date field you have
                $project: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    commandeprice: 1
                }
            },
            {
                // Group by the date and sum the prices
                $group: {
                    _id: "$date",
                    totalprice: { $sum: "$commandeprice" }
                }
            },
            {
                // Sort by date in ascending order (optional)
                $sort: { _id: 1 }
            }
        ]);

        res.status(200).json(commandes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const countcommandebydate = async (req, res) => {
    try {
        const commandes = await Commande.aggregate([
            {
                $project: {
                    date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
                }
            },
            {
                $group: {
                    _id: "$date",
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 } // Optional: to sort the results by date
            }
        ]);

        res.status(200).json(commandes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const changeStatusOrCancel = async (req, res) => {
    try {
        const { commandeId, newStatus, reason } = req.body;
        
        let updateData = { status: newStatus };
        
        // If the status is 'cancelled', include the reason
        if (newStatus === 'cancelled') {
            updateData.reason = reason;
        }
        
        const commande = await Commande.findByIdAndUpdate(
            commandeId, 
            updateData, 
            { new: true }
        ).populate('userId'); // Populate to get user details
        
        if (!commande) {
            return res.status(404).json({ message: 'Commande not found' });
        }

        // If the status is 'cancelled', send email notification
        if (newStatus === 'cancelled') {
            const user = commande.userId; // Assuming userId field contains user document
            const emailSubject = `Commande Annulée: ${commandeId}`;
            const emailHtml = `
                <p>Votre commande avec l'ID ${commandeId} a été annulée.</p>
                <p>Raison de l'annulation: ${reason}</p>
            `;

            await sendEmail(user.email, emailSubject, emailHtml); // Use the user's email
        }

        res.status(200).json(commande);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};




export default Commande;