const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  nom: { type: String, required: true, trim: true },
  prenom: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  mdp: { type: String, required: true },
  adresse: { type: String, required: true, trim: true },
  statut: {
    type: String,
    enum: ["actif", "inactif", "bloqué"],
    default: "actif",
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "client", "fournisseur"],
    required: true,
  },

  createdAt: { type: Date, default: Date.now },
});
// Hash du mot de passe avant save
userSchema.pre("save", async function (next) {
  if (!this.isModified("mdp")) return next();
  this.mdp = await bcrypt.hash(this.mdp, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
