const express = require('express');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const ExpressError = require('./utils/ExpressError');
const User = require('./models/user');
const userRoutes = require('./routes/user');
require('dotenv').config(); // Load environment variables
const multer = require('multer');
const { storage } = require("./cloudConfig");
const upload = multer({ storage });


// Import all models
const PanclubsGdscForm = require('./models/panclubsGdscForm'); 
const PanclubsOffbitForm = require('./models/panclubsOffbitForm'); 
const PanclubsVihangForm = require('./models/panclubsVihangForm');
const PanclubsCpmcForm = require('./models/panclubsCpmcForm');
const PanclubsAbhivyaktiForm = require('./models/panclubsAbhivyaktiForm');
const PanclubsNssForm = require('./models/panclubsNssForm');
const PanclubsToastmasterForm = require('./models/panclubsToastmasterForm');
const Aces = require('./models/aces');
const Acm = require('./models/acm');
const S4ds = require('./models/s4ds');
const Isa = require('./models/isa');
const Enticers = require('./models/enticers');
const Iete = require('./models/iete');
const Itesa = require('./models/itesa'); 
const Mesa = require('./models/mesa');
const Prediators = require('./models/prediators');
const Cesa = require('./models/cesa');
const Igs = require('./models/igs');
const Saie = require('./models/saie');
const Sara = require('./models/sara');
const departmentclubsRoutes = require('./routes/departmentclubs');
const panclubsRoutes = require('./routes/panclubs');
const adminRoutes = require('./routes/admin');
const Pastevents = require('./models/pastevents');



// Initialize Express App
const app = express();
const dbURL = process.env.ATLASDB_URL;

// Connect to MongoDB
async function main() {
    try {
        await mongoose.connect(dbURL);
        console.log("connected to DB");
    } catch (err) {
        console.log(err);
    }
}
main();

// Middleware to Check if User is Logged In
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You must be signed in first!');
    res.redirect('/collegeclub/login');
}

// Set up EJS and Views Directory
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static('public/uploads'));


// Configure MongoDB Store for Sessions
const store = MongoStore.create({
    mongoUrl: dbURL,
    crypto: {
        secret: process.env.SECRET,
        touchAfter: 24 * 3600,
    },
});
store.on("error", (err) => {
    console.log("ERROR IN MONGO SESSION STORE", err);
});

// Session and Flash Configuration
const sessionOptions = {
    store,
    secret: process.env.SESSION_SECRET || process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};
app.use(session(sessionOptions));
app.use(flash());

// Passport Configuration
passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) return done(null, false, { message: 'Incorrect email.' });
            user.authenticate(password, (err, user, passwordError) => {
                if (err) return done(err);
                if (passwordError) return done(null, false, { message: 'Incorrect password.' });
                return done(null, user);
            });
        } catch (err) {
            return done(err);
        }
    }
));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://zestful-anatola-vedant123-3a940bef.koyeb.app/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) return done(null, user);
        const uniqueUsername = `${profile.displayName}-${profile.id.substring(0, 5)}`;
        user = await new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            username: uniqueUsername
        }).save();
        done(null, user);
    } catch (err) {
        console.error(err);
        done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

// Flash Messages Middleware
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user;
    next();
});

// Define Routes
app.get("/", (req, res) => {
    res.render("index", { title: "College Club Home" });
});

app.get("/collegeclub", (req, res) => {
    res.render("index", { title: "College Club Home" });
});

// Panclubs Route
app.get('/collegeclub/panclubs', isLoggedIn, (req, res) => {
    res.render('panclubs', { title: "PanClubs" });
});

// Department Clubs Route
app.get('/collegeclub/departmentclubs', isLoggedIn, (req, res) => {
    res.render('departmentclubs', { title: "Department Clubs" });
});

// Individual Department Routes
// Department Clubs Route
app.get('/collegeclub/departmentclubs', isLoggedIn, (req, res) => {
    res.render('departmentclubs', { title: "Department Clubs" });
});

app.get('/collegeclub/departmentclubs/computer', isLoggedIn, (req, res) => {
    res.render('departmentclubs/computer', { title: "computer " });
});

app.get('/collegeclub/departmentclubs/civil', isLoggedIn, (req, res) => {
    res.render('departmentclubs/civil', { title: "Civil Engineering" });
});
app.get('/collegeclub/departmentclubs/mechanical', isLoggedIn, (req, res) => {
    res.render('departmentclubs/mechanical', { title: "Mechanical Engineering" });
});
app.get('/collegeclub/departmentclubs/entc', isLoggedIn, (req, res) => {
    res.render('departmentclubs/entc', { title: "ENTC" });
});
app.get('/collegeclub/departmentclubs/it', isLoggedIn, (req, res) => {
    res.render('departmentclubs/it', { title: "Information Technology" });
});
app.get('/collegeclub/departmentclubs/aids', isLoggedIn, (req, res) => {
    res.render('departmentclubs/aids', { title: "AIDS" });
});
app.get('/collegeclub/departmentclubs/instrumentation', isLoggedIn, (req, res) => {
    res.render('departmentclubs/instrumentation', { title: "Instrumentation Engineering" });
});
app.get('/collegeclub/departmentclubs/robotics', isLoggedIn, (req, res) => {
    res.render('departmentclubs/robotics', { title: "Robotics Engineering" });
});

