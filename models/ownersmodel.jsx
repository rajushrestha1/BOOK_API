const { default: mongoose } = require('mongoose')
const mongoosen= require ('mongoose')


const ownersSchema = mongoose.Schema({
    fullname :{
        type: String,
        minlength: 3,
        trim : true,
    },
    email : String,
    password :String,
   
    productss : {
        type : Array,
        default : []
    },
    
    picture: String,
    gstin: String,

})

module.exports=mongoose.model("owners ", ownersSchema);