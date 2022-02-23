const express = require("express");
const Category = require("../models/category.model");

const router = express.Router();

router.post("", async (req, res) => {
  try {
    const category = await Category.create(req.body);
    return res.status(201).send(category);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

router.get("", async (req, res) => {
  try {
    const categories = await Category.find().lean().exec();
    return res.status(201).send(categories);
  } catch (e) {
    return res.status(500).send(e.message);
  }
});

module.exports = router;
