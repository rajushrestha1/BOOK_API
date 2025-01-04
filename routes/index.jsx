const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin.jsx");

router.get("/" , (req,res) =>{
    const error = req.flash("error");
    res.render("index", {error});
    
})

router.get("/shop", (req,res) =>{
    res.render("shop");
})

module.exports = router;