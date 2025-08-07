const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  nom: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  prix: { type: Number, required: true },
  quantiteStock: { type: String, required: true },
  typeProduit: { type: String, required: true, trim: true },
  imageURL: { type: String, required: true, trim: true },
  dateAjout: { type: Date, default: Date.now },

  statutProduit: {
    type: String,
    enum: ["disponible", "en rupture", "archivé"],
    default: "disponible",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
