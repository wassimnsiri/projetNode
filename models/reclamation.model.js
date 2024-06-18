  import mongoose from "mongoose";
  const { Schema, model } = mongoose;
  import user from './user.model.js';

  const reclamationSchema = new Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'user', // Ensure 'user' matches the actual model name
        required: true
    },
    username: {
      type:String,// Ensure 'user' matches the actual model name
      required: true
  },
        message: {
            type: String,
            required: true
        },
        title:{
          type: String,
          required: true
        },
        reason:{
          type: String,
          required: true
        },
        status: {
            type: String,
            enum: ['pending', 'treated'],
            default: 'pending'
        }
    },
    {
        timestamps: true
    }
  );

  const reclamation = model("reclamation", reclamationSchema);
  export default reclamation;
