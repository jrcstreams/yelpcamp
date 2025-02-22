// DOTENV //

if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}




// APP REQUIREMENTS 

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const mongoSanitize = require('express-mongo-sanitize');


const flash = require('connect-flash')

const ExpressError = require('./utils/ExpressError')
const methodOverride = require('method-override')

const passport = require('passport')
const LocalStrategy = require('passport-local')

const User = require('./models/user')

const helmet = require('helmet')

// MONGO DATABASE CONNECTION //

const dbUrl = process.env.DB_URL;

// const dbUrl = 'mongodb://127.0.0.1:27017/yelp-camp'

// mongoose.connect(dbUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })

main().catch(err => {
    console.log(err)
    console.log('MONGOOSE CONNECTION ERROR')
});

async function main() {
    await mongoose.connect(dbUrl);
    return console.log('Yelpcamp Database Connected ⛺')
}


// ROUTE REQUIREMENTS //

const userRoutes = require('./routes/users')
const campgroundRoutes = require('./routes/campgrounds')
const reviewRoutes = require('./routes/reviews')

const app = express();
// FLASH MESSAGING // 

// SET VIEWS ENGINE, JOIN DIRECTORIES, USE EJS //

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))

// EXPRESS, FLASH, ETC. USAGE //

app.use(mongoSanitize());



// COOKIES/SESSIONS // 

const store = MongoStore.create({
    mongoUrl: dbUrl,
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret: 'supersicksecret',
    }
})

store.on("error", function (e) {
    console.log("SESSION STORE ERROR", e)
})

const sessionConfig = {
    store,
    name: 'session',
    secret: 'supersicksecret',
    resave: false,
    saveUninitialized: true,

    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig))

// FLASH // 

app.use(flash())

// HELMET & CONTENT SECURITY POLICY // 

app.use(helmet({ contentSecurityPolicy: false }))

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    "https://cdn.jsdelivr.net",
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
                "https://res.cloudinary.com/do7yzcrxs/", //SHOULD MATCH YOUR CLOUDINARY ACCOUNT!
                "https://images.unsplash.com/",
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);

// PASSPORT // 

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    console.log(req.session)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})




// ROUTE STORAGE //

app.get('/fakeUser', async (req, res) => {
    const user = new User({ email: 'bro@gmail.com', username: 'harriett' });
    const newUser = await User.register(user, 'poop')
    res.send(newUser)
})


// CAMPGROUND USAGE // 


app.use('/', userRoutes)
app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/reviews', reviewRoutes)

// HOMEPAGE // 

app.get('/', (req, res) => {
    res.render('home')
})

// ERROR HANDLING // 

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something went wrong.'
    res.status(statusCode).render('errors', { err });
})

// APP LISTENER //

app.listen(3000, () => {
    console.log('Serving on Port 3000')
})

