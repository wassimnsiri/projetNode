import Depot from '../models/depot.model.js'; // Adjust the path as needed

export const adddepot = async (req, res) => {
    try {
        const newDepot = new Depot(req.body); // Creating a new instance of the Depot model
        await newDepot.save(); // Saving the new depot to the database
        res.status(201).json(newDepot);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getDepots = async (req, res) => { 
    try {
        const depots = await Depot.find(); // Fetching all depots from the database
        res.status(200).json(depots);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}