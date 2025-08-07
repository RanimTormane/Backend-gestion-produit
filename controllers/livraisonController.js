const Livraison = require("../models/Livraison");

const getLivraison = async (req, res) => {
  try {
    const livraisons = await Livraison.find();
    res.json(livraisons);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const createLivraison = async (req, res) => {
  const {
    dateExpedition,
    dateLivraisonPrevue,
    dateLivraisonEffective,
    statutLivraison,

    notesLivreur,
    signatureClient,
  } = req.body;

  try {
    const livraison = new Livraison({
      dateExpedition,
      dateLivraisonPrevue,
      dateLivraisonEffective,
      statutLivraison,

      notesLivreur,
      signatureClient,
    });
    await livraison.save();

    res.status(201).json({ livraison: livraison });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la création", error: error.message });
  }
};

const updateLivraison = async (req, res) => {
  const { id } = req.params;
  const {
    dateExpedition,
    dateLivraisonPrevue,
    dateLivraisonEffective,
    statutLivraison,

    notesLivreur,
    signatureClient,
  } = req.body;
  try {
    const livraison = await Livraison.findByIdAndUpdate(
      id,
      {
        dateExpedition,
        dateLivraisonPrevue,
        dateLivraisonEffective,
        statutLivraison,
        notesLivreur,
        signatureClient,
      },
      { new: true }
    );
    if (!livraison) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    res.json({ message: "Produit modifié avec succès", livraison });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la mise à jour", error: error.message });
  }
};

const deleteLivraison = async (req, res) => {
  const { id } = req.params;

  try {
    const livraison = await Livraison.findByIdAndDelete(id);

    if (!livraison) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

module.exports = {
  getLivraison,
  createLivraison,
  updateLivraison,
  deleteLivraison,
};
