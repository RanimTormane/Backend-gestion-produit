const Categorie = require("../models/Categorie");

const getCategorie = async (req, res) => {
  try {
    const categories = await Categorie.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const createCategorie = async (req, res) => {
  const { nomCategorie, descriptionCategorie, typeCategorie, imageCategorie } =
    req.body;

  try {
    const categorie = new Categorie({
      nomCategorie,
      descriptionCategorie,
      typeCategorie,
      imageCategorie,
    });
    await categorie.save();

    res.status(201).json({ categorie: categorie });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la création", error: error.message });
  }
};

const updateCategorie = async (req, res) => {
  const { id } = req.params;
  const { nomCategorie, descriptionCategorie, typeCategorie, imageCategorie } =
    req.body;
  try {
    const categorie = await Categorie.findByIdAndUpdate(
      id,
      {
        nomCategorie,
        descriptionCategorie,
        typeCategorie,
        imageCategorie,
      },
      { new: true }
    );
    if (!categorie) {
      return res.status(404).json({ message: "Categorie non trouvé" });
    }
    res.json({ message: "Categorie modifié avec succès", categorie });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la mise à jour", error: error.message });
  }
};

const deleteCategorie = async (req, res) => {
  const { id } = req.params;

  try {
    const categorie = await Categorie.findByIdAndDelete(id);

    if (!categorie) {
      return res.status(404).json({ message: "Categorie non trouvé" });
    }

    res.json({ message: "Categorie supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

module.exports = {
  getCategorie,
  createCategorie,
  updateCategorie,
  deleteCategorie,
};
