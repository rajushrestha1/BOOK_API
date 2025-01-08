const express=require('express');
const router = express.Router();
const ownerModel = require("../models/ownersmodel.jsx");


if(process.env.NODE_ENV==="development"){

    router.post("/create", async(req,res)=>{
        let owners= await ownerModel.find();
        if(owners.length>1){
            return res
            .send(504)
            .send("You don't have permission to create a owner.")
        }

        let{fullname, email, password} =req.body;
let createdOwner = await ownerModel.create({
    fullname,
    email,
    password,
   
})

        res.status(201).send(createdOwner)
    })
}
router.get("/admin", (req,res) =>{
    const success = req.flash("success");
    res.render("createProducts",{success});
})


module.exports=router;