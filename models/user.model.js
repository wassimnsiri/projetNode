import mongoose from "mongoose";
const { Schema, model } = mongoose; // Utiliser Schema et model du module mongoose


const userSchema = new mongoose.Schema(
    {
      firstName : { type: String},
      lastName : { type: String},
      email : { type: String, required: true, unique: true},
      username : { type: String, required: true, unique: true},
      password : { type: String, required: true},
    
      role : { type: String, default: "user"},
      birthDate : { type: Date},
      bio : { type: String},
    
    
      profilePicture : { type: String , default: "https://louisville.edu/enrollmentmanagement/images/person-icon/image"},

      
      isBanend : { type: Boolean, default: false},
     
     
      isVerified : { type: Boolean, default: false},
      resetVerificationToken : { type: String},
      verificationToken: { type: String, index: true, unique: true, sparse: true },
  
    }
    ); 


const User = model("User", userSchema);
export default User;
