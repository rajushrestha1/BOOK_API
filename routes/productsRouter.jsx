const express=require('express');
const router = express.Router();
const upload= require("../config/multer-config.jsx")
const productModel = require("../models/productmodel.jsx")


router.post("/create", upload.single("image"), async(req,res) =>{
try{
    let{
     image,
     name,
     price,
     discount,
     bgcolor,
     panelcolor,
     textcolor,
 } =req.body; 

let porduct= await productModel.create({

    image: req.file.buffer,
    name,
    price,
    discount,
    bgcolor,
    panelcolor,
    textcolor,
});
req.flash("success", "Product created succesfully.")
res.redirect("/owners/admin")
}catch(err){
    res.send(err.message)
}
    
    
})

module.exports=router;