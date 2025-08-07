const Rapport = require("../models/Rapport");

const getRapport = async (req, res) => {
  try {
    const rapports = await Rapport.find();
    res.json(rapports);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const createRapport = async (req, res) => {
  const { typeRapport, dateGeneration, periode, contenuPDF } = req.body;

  try {
    const rapport = new Rapport({
      typeRapport,
      dateGeneration,
      periode,
      contenuPDF,
    });
    await rapport.save();

    res.status(201).json({ rapport: rapport });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la création", error: error.message });
  }
};

const updateRapport = async (req, res) => {
  const { id } = req.params;
  const { typeRapport, dateGeneration, periode, contenuPDF } = req.body;
  try {
    const rapport = await Rapport.findByIdAndUpdate(
      id,
      {
        typeRapport,
        dateGeneration,
        periode,
        contenuPDF,
      },
      { new: true }
    );
    if (!rapport) {
      return res.status(404).json({ message: "Rapport non trouvé" });
    }
    res.json({ message: "Rapport modifié avec succès", rapport });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la mise à jour", error: error.message });
  }
};

const deleteRapport = async (req, res) => {
  const { id } = req.params;

  try {
    const rapport = await Rapport.findByIdAndDelete(id);

    if (!rapport) {
      return res.status(404).json({ message: "Rapport non trouvé" });
    }

    res.json({ message: "Rapport supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

module.exports = {
  getRapport,
  createRapport,
  updateRapport,
  deleteRapport,
};
