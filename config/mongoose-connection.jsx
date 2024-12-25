const mongoose = require('mongoose')
 
mongoose.connect("mongodb+srv://admin:admin@bookdb.wbzks.mongodb.net/?retryWrites=true&w=majority&appName=BOOKDB")
 .then(() => {
    console.log("Connected to database!");
})
.catch(() => {
    console.log("Connection Failed!" );
});

module.exports=mongoose.connection;