if(process.env.MODE_ENV !== "production"){
    require('dotenv').config();
}
const express=require('express');
const path=require('path');
const mongoose=require('mongoose');
const ejsMate=require('ejs-mate');
const session=require('express-session');
const flash=require('connect-flash');
const ExpressError=require('./utils/ExpressError.js');
const methodOverride=require('method-override');
const passport=require("passport");
const LocalStrategy=require('passport-local');
const campgroundRoutes=require('./routes/campgrounds.js');
const xss = require('xss');
function sanitize(req, res, next) {
    for (let key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = xss(req.body[key]);
      }
    }
    next();
  }
const userRoutes=require('./routes/users');
const reviewRoutes=require('./routes/reviews');
const MongoStore = require('connect-mongo');
//'mongodb://localhost:27017/yelp-camp';
const User = require('./models/user.js');
const helmet=require('helmet');
mongoose.set('strictQuery', false);
//const dbUrl = process.env.DB_URL;
const dbUrl=process.env.DB_URL||'mongodb://127.0.0.1:27017/yelp-camp';
//mongoose.connect(dbUrl, {
 // useNewUrlParser: true,
 // useUnifiedTopology: true,
//});//127.0.0.1:27017//dont why localhost is not working
mongoose.connect(dbUrl);
//when loading the website first run mongod
//then run node -i -e "$(< C:/Users/zaidk/OneDrive/Desktop/yelp/seeds/index.js)"
//then run nodemon app.js then run webiste
const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});
const app=express();
app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'));
app.use(sanitize);//use to sanitize html

app.use(express.static(path.join(__dirname,'public')))
const secret=process.env.SECRET || 'thisshouldbeabettersecret!';
const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
         secret
    }
});
store.on("error",function(e){
    console.log("SESSION STORE ERROR",e);
})
const sessionConfig={
    store,
    name:'session',
    secret,
    resave:false,
    saveUninitialized:true,
    cookie:{httpOnly:true,
    //secure:true,
    expires:Date.now()+1000*60*60*24*7,
    maxAge:1000*60*60*24*7}};
app.use(session(sessionConfig));
app.use(flash());
app.use(helmet());
const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.min.js"
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
];
const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/djfjsks1a/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT! 
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
//autheticate method comes from passport local mongoose to check if username and password are correct
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//serialize and deserialize methods come from passport local mongoose to store and unstore user in session
//this is to make sure that session is not stored in memory but in mongo
app.use((req,res,next) =>{    
res.locals.success=req.flash('success');
res.locals.error = req.flash('error');
res.locals.currentUser=req.user;
next();})
app.use('/',userRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/reviews',reviewRoutes);
app.get('/',(req,res)=>{
    res.render('home');
});

app.all('*',(req,res,next)=>{
    next(new ExpressError('Page Not Found',404));
});

app.use((err,req,res,next)=>{
    
    const {statusCode=500}=err;
    if(!err.message) err.message='Oh No, Something Went Wrong!';
    res.status(statusCode).render('error',{err});
    
});
app.listen(3000,()=>{
    console.log('Server started on port 3000');
});