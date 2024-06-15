import mongoose from "mongoose";
const { Schema, model } = mongoose;

const notificationSchema = new Schema({
    // Define your schema fields here
    title: { type: String, required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Notification = model('Notification', notificationSchema);

export default Notification;
