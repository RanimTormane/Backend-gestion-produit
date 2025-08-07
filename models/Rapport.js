const mongoose = require("mongoose");

const rapportSchema = new mongoose.Schema({
  typeRapport: { type: String, required: true, trim: true },
  dateGeneration: {
    type: Date,
    required: true,
    default: Date.now,
  },
  periode: {
    type: Number,
    required: true,
    min: 1, // période en jours, semaines, mois...
  },
  contenuPDF: {
    type: String,
    required: true,
    trim: true, // chemin ou URL du fichier PDF
  },
});

module.exports = mongoose.model("Rapport", rapportSchema);
