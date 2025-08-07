const Commande = require("../models/Commande");

const getCommande = async (req, res) => {
  try {
    const commandes = await Commande.find();
    res.json(commandes);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const createCommande = async (req, res) => {
  const {
    numeroCommande,
    dateCommande,
    statutCommande,
    totalCommande,
    taxesAppliquees,
    adresseLivraison,
    modePaiement,
    datePaiement,
  } = req.body;

  try {
    const commande = new Commande({
      numeroCommande,
      dateCommande,
      statutCommande,
      totalCommande,
      taxesAppliquees,
      adresseLivraison,
      modePaiement,
      datePaiement,
    });
    await commande.save();

    res.status(201).json({ commande: commande });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la création", error: error.message });
  }
};

const updateCommande = async (req, res) => {
  const { id } = req.params;
  const {
    numeroCommande,
    dateCommande,
    statutCommande,
    totalCommande,
    taxesAppliquees,
    adresseLivraison,
    modePaiement,
    datePaiement,
  } = req.body;
  try {
    const commande = await Commande.findByIdAndUpdate(
      id,
      {
        numeroCommande,
        dateCommande,
        statutCommande,
        totalCommande,
        taxesAppliquees,
        adresseLivraison,
        modePaiement,
        datePaiement,
      },
      { new: true }
    );
    if (!commande) {
      return res.status(404).json({ message: "Commande non trouvé" });
    }
    res.json({ message: "Commande modifié avec succès", commande });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la mise à jour", error: error.message });
  }
};

const deleteCommande = async (req, res) => {
  const { id } = req.params;

  try {
    const commande = await Commande.findByIdAndDelete(id);

    if (!commande) {
      return res.status(404).json({ message: "Commande non trouvé" });
    }

    res.json({ message: "Commande supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

module.exports = {
  getCommande,
  createCommande,
  updateCommande,
  deleteCommande,
};
