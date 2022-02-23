const express = require("express");
const app = express();
app.use(express.json());

const connect = require("./configs/db");
const categoryController = require("./controllers/category.controller");
const productController = require("./controllers/product.controller");

app.use("/categories", categoryController);
app.use("/products", productController);

app.listen(7896, async (req, res) => {
  try {
    await connect();
    console.log("Listening to PORT 7896 steve_madden project");
  } catch (e) {
    console.log(e.message);
  }
});
