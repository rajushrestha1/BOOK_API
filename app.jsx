const express= require("express")
const app = express()
const cookieparser= require("cookie-parser")
const path = require("path")
const db=require("./config/mongoose-connection.jsx")
const ownersRouter =require("./routes/ownersRouter.jsx")
const usersRouter =require("./routes/usersRouter.jsx")
const productsRouter =require("./routes/productsRouter.jsx")
const expressSession = require("express-session");
const flash = require("connect-flash");
const indexRouter = require("./routes/index.jsx");
require("dotenv").config();

app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: 'process.env.EXPRESS_SESSION_SECRET',
        cookie: { secure: true }
    })
)
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({extended: true }))
app.use(cookieparser())
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")



app.use("/owners", ownersRouter)
app.use("/users", usersRouter)
app.use("/products", productsRouter)

app.listen(3000)