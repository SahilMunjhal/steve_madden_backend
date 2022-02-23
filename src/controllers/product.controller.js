const express = require("express");
const Product = require("../models/product.model");
const router = express.Router();

router.post("", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).send(product);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

//Find all

router.get("", async (req, res) => {
  try {
    let products = await Product.find()
      .populate({ path: "category", select: "name" })
      .lean()
      .exec();
    return res.status(201).send(products);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

//Men's
router.get("/mens", async (req, res) => {
  try {
    const products = await Product.find({ type: "men" })
      .populate({ path: "category", select: "name" })
      .lean()
      .exec();
    return res.status(201).send(products);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

//Women's
router.get("/womens", async (req, res) => {
  try {
    const products = await Product.find({ type: "women" })
      .populate({ path: "category", select: "name" })
      .lean()
      .exec();
    return res.status(201).send(products);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});
//CLOTHING API
router.get("/clothing", async (req, res) => {
  try {
    const products = await Product.find()
      .populate({ path: "category", select: "name" })
      .lean()
      .exec();
    console.log(products);
    let clothingArr = [];
    for (let i = 0; i < products.length; i++) {
      let cur = products[i];
      for (j in cur) {
        if (cur[j].name == "clothing") {
          clothingArr.push(cur);
        }
      }
    }
    // console.log({ clothingProducts: clothingArr });

    return res.status(201).send(clothingArr);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});
//HANDBAGS API
router.get("/handbags", async (req, res) => {
  try {
    const products = await Product.find()
      .populate({ path: "category", select: "name" })
      .lean()
      .exec();
    console.log(products);
    let handbagArr = [];
    for (let i = 0; i < products.length; i++) {
      let cur = products[i];
      for (j in cur) {
        if (cur[j].name == "handbags") {
          handbagArr.push(cur);
        }
      }
    }
    // console.log({ handbagProducts: handbagArr });

    return res.status(201).send(handbagArr);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});
//SHOES API
router.get("/shoes", async (req, res) => {
  try {
    const products = await Product.find()
      .populate({ path: "category", select: "name" })
      .lean()
      .exec();
    console.log(products);
    let shoesArr = [];
    for (let i = 0; i < products.length; i++) {
      let cur = products[i];
      for (j in cur) {
        if (cur[j].name == "shoes") {
          shoesArr.push(cur);
        }
      }
    }
    // console.log({ shoesProducts: shoesArr });

    return res.status(201).send(shoesArr);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

//Find By Id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate({ path: "category", select: "name" })
      .lean()
      .exec();
    return res.status(201).send(product);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = router;
