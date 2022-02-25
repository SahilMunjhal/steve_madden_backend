const express = require("express");
const app = express();
const Razorpay = require("razorpay");

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

const OrderDetails = require("./models/orderDetails.model");

app.use("/categories", categoryController);
app.use("/products", productController);

var instance = new Razorpay({
  key_id: "rzp_test_VsoO9BEK2erzgZ",
  key_secret: "IWbeDhHIJTPPJPAlFb85WZU2",
});

app.post("/create/orderId", async (req, res) => {
  try {
    var options = {
      amount: req.body.amount, // amount in the smallest currency unit
      currency: "INR",
      receipt: "steve_id_1",
    };
    instance.orders.create(options, function (err, order) {
      console.log(order);
      // OrderDetails.create(order);
      return res.status(201).send({ orderId: order.id });
    });
  } catch (e) {
    return res.status(500).send({ rzp_ord_err: e.message });
  }
});

app.post("/saveOrderDetails", async (req, res) => {
  try {
    const details = await OrderDetails.create(req.body);
    return res.status(201).send(details);
  } catch (e) {
    return res.status(500).send({ orderSaveErr: e.message });
  }
});
//verify signature
app.post("/api/payment/verify", (req, res) => {
  let body =
    req.body.response.razorpay_order_id +
    "|" +
    req.body.response.razorpay_payment_id;

  var crypto = require("crypto");
  var expectedSignature = crypto
    .createHmac("sha256", "Wok5mJv2F0pa5HKLeXZfUr9r")
    .update(body.toString())
    .digest("hex");
  console.log("sig received ", req.body.response.razorpay_signature);
  console.log("sig generated ", expectedSignature);
  var response = { signatureIsValid: "false" };
  if (expectedSignature === req.body.response.razorpay_signature)
    response = { signatureIsValid: "true" };
  res.send(response);
});

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
