
import reclamation from "../models/reclamation.model.js";

export const addreclamation = async (req, res) => {
    try {
        const { userId, message } = req.body;
        const newreclamation = new reclamation({ userId, message });
        await newreclamation.save();
        res.status(201).json(newreclamation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const consultermesreclamation = async (req, res) => {
    try {
        // Assuming you have a field in your reclamation documents called "userId"
        const userId = req.params.userId; // Access userId from query parameters

        // Find reclamations associated with the authenticated user
        const reclamations = await reclamation.find({ userId });

        res.status(200).json({ reclamations });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

