import mongoose from "mongoose";
const { Schema, model } = mongoose;

const notificationSchema = new Schema({
    // Define your schema fields here
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Notification = model('Notification', notificationSchema);

export default Notification;
