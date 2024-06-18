
import reclamation from "../models/reclamation.model.js";

export const addreclamation = async (req, res) => {
    try {
        const { userId, message, username, title, reason } = req.body;
        const newReclamation = new reclamation({ userId, message, title, reason, username });
        await newReclamation.save();
        res.status(201).json(newReclamation);
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


export const getallreclamation = async (req, res) => {
    try {
        const reclamations = await reclamation.find();
        res.status(200).json(reclamations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
    export const changestatus = async (req , res )=> {
        try{
            const {reclamationId, newStatus} = req.body;
            await reclamation.findByIdAndUpdate
            (reclamationId, {status: newStatus});
            res.status(200).json({message: "Status updated successfully"});
        }catch(error){
            res.status(500).json({message: error.message})
        }
    }
export const supprimerreclamation = async (req, res) => { 
try{
    const reclamationId = req.params.reclamationId;
    await reclamation.findByIdAndDelete(reclamationId);
    res.status(200).json({message: "Reclamation deleted successfully"});

}catch(error){
    res.status(500).json({message: error.message});

}
}
export const editreclamation = async (req,res) =>{
    try{
        const reclamationId = req.params.reclamationId;
        const message = req.body.message;   


        await reclamation.findByIdAndUpdate(reclamationId,{message:message})
        reclamation.save
        res.status(200).json({message: "Reclamation edit successfully"});
    }catch(error){
        res.status(500).json({message: error.message});
    }
}
