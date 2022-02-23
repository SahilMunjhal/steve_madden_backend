const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    url_2: { type: String, required: true },
    url_3: { type: String, required: true },
    url_4: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    Mrp: { type: String, reuired: true },
    price: { type: String, required: true },
    p: { type: Number, required: true },
    discount: { type: String, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    quantity: { type: Number, default: 10 },
    size: { type: String, default: "L" },
    color: { type: String, default: "Black" },
    type: { type: String, default: "women" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("product", productSchema);
