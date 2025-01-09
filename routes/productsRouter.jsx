const express = require('express');
const router = express.Router();
const upload = require("../config/multer-config.jsx");
const productModel = require("../models/productmodel.jsx");

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    // Destructure the form data
    const {
      title,
      price,
      discount,
      author,
      genre,
      publicationdate
    } = req.body;

    // Ensure that an image is provided
    if (!req.file) {
      throw new Error("Image file is required.");
    }

    // Create product in the database
    let product = await productModel.create({
      image: req.file.buffer, // Store image as a buffer or a URL
      title,
      price,
      discount,
      author,
      genre,
      publicationdate
    });

    // Send a success message with the product data to the admin page
    req.flash("success", "Product created successfully.");
    res.redirect("/owners/admin");  // You may also pass product details to a page for display
  } catch (err) {
    res.status(400).send(`Error: ${err.message}`);
  }
});

module.exports = router;
