const mongoose = require("mongoose");

const categorieSchema = new mongoose.Schema({
  nomCategorie: { type: String, required: true, trim: true },
  descriptionCategorie: { type: String, required: true, trim: true },
  typeCategorie: { type: String, required: true, trim: true },
  imageCategorie: { type: String, required: true, trim: true },
});

module.exports = mongoose.model("Categorie", categorieSchema);
