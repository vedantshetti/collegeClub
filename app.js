    const express = require('express');
    const mongoose = require('mongoose');
    const ejsMate = require('ejs-mate');
    const path = require('path');
    const session = require('express-session');
    const MongoStore = require('connect-mongo');
    const flash = require('connect-flash');
    const passport = require('passport');
    const LocalStrategy = require('passport-local');
    const GoogleStrategy = require('passport-google-oauth20').Strategy;
    const ExpressError = require('./utils/ExpressError');
    const User = require('./models/user');
    const userRoutes = require('./routes/user');
    require('dotenv').config(); // Load environment variables
    const multer = require('multer');
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
    const Mesa = require('./models/mesa'); // Update the path as needed
    const Prediators = require('./models/prediators');
    const Cesa = require('./models/cesa');
    const Igs = require('./models/igs');
    const Saie = require('./models/saie');
    const Sara = require('./models/sara');
    const { storage } = require("./cloudConfig");
    const upload = multer({ storage });










    const app = express();
    const  dbURL = process.env.ATLASDB_URL;

    main()
    .then(() =>{
        console.log("connected to DB")
    })
    .catch((err) =>{
        console.log(err);
    });



    async function main() {
        // await mongoose.connect(MONGO_URL);
        await mongoose.connect(dbURL);
    }










    // Set up EJS and Views Directory
    app.engine('ejs', ejsMate);
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, 'views'));

    // Middleware
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));



    const store= MongoStore.create({
        mongoUrl: dbURL,
        crypto:{
        secret:process.env.SECRET,
        touchAfter:24*3600,
    
        }
    })

    
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
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }
            user.authenticate(password, (err, user, passwordError) => {
                if (err) {
                    return done(err);
                }
                if (passwordError) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });
        } catch (err) {
            return done(err);
        }
    }
));

