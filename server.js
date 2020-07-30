const express = require("express");
const bodyParser = require("body-parser");
const mongoonse = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());

// Create mongoonse connect to the api
mongoonse.connect("mongodb://localhost/react-ecommerce-db", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// Create a mongoose model
const Product = mongoonse.model(
  "products",
  new mongoonse.Schema({
    _id: { type: String, default: shortid.generate },
    image: String,
    title: String,
    description: String,
    price: Number,
    availableSizes: [String],
  })
);

// Fetch from the api
app.get("/api/products", async (req, res) => {
  const products = await Product.find();
  // Send back to the client
  res.send(products);
});

// HTTP POST, create a product
app.post("/api/products", async (req, res) => {
  const newProduct = new Product(req.body);
  const saveProduct = await newProduct.save();
  res.send(saveProduct);
});

// HTTP Delete, delete product by id
app.delete("/api/products/:id", async (req, res) => {
  const deleteProduct = await Product.findByIdAndDelete(req.params.id);

  res.send(deleteProduct);
});

// Oder model
const Order = mongoonse.model(
  "order",
  new mongoonse.Schema(
    {
      _id: {
        type: String,
        default: shortid.generate,
      },
      email: String,
      name: String,
      address: String,
      total: Number,
      cartItems: [
        {
          _id: String,
          title: String,
          price: Number,
          count: Number,
        },
      ],
    },
    {
      timestamps: true, // timestamps for creation and updates
    }
  )
);

//POST for form
app.post("/api/orders", async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.address ||
    !req.body.total ||
    !req.body.cartItems
  ) {
    return res.send({ message: "Please fill all text fields." });
  }
  const order = await Order(req.body).save();
  res.send(order);
});
const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Listenning in port 5000"));
