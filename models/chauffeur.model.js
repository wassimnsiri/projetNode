import mongoose from "mongoose";

const { Schema, model } = mongoose; // Utiliser Schema et model du module mongoose


const chauffeurSchema = new mongoose.Schema(
  {  nom : {
        type: String,
    },
    prenom : {
        type: String,
    },
    telephone : {
        type: String,
    },
    depot : {
        type: Schema.Types.ObjectId,
        ref: "depot"
    },
    profilePicture : { type: String , default: "https://www.transportexpress.fr/storage/news/MVdUMjFdJ6w7AFm6Erzy3edE9YVOjH094kaf4yld.jpeg"},
    disponible : { type: Boolean, default: true},

}  ); 


const chauffeur = model("chauffeur", chauffeurSchema);
export default chauffeur;