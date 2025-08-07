const LigneCommande = require("../models/LigneCommande");

const getLigneCommande = async (req, res) => {
  try {
    const ligneCommandes = await LigneCommande.find();
    res.json(ligneCommandes);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const createLigneCommande = async (req, res) => {
  const { quantite, prixUnitaire } = req.body;

  try {
    const ligneCommande = new LigneCommande({
      quantite,
      prixUnitaire,
    });
    await ligneCommande.save();

    res.status(201).json({ ligneCommande: ligneCommande });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la création", error: error.message });
  }
};

const updateLigneCommande = async (req, res) => {
  const { id } = req.params;
  const { quantite, prixUnitaire } = req.body;
  try {
    const ligneCommande = await LigneCommande.findByIdAndUpdate(
      id,
      {
        quantite,
        prixUnitaire,
      },
      { new: true }
    );
    if (!ligneCommande) {
      return res.status(404).json({ message: "ligneCommande non trouvé" });
    }
    res.json({ message: "ligneCommande modifié avec succès", ligneCommande });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la mise à jour", error: error.message });
  }
};

const deleteLigneCommande = async (req, res) => {
  const { id } = req.params;

  try {
    const ligneCommande = await LigneCommande.findByIdAndDelete(id);

    if (!ligneCommande) {
      return res.status(404).json({ message: "ligneCommande non trouvé" });
    }

    res.json({ message: "ligneCommande supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

module.exports = {
  getLigneCommande,
  createLigneCommande,
  updateLigneCommande,
  deleteLigneCommande,
};
