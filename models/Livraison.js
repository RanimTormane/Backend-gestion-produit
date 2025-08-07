const mongoose = require("mongoose");

const livraisonSchema = new mongoose.Schema({
  dateExpedition: { type: Date, required: true },
  dateLivraisonPrevue: { type: Date, required: true },
  dateLivraisonEffective: { type: Date, required: true },
  statutLivraison: {
    type: String,
    enum: ["en transit", "livrée", "en attente"],
    default: "en transit",
    required: true,
  },
  notesLivreur: { type: String, trim: true },
  signatureClient: { type: String, required: true, trim: true },
});

module.exports = mongoose.model("Livraison", livraisonSchema);
