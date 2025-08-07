const mongoose = require("mongoose");

const ligneCommandeSchema = new mongoose.Schema({
  quantite: { type: String, required: true, trim: true },
  prixUnitaire: { type: Number, required: true },
});

module.exports = mongoose.model("LigneCommande", ligneCommandeSchema);
