import mongoose from "mongoose";
const { Schema, model } = mongoose;

const
 reclamationSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'user',
            required: true
        },
      message:{
        type: String,
        required: true
      },
      status:{
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
