const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 7896;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const connect = require("./configs/db");
const categoryController = require("./controllers/category.controller");
const productController = require("./controllers/product.controller");

app.use("/categories", categoryController);
app.use("/products", productController);

app.listen(port, async (req, res) => {
  try {
    await connect();
    console.log(`Listening to PORT ${port} steve_madden project`);
    // return res
    //   .status(200)
    //   .send(`Listening to PORT ${port} steve_madden project`);
  } catch (e) {
    console.log(e.message);
  }
});