// Google OAuth Strategy Configuration
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://collegeclub.onrender.com/auth/google/callback"

}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
            return done(null, user);
        }

        const uniqueUsername = `${profile.displayName}-${profile.id.substring(0, 5)}`;

        user = await new User({
            googleId: profile.id,
            email: profile.emails[0].value,
            username: uniqueUsername // Use a unique username
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

app.get('/collegeclub/panclubs', (req, res) => {
    res.render('panclubs', { title: "PanClubs" });
});

app.get('/collegeclub/depatmentclubs', (req, res) => {
    res.render('depatmentclubs', { title: "depatmentclubs" });
});


// departmentclubs...........................................................................

app.get('/collegeclub/depatmentclubs/computer', (req, res) => {
    res.render('departmentclubs/computer', { title: "CSE" });
});



// Civil Engineering Club route
app.get('/collegeclub/departmentclubs/civil', (req, res) => {
    res.render('departmentclubs/civil', { title: "Civil Engineering" });
});

// Mechanical Engineering Club route
app.get('/collegeclub/departmentclubs/mechanical', (req, res) => {
    res.render('departmentclubs/mechanical', { title: "Mechanical Engineering" });
});

// Electronics and Telecommunication (ENTC) Club route
app.get('/collegeclub/departmentclubs/entc', (req, res) => {
    res.render('departmentclubs/entc', { title: "ENTC" });
});

// Information Technology (IT) Club route
app.get('/collegeclub/departmentclubs/it', (req, res) => {
    res.render('departmentclubs/it', { title: "Information Technology" });
});

// Artificial Intelligence and Data Science (AIDS) Club route
app.get('/collegeclub/departmentclubs/aids', (req, res) => {
    res.render('departmentclubs/aids', { title: "AIDS" });
});

// Instrumentation Engineering Club route
app.get('/collegeclub/depatmentclubs/instrumentation', (req, res) => {
    res.render('departmentclubs/instrumentation', { title: "Instrumentation Engineering" });
});

// robotics route
app.get('/collegeclub/depatmentclubs/robotics', (req, res) => {
    res.render('departmentclubs/robotics', { title: "robotics Engineering" });
});





// ............................  .computer department clubs ................. start 
app.get('/collegeclub/depatmentclubs/computer/aces', (req, res) => {
    res.render('departmentclubs/computerAces', { title: "ACES" });
});

app.get('/collegeclub/depatmentclubs/computer/aces/apply', (req, res) => {
    res.render('forms/aces', { title: "ACSE" });
});

app.post('/collegeclub/depatmentclubs/computer/aces/apply', upload.single('resume'), async (req, res) => {
    try {
        const { fullName, email, phone, role, year, projectLink } = req.body;
        let resumePath = '';

        if (req.file) {
            resumePath = req.file.path;
        }

        const formData = new Aces({
            fullName,
            email,
            phone,
            department: 'Computer Science', // Default value
            role,
            year,
            projectLink,
            resume: resumePath
        });

        await formData.save();

        res.render('thankyou/thankyouAces', { title: "Thank You!" }); // Render the Thank You page
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while processing your application.');
    }
});







app.get('/collegeclub/depatmentclubs/computer/acm', (req, res) => {
    res.render('departmentclubs/computerAcm', { title: "ACM" });
});


app.get('/collegeclub/depatmentclubs/computer/acm/apply', (req, res) => {
    res.render('forms/acm', { title: "ACM" });
});


app.post('/collegeclub/depatmentclubs/computer/acm/apply', upload.single('resume'), async (req, res) => {
    try {
        // Extract form data
        const { fullName, email, phone, role, year, projectLink } = req.body;
        const resume = req.file ? req.file.filename : ''; // Handle file upload

        // Create new ACM entry
        const newAcm = new Acm({
            fullName,
            email,
            phone,
            department: 'Computer Science', // Default value
            role,
            year,
            projectLink,
            resume
        });

        // Save to database
        await newAcm.save();

        // Render thank you page
        res.render('thankyou/thankyouAcm', { title: 'Thank You!' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});




// ............................  .computer department clubs ................. end



// ................................Aids department clubs  ...........start 

app.get('/collegeclub/depatmentclubs/aids/s4ds', (req, res) => {
    res.render('departmentclubs/aidsS4ds', { title: "S4DS" });
});

app.get('/collegeclub/depatmentclubs/aids/s4ds/apply', (req, res) => {
    res.render('forms/s4ds', { title: "S4DS" });
});


app.post('/collegeclub/depatmentclubs/aids/s4ds/apply', upload.single('resume'), async (req, res) => {
    try {
        // Extract form data
        const { fullName, email, phone, role, year, projectLink } = req.body;
        const resume = req.file ? req.file.filename : ''; // Handle file upload

        // Create new S4DS entry
        const newS4ds = new S4ds({
            fullName,
            email,
            phone,
            department: 'Artificial Intelligence and Data Science', // Default value
            role,
            year,
            projectLink,
            resume
        });

        // Save to database
        await newS4ds.save();

        // Render thank you page
        res.render('thankyou/thankyouS4ds', { title: 'Thank You!' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});



app.get('/collegeclub/depatmentclubs/aids/isa', (req, res) => {
    res.render('departmentclubs/aidsIsa', { title: "ISA" });
});

app.get('/collegeclub/depatmentclubs/aids/isa/apply', (req, res) => {
    res.render('forms/isa', { title: "ISA" });
});

app.post('/collegeclub/depatmentclubs/aids/isa/apply', upload.single('resume'), async (req, res) => {
    try {
        // Extract form data
        const { fullName, email, phone, role, year, projectLink } = req.body;
        const resume = req.file ? req.file.filename : ''; // Handle file upload

        // Create a new ISA entry
        const newIsa = new Isa({
            fullName,
            email,
            phone,
            department: 'Artificial Intelligence and Data Science', // Default value
            role,
            year,
            projectLink,
            resume
        });

        // Save to database
        await newIsa.save();

        // Render thank you page
        res.render('thankyou/thankyouIsa', { title: 'Thank You!' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});


// ................................Aids department clubs  ........... end


//............................................................Entc department clubs...........start

app.get('/collegeclub/departmentclubs/entc/enticers', (req, res) => {
    res.render('departmentclubs/entcEnticers', { title: "ENTICERS" });
});

app.get('/collegeclub/departmentclubs/entc/enticers/apply', (req, res) => {
    res.render('forms/enticers', { title: "ENTICERS" });
});


app.post('/collegeclub/departmentclubs/entc/enticers/apply', upload.single('resume'), async (req, res) => {
    try {
        const newApplication = new Enticers({
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            department: req.body.department,
            role: req.body.role,
            year: req.body.year,
            projectLink: req.body.projectLink,
            resume: req.file.path // assuming multer is storing the file path
        });

        await newApplication.save();
        res.render('thankyou/thankyouEnticers', { title: 'Thank You' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong.');
    }
});








app.get('/collegeclub/departmentclubs/entc/iete', (req, res) => {
    res.render('departmentclubs/entcIete', { title: "IETE" });
});

app.get('/collegeclub/departmentclubs/entc/iete/apply', (req, res) => {
    res.render('forms/iete', { title: "IETE" });
});

app.post('/collegeclub/departmentclubs/entc/iete/apply', upload.single('resume'), async (req, res) => {
    try {
        const { fullName, email, phone, department, role, year, projectLink } = req.body;
        const resume = req.file ? req.file.filename : null;

        const ieteApplication = new Iete({
            fullName,
            email,
            phone,
            department,
            role,
            year,
            projectLink,
            resume
        });

        await ieteApplication.save();

        res.render('thankyou/thankyouIete', { title: 'Thank You for Applying to IETE Club!' });
    } catch (error) {
        console.error('Error while submitting IETE application:', error);
        res.status(500).send('An error occurred while submitting your application. Please try again later.');
    }
});


//............................................................Entc department clubs...........end






//..........................................IT department clubs.........................................start

app.get('/collegeclub/departmentclubs/it/itesa', (req, res) => {
    res.render('departmentclubs/itItesa', { title: "ITESA" });
});

app.get('/collegeclub/departmentclubs/it/itesa/apply', (req, res) => {
    res.render('forms/itesa', { title: "ITESA" });
});


app.post('/collegeclub/departmentclubs/it/itesa/apply', upload.single('resume'), async (req, res) => {
    try {
        const { fullName, email, phone, role, year, projectLink } = req.body;
        const resume = req.file ? req.file.filename : null;

        const itesaApplication = new Itesa({
            fullName,
            email,
            phone,
            department: 'Information Technology', // default department value
            role,
            year,
            projectLink,
            resume
        });

        await itesaApplication.save();

        res.render('thankyou/thankyouItesa', { title: 'Thank You for Applying to ITESA Club!' });
    } catch (error) {
        console.error('Error while submitting ITESA application:', error);
        res.status(500).send('An error occurred while submitting your application. Please try again later.');
    }
});




//..........................................IT department clubs.........................................end


//.........................................Mechanical department clubs ........start


app.get('/collegeclub/departmentclubs/mechanical/mesa', (req, res) => {
    res.render('departmentclubs/mechanicalMesa', { title: "MESA" });
});

app.get('/collegeclub/departmentclubs/mechanical/mesa/apply', (req, res) => {
    res.render('forms/mesa', { title: "MESA" });
});

app.post('/collegeclub/departmentclubs/mechanical/mesa/apply', upload.single('resume'), async (req, res) => {
    try {
        const { fullName, email, phone, role, year, projectLink } = req.body;
        const resume = req.file ? req.file.filename : null;

        const mesaApplication = new Mesa({
            fullName,
            email,
            phone,
            department: 'Mechanical Engineering',
            role,
            year,
            projectLink,
            resume
        });

        await mesaApplication.save();

        res.render('thankyou/thankyouMesa', { title: 'Thank You for Applying to MESA Club!' });
    } catch (error) {
        console.error('Error while submitting MESA application:', error);
        res.status(500).send('An error occurred while submitting your application. Please try again later.');
    }
});




app.get('/collegeclub/departmentclubs/mechanical/prediators', (req, res) => {
    res.render('departmentclubs/mechanicalPrediators', { title: "PREDIATORS" });
});

app.get('/collegeclub/departmentclubs/mechanical/prediators/apply', (req, res) => {
    res.render('forms/prediators', { title: "PREDIATORS" });
});


app.post('/collegeclub/departmentclubs/mechanical/prediators/apply', upload.single('resume'), async (req, res) => {
    try {
        const { fullName, email, phone, department, role, year, projectLink } = req.body;
        const resume = req.file ? req.file.filename : null;

        const prediatorsApplication = new Prediators({
            fullName,
            email,
            phone,
            department,
            role,
            year,
            projectLink,
            resume
        });

        await prediatorsApplication.save();

        res.render('thankyou/thankyouPrediators', { title: 'Thank You for Applying to Prediators Club!' });
    } catch (error) {
        console.error('Error while submitting Prediators application:', error);
        res.status(500).send('An error occurred while submitting your application. Please try again later.');
    }
});





//.........................................Mechanical department clubs ........start

// ......................................................Civil department clubs.....start

app.get('/collegeclub/departmentclubs/civil/cesa', (req, res) => {
    res.render('departmentclubs/civilCesa', { title: "CESA" });
});

app.get('/collegeclub/departmentclubs/civil/cesa/apply', (req, res) => {
    res.render('forms/cesa', { title: "CESA" });
});

app.post('/collegeclub/departmentclubs/civil/cesa/apply', upload.single('resume'), async (req, res) => {
    try {
        const { fullName, email, phone, department, role, year, projectLink } = req.body;
        const resume = req.file ? req.file.filename : null;

        const cesaApplication = new Cesa({
            fullName,
            email,
            phone,
            department,
            role,
            year,
            projectLink,
            resume
        });

        await cesaApplication.save();

        res.render('thankyou/thankyouCesa', { title: 'Thank You for Applying to CESA Club!' });
    } catch (error) {
        console.error('Error while submitting CESA application:', error);
        res.status(500).send('An error occurred while submitting your application. Please try again later.');
    }
});






app.get('/collegeclub/departmentclubs/civil/igs', (req, res) => {
    res.render('departmentclubs/civilIgs', { title: "IGS" });
});

app.get('/collegeclub/departmentclubs/civil/igs/apply', (req, res) => {
    res.render('forms/igs', { title: "IGS" });
});

app.post('/collegeclub/departmentclubs/civil/igs/apply', upload.single('resume'), async (req, res) => {
    try {
        const { fullName, email, phone, role, year, projectLink } = req.body;
        const resume = req.file ? req.file.filename : '';

        const igsApplication = new Igs({
            fullName,
            email,
            phone,
            role,
            year,
            projectLink,
            resume
        });

        await igsApplication.save();
        res.render('thankyou/thankyouIgs', { title: 'Thank You' });
    } catch (error) {
        console.error('Error saving application:', error);
        res.status(500).send('An error occurred while submitting your application. Please try again later.');
    }
});












// ......................................................Civil department clubs........end 


//...........................................Instru department clubs............................start

app.get('/collegeclub/depatmentclubs/instrumentation/saie', (req, res) => {
    res.render('departmentclubs/instrumentationSaie', { title: "SAIE" });
});

app.get('/collegeclub/depatmentclubs/instrumentation/saie/apply', (req, res) => {
    res.render('forms/saie', { title: "SAIE" });
});

app.post('/collegeclub/departmentclubs/instrumentation/saie/apply', upload.single('resume'), async (req, res) => {
    try {
        const { fullName, email, phone, department, role, year, projectLink } = req.body;
        const resume = req.file.path;

        const saieApplication = new Saie({
            fullName,
            email,
            phone,
            department,
            role,
            year,
            projectLink,
            resume
        });

        await saieApplication.save();
        res.render('thankyou/thankyouSaie', { title: 'Thank You - SAIE Club' });
    } catch (error) {
        console.error('Error saving SAIE application:', error);
        res.status(500).send('Internal Server Error');
    }
});

//...........................................Instru department clubs............................end

//...........................................robotics and automation  department clubs..........start

app.get('/collegeclub/departmentclubs/robotics/sara', (req, res) => {
    res.render('departmentclubs/roboticsSara', { title: "SARA" });
});


app.get('/collegeclub/departmentclubs/robotics/sara/apply', (req, res) => {
    res.render('forms/sara', { title: "SARA" });
});

app.post('/collegeclub/departmentclubs/robotics/sara/apply', upload.single('resume'), async (req, res) => {
    try {
        const { fullName, email, phone, role, year, projectLink } = req.body;
        const resume = req.file ? req.file.filename : null;

        const newApplication = new Sara({
            fullName,
            email,
            phone,
            role,
            year,
            projectLink,
            resume
        });

        await newApplication.save();
        res.render('thankyou/thankyouSara', { title: 'Thank You - SARA Club' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});



//...........................................robotics and automation  department clubs..........end



// panclubs ................................................................

// GDSC route ...........................................           start
app.get('/collegeclub/panclubs/gdsc', (req, res) => {
    res.render('panclubs/gdsc', { title: "GDSC" });
});

// Route for the "Apply Now" button
app.get('/collegeclub/panclubs/gdsc/apply', (req, res) => {
    res.render('forms/panclubsGdscForm', { title: "Apply for GDSC" });
});

app.post('/collegeclub/panclubs/gdsc/apply', upload.single('resume'), async (req, res) => {
    try {
        const { fullName, email, phone, department, role, year, projectLink } = req.body;
        let resumePath = '';

        if (req.file) {
            resumePath = req.file.path;
        }

        const formData = new PanclubsGdscForm({
            fullName,
            email,
            phone,
            department,
            role,
            year,
            projectLink,
            resume: resumePath
        });

        await formData.save();

        res.render('thankyou/thankyouGdsc', { title: "Thank You!" }); // Render the Thank You page
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while processing your application.');
    }
});




// GDSC route ...........................................         end



// Offbit route............................................................. start
app.get('/collegeclub/panclubs/offbit', (req, res) => {
    res.render('panclubs/offbit', { title: "Offbit" });
});

// Route for the "Apply Now" button for Offbit
app.get('/collegeclub/panclubs/offbit/apply', (req, res) => {
    res.render('forms/panclubsOffbitForm', { title: "Apply for Offbit" });
});


app.post('/collegeclub/panclubs/offbit/apply', upload.single('resume'), async (req, res) => {
    try {
        const { fullName, email, phone, department, role, year, projectLink } = req.body;
        let resumePath = '';

        if (req.file) {
            resumePath = req.file.path;
        }

        const formData = new PanclubsOffbitForm({
            fullName,
            email,
            phone,
            department,
            role,
            year,
            projectLink,
            resume: resumePath
        });

        await formData.save();

        res.render('thankyou/thankyouOffbit', { title: "Thank You!" }); // Render the Thank You page
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while processing your application.');
    }
});


// Offbit route............................................................. start





//....................................... Vihang route..............start 
app.get('/collegeclub/panclubs/vihang', (req, res) => {
    res.render('panclubs/vihang', { title: "Vihang Kalamandal" });
});

// Route for the "Apply Now" button for Vihang
app.get('/collegeclub/panclubs/vihang/apply', (req, res) => {
    res.render('forms/panclubsVihangForm', { title: "Apply for Vihang Kalamandal" });
});

// Vihang Club Application Form Submission
app.post('/collegeclub/panclubs/vihang/apply', upload.single('resume'), async (req, res) => {
    try {
        const { fullName, email, phone, department, role, year, projectLink } = req.body;
        let resumePath = '';

        if (req.file) {
            resumePath = req.file.path;
        }

        const formData = new PanclubsVihangForm({
            fullName,
            email,
            phone,
            department,
            role,
            year,
            projectLink,
            resume: resumePath
        });

        await formData.save();

        res.render('thankyou/thankyouVihang', { title: "Thank You!" }); // Render the Thank You page
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while processing your application.');
    }
});




//....................................... Vihang route..............end


// .......................................................CPMC route    start   ...........
app.get('/collegeclub/panclubs/cpmc', (req, res) => {
    res.render('panclubs/cpmc', { title: "CPMC" });
});

// Route for the "Apply Now" button for CPMC
app.get('/collegeclub/panclubs/cpmc/apply', (req, res) => {
    res.render('forms/panclubsCpmcForm', { title: "Apply for CPMC" });
});


app.post('/collegeclub/panclubs/cpmc/apply', upload.single('resume'), async (req, res) => {
    try {
        const { fullName, email, phone, department, role, year, projectLink } = req.body;
        let resumePath = '';

        if (req.file) {
            resumePath = req.file.path;
        }

        const formData = new PanclubsCpmcForm({
            fullName,
            email,
            phone,
            department,
            role,
            year,
            projectLink,
            resume: resumePath
        });

        await formData.save();

        res.render('thankyou/thankyouCpmc', { title: "Thank You!" }); // Render the Thank You page
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while processing your application.');
    }
});

// .......................................................CPMC route    end   ...........


// .......................................Abhivyakti route...............start

app.get('/collegeclub/panclubs/abhivyakti', (req, res) => {
    res.render('panclubs/abhivyakti', { title: "Abhivyakti" });
});

// Route for the "Apply Now" button for Abhivyakti
app.get('/collegeclub/panclubs/abhivyakti/apply', (req, res) => {
    res.render('forms/panclubsAbhivyaktiForm', { title: "Apply for Abhivyakti" });
});


app.post('/collegeclub/panclubs/abhivyakti/apply', upload.single('resume'), async (req, res) => {
    try {
        const { fullName, email, phone, department, role, year, projectLink } = req.body;
        let resumePath = '';

        if (req.file) {
            resumePath = req.file.path;
        }

        const formData = new PanclubsAbhivyaktiForm({
            fullName,
            email,
            phone,
            department,
            role,
            year,
            projectLink,
            resume: resumePath
        });

        await formData.save();

        res.render('thankyou/thankyouAbhivyakti', { title: "Thank You!" }); // Render the Thank You page
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while processing your application.');
    }
});


// .......................................Abhivyakti route...............end


// ..................................................NSS route...............START
app.get('/collegeclub/panclubs/nss', (req, res) => {
    res.render('panclubs/nss', { title: "NSS" });
});

// Route for the "Apply Now" button for NSS
app.get('/collegeclub/panclubs/nss/apply', (req, res) => {
    res.render('forms/panclubsNssForm', { title: "Apply for NSS" });
});

app.post('/collegeclub/panclubs/nss/apply', upload.single('resume'), async (req, res) => {
    try {
        const { fullName, email, phone, department, role, year, projectLink } = req.body;
        let resumePath = '';

        if (req.file) {
            resumePath = req.file.path;
        }

        const formData = new PanclubsNssForm({
            fullName,
            email,
            phone,
            department,
            role,
            year,
            projectLink,
            resume: resumePath
        });

        await formData.save();

        res.render('thankyou/thankyouNss', { title: "Thank You!" }); // Render the Thank You page
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while processing your application.');
    }
});


// ..................................................NSS route...............end


//......................................... Toastmasters route..................start
app.get('/collegeclub/panclubs/toastmaster', (req, res) => {
    res.render('panclubs/toastmaster', { title: "Toastmasters" });
});

// Route for the "Apply Now" button for Toastmasters
app.get('/collegeclub/panclubs/toastmaster/apply', (req, res) => {
    res.render('forms/panclubsToastmasterForm', { title: "Apply for Toastmasters" });
});




app.post('/collegeclub/panclubs/toastmaster/apply', upload.single('resume'), async (req, res) => {
    try {
        const { fullName, email, phone, department, role, year, projectLink } = req.body;
        let resumePath = '';

        if (req.file) {
            resumePath = req.file.path;
        }

        const formData = new PanclubsToastmasterForm({
            fullName,
            email,
            phone,
            department,
            role,
            year,
            projectLink,
            resume: resumePath
        });

        await formData.save();

        res.render('thankyou/thankyouToastmaster', { title: "Thank You!" }); // Render the Thank You page
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while processing your application.');
    }
});




//......................................... Toastmasters route..................end







app.use('/collegeclub', userRoutes);

// Google OAuth Routes
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/collegeclub/login'
}), (req, res) => {
    req.flash('success', 'Welcome back!');
    res.redirect('/');
});

// Catch-all Route for 404 Errors
app.all("*", (req, res, next) => {
    next(new ExpressError("Page Not Found", 404));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render("error", { message: err.message });
});

// Start the Server
app.listen(8080, () => {
    console.log(`Server is listening on port 8080`);
});
