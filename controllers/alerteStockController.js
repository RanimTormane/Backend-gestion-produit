const AlerteStock = require("../models/AlerteStock");
const Produit = require("../models/Produit");
const getAlerteStock = async (req, res) => {
  try {
    const alerteStock = await AlerteStock.find();
    res.json(alerteStock);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const createAlerteStock = async (req, res) => {
  const { idProduit, seuilMinimum, dateAlerte, statutAlerte } = req.body;

  try {
    // Vérifie si le produit existe
    const produitExiste = await Produit.findById(idProduit);
    if (!produitExiste) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    // Créer et enregistrer l'alerte
    const alerteStock = new AlerteStock({
      idProduit,
      seuilMinimum,
      dateAlerte,
      statutAlerte,
    });

    await alerteStock.save();

    res.status(201).json({ alerteStock });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la création", error: error.message });
  }
};

const updateAlerteStock = async (req, res) => {
  const { id } = req.params;
  const { idProduit, seuilMinimum, dateAlerte, statutAlerte } = req.body;
  try {
    const alerteStock = await AlerteStock.findByIdAndUpdate(
      id,
      {
        idProduit,
        seuilMinimum,
        dateAlerte,
        statutAlerte,
      },
      { new: true }
    );
    if (!alerteStock) {
      return res.status(404).json({ message: "AlerteStock  non trouvé" });
    }
    res.json({ message: "AlerteStock  modifié avec succès", alerteStock });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la mise à jour", error: error.message });
  }
};

const deleteAlerteStock = async (req, res) => {
  const { id } = req.params;

  try {
    const alerteStock = await AlerteStock.findByIdAndDelete(id);

    if (!alerteStock) {
      return res.status(404).json({ message: "AlerteStock  non trouvé" });
    }

    res.json({ message: "AlerteStock  supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

module.exports = {
  getAlerteStock,
  createAlerteStock,
  updateAlerteStock,
  deleteAlerteStock,
};