app.get('/collegeclub/Apply', (req, res) => {
    const forms = [
        { name: 'Abhivyakti', link: '/collegeclub/panclubs/abhivyakti/apply' },
        { name: 'CPMC', link: '/collegeclub/panclubs/cpmc/apply' },
        { name: 'GDSC', link: '/collegeclub/panclubs/gdsc/apply' },
        { name: 'NSS', link: '/collegeclub/panclubs/nss' },
        { name: 'Offbit', link: '/collegeclub/panclubs/offbit/apply' },
        { name: 'Toastmaster', link: '/collegeclub/panclubs/toastmaster/apply' },
        { name: 'Vihang', link: '/collegeclub/panclubs/vihang/apply' },
        { name: 'Prediators', link: '/collegeclub/apply/prediators' },
        { name: 'S4DS', link: '/collegeclub/apply/s4ds' },
        { name: 'SAIE', link: '/collegeclub/apply/saie' },
        { name: 'SARA', link: '/collegeclub/apply/sara' },
        { name: '', link: '/collegeclub/apply/saie' },
        { name: 'SARA', link: '/collegeclub/apply/sara' }
    ];

    res.render('apply', { title: 'Apply to Clubs', forms });
});



app.use('/collegeclub', userRoutes);
app.use('/collegeclub/panclubs', panclubsRoutes);
app.use('/collegeclub/departmentclubs', departmentclubsRoutes);
app.use('/collegeclub/admin', adminRoutes);






// Google OAuth Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/collegeclub/login' }), (req, res) => {
    req.flash('success', 'Welcome back!');
    res.redirect('/');
});

// Admin Dashboard Route
app.get('/collegeclub/admin/dashboard', isLoggedIn, async (req, res) => {
    try {
        const [users, aces, acm, cesa, enticers, iete, igs, isa, itesa, mesa, 
                panclubsAbhivyaktiForms, panclubsCpmcForms, panclubsGdscForms, 
                panclubsNssForms, panclubsOffbitForms, panclubsToastmasterForms, 
                panclubsVihangForms, prediators, s4ds, saie, sara] = await Promise.all([
            User.find({}),
            Aces.find({}),
            Acm.find({}),
            Cesa.find({}),
            Enticers.find({}),
            Iete.find({}),
            Igs.find({}),
            Isa.find({}),
            Itesa.find({}),
            Mesa.find({}),
            PanclubsAbhivyaktiForm.find({}),
            PanclubsCpmcForm.find({}),
            PanclubsGdscForm.find({}),
            PanclubsNssForm.find({}),
            PanclubsOffbitForm.find({}),
            PanclubsToastmasterForm.find({}),
            PanclubsVihangForm.find({}),
            Prediators.find({}),
            S4ds.find({}),
            Saie.find({}),
            Sara.find({})
        ]);

        const userEmail = req.user.email;

        // Render the dashboard with all data
        res.render('admin/dashboard', { 
            title: 'Admin Dashboard',
            userEmail,
            users,
            aces,
            acm,
            cesa,
            enticers,
            iete,
            igs,
            isa,
            itesa,
            mesa,
            panclubsAbhivyaktiForms,
            panclubsCpmcForms,
            panclubsGdscForms,
            panclubsNssForms,
            panclubsOffbitForms,
            panclubsToastmasterForms,
            panclubsVihangForms,
            prediators,
            s4ds,
            saie,
            sara
        });
    } catch (err) {
        console.error(err);
        req.flash('error', 'Failed to retrieve data');
        res.redirect('/'); // Redirect to a safe page if there’s an error
    }
});


// Route for displaying events on the pastevents page
// Route to display past events
app.get('/collegeclub/pastevents', async (req, res) => {
    try {
        const events = await Pastevents.find({});
        res.render('pastevents', { 
            title: 'Past Events',
            events
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching events data.');
    }
});

// Route to render user.ejs

// Catch-all Route for 404 Errors
app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    const { status = 500 } = err; // Default to 500 if status is not set
    res.status(status); // Set the status code
    res.render("error", { 
        title: "Error",
        status, 
        message: err.message 
    });
});

// Start the Server
app.listen(8080, () => {
    console.log(`Server is listening on port 8080`);
});
