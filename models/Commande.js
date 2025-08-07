const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema({
  numeroCommande: { type: String, required: true, trim: true }, // unique peut être ajouté si besoin
  dateCommande: { type: Date, required: true, default: Date.now },
  statutCommande: {
    type: String,
    required: true,
    enum: [
      "en attente",
      "confirmée",
      "en préparation",
      "expédiée",
      "livrée",
      "annulée",
    ],
    trim: true,
  },
  totalCommande: { type: Number, required: true },
  taxesAppliquees: { type: Number, required: true },
  adresseLivraison: { type: String, required: true, trim: true },
  modePaiement: { type: String, required: true, trim: true },
  datePaiement: { type: Date, required: true },
});

module.exports = mongoose.model("Commande", commandeSchema);
