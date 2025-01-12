const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin.jsx");
const productModel = require("../models/productmodel.jsx")
const userModel = require("../models/usermodel.jsx")

router.get("/" , (req,res) =>{
    const error = req.flash("error");
    res.render("index", {error,isLoggedin: false});
    
})

router.get("/shop", isLoggedin, async (req,res) =>{
    let success=req.flash("success")
    let product = await productModel.find()
    res.render("shop",{ product, success });
})

router.get("/cart", isLoggedin, async (req, res) => {
    try {
      let user = await userModel
        .findOne({ email: req.user.email })
        .populate("cart");
  
      if (!user || !user.cart || user.cart.length === 0) {
        return res.status(400).send("Cart is empty or user not found");
      }
  
      // Ensure price and discount exist on the first item
      const item = user.cart[0];
      const price = Number(item.price) || 0; // Default to 0 if price is undefined
      const discount = Number(item.discount) || 0; // Default to 0 if discount is undefined
  
      const bill = (price + 20) - discount;
  
      res.render("cart", { user, bill });
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).send("An error occurred while fetching the cart");
    }
  });
  

  router.get("/addtocart/:productid", isLoggedin, async (req, res) => {
    try {
      // Find the user based on the logged-in user's email
      let user = await userModel.findOne({ email: req.user.email });
  
      if (!user) {
        req.flash("error", "User not found");
        return res.redirect("/shop");
      }
  
      // Add the product ID to the cart
      user.cart.push(req.params.productid);
  
      // Save the updated user document
      await user.save();
  
      req.flash("success", "Added to cart");
      res.redirect("/shop");
    } catch (error) {
      console.error("Error adding product to cart:", error);
      req.flash("error", "An error occurred while adding the product to the cart");
      res.redirect("/shop");
    }
  });
  
router.get("/logout", isLoggedin, (req,res) =>{
    res.render("shop");
})

module.exports = router;