const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const createUser = async (req, res) => {
  const { nom, prenom, email, mdp, adresse, statut, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(mdp, 10);
    const user = new User({
      nom,
      prenom,
      email,
      mdp: hashedPassword,
      adresse,
      statut,
      role,
    });
    await user.save();
    const token = jwt.sign(
      { id: user._id, role: user.role, nom: user.nom },
      process.env.JWT_SECRET
    );
    res.status(201).json({ token, user: user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la création", error: error.message });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nom, prenom, email, mdp, adresse, statut, role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { nom, prenom, email, mdp, adresse, statut, role },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json({ message: "Utilisateur modifié avec succès", user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la mise à jour", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
const registerUser = async (req, res) => {
  const { nom, prenom, email, mdp, adresse, statut, role } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(mdp, 10);
    const user = new User({
      nom,
      prenom,
      email,
      mdp: hashedPassword,
      adresse,
      statut,
      role: "client",
    });
    await user.save();
    const token = jwt.sign(
      { id: user._id, role: user.role, nom: user.nom },
      process.env.JWT_SECRET
    );
    res.status(201).json({ token, user: user });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la création", error: error.message });
  }
};
module.exports = { getUsers, createUser, updateUser, deleteUser, registerUser };
