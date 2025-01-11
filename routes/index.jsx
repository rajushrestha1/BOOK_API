const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin.jsx");
const productModel = require("../models/productmodel.jsx")


router.get("/" , (req,res) =>{
    const error = req.flash("error");
    res.render("index", {error,isLoggedin: false});
    
})

router.get("/shop", isLoggedin, async (req,res) =>{

    let product = await productModel.find()
    res.render("shop",{ product });
})
router.get("/addtocart/:id", isLoggedin, async(req,res)=>{
  let user= await userModel.findOne({user: req.user.email})
})

router.get("/logout", isLoggedin, (req,res) =>{
    res.render("shop");
})

module.exports = router;