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
app.set("views", path.join(__dirname, "views"))

app.use("/", indexRouter)
app.use("/owners", ownersRouter)
app.use("/users", usersRouter)
app.use("/products", productsRouter)


app.get('/', (req, res) => {
    const error = req.query.error || null; 
    res.render('index', { error });
  });

  app.get('/admin', (req, res) => { 
    res.render('admin.ejs');
  });

  app.get('/cart', (req, res) => { 
    res.render('cart.ejs');
  });
  app.get('/shop', (req, res) => { 
    res.render('shop');
  });


app.listen(3000,()=>{
    console.log("server is running on port 3000");
})