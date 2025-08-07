const mongoose = require("mongoose");

const alerteStockSchema = new mongoose.Schema({
  idProduit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Produit", // Assure-toi que le modèle 'Produit' existe
    required: true,
  },
  seuilMinimum: {
    type: Number,
    required: true,
    min: 0,
  },
  dateAlerte: {
    type: Date,
    required: true,
    default: Date.now,
  },
  statutAlerte: {
    type: String,
    required: true,
    enum: ["active", "résolue"],
    default: "active",
    trim: true,
  },
});

module.exports = mongoose.model("AlerteStock", alerteStockSchema);
