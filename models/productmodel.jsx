const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  image: { type: Buffer, required: true },  // Store image as a buffer
  title: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publicationdate: { type: String, required: true },
});

module.exports = mongoose.model("product", productSchema);
