const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const categorieRoutes = require("./routes/categorieRoutes");
const commandeRoutes = require("./routes/commandeRoutes");
const ligneCommandeRoutes = require("./routes/LigneCommandeRoutes");
const alerteStockRoutes = require("./routes/alerteStockRoutes");
const livraisonRoutes = require("./routes/livraisonRoutes");

const rapportRoutes = require("./routes/rapportRoutes");
const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => res.send("Backend opérationnel"));
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categorieRoutes);
app.use("/api/commandes", commandeRoutes);
app.use("/api/ligneCommandes", ligneCommandeRoutes);
app.use("/api/rapports", rapportRoutes);
app.use("/api/alerteStock", alerteStockRoutes);
app.use("/api/livraisons", livraisonRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${process.env.PORT}`);
});
