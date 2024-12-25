const { default: mongoose } = require('mongoose')
const mongoosen= require ('mongoose')



const productSchema = mongoose.Schema({
    image: String,
    name: String,
    price:Number,

    discount:{
        type:Number,
        default: 0,
    },

    bgcolor:String,
    panelcolor:String,
    textcolor:string,
    
})

module.exports=mongoose.model("product", productSchema);