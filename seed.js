const mongoose = require("mongoose");
const Products = require("./models/products.models");

// Configures environment variables
require("dotenv").config({
  path: process.env.NODE_ENV || "./.env.development",
});

mongoose
  .connect(
    `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_URI}/${process.env.MONGO_DB}`
  )
  .then(res => console.log("MONGODB HAS CONNECTED"))
  .catch(console.log);

async function createFirstProduct() {
  const response = await fetch("https://dummyjson.com/products");

  const data = await response.json();

  for (let product of data.products) {
    await Products.create(product);
  }
}

createFirstProduct();
