const Product = require("../models/Produit");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

const createProduct = async (req, res) => {
  const {
    nom,
    description,
    prix,
    quantiteStock,
    typeProduit,
    imageURL,
    dateAjout,
    statutProduit,
  } = req.body;

  try {
    const product = new Product({
      nom,
      description,
      prix,
      quantiteStock,
      typeProduit,
      imageURL,
      dateAjout,
      statutProduit,
    });
    await product.save();

    res.status(201).json({ product: product });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la création", error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    nom,
    description,
    prix,
    quantiteStock,
    typeProduit,
    imageURL,
    dateAjout,
    statutProduit,
  } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      {
        nom,
        description,
        prix,
        quantiteStock,
        typeProduit,
        imageURL,
        dateAjout,
        statutProduit,
      },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    res.json({ message: "Produit modifié avec succès", product });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erreur lors de la mise à jour", error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

module.exports = { getProducts, createProduct, updateProduct, deleteProduct };
