const express = require("express");
const app = express();
const router = express.Router();
const Cart = require("../models/cartmodel");

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET",
    "PUT",
    "POST",
    "DELETE",
    "OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

router.post("", async (req, res) => {
  try {
    console.log(req.body);
    let cart = await Cart.create(req.body);
    console.log(cart);
    return res.status(205).send(cart);
  } catch (err) {
    return res.status(505).send(err.message);
  }
});

router.get("", async (req, res) => {
  try {
    const carts = await Cart.find().lean().exec();
    return res.status(206).send(carts);
  } catch (err) {
    return res.status(506).send(err.message);
  }
});

router.get("/:user", async (req, res) => {
  try {
    const cart = await Cart.find({ user_id: req.params.user }).lean().exec();
    return res.status(206).send(cart);
  } catch (err) {
    return res.status(506).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id).lean().exec();
    return res.status(206).send(cart);
  } catch (err) {
    return res.status(506).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    console.log("yes");
    const cart = await Cart.findByIdAndDelete(req.params.id);
    return res.status(200).send(cart);
  } catch (err) {
    return res.status(506).send(err.message);
  }
});

module.exports = router;
