const express = require('express');
const router = express.Router();


const Aces = require('../models/aces'); // Adjust path as necessary
const Acm = require('../models/acm'); // Adjust path as necessary
const S4ds = require('../models/s4ds'); // Adjust path as necessary
const Isa = require('../models/isa'); // Adjust path as necessary
const Enticers = require('../models/enticers'); // Adjust path as necessary
const Iete = require('../models/iete'); // Adjust path as necessary
const Itesa = require('../models/itesa'); // Adjust path as necessary
const Mesa = require('../models/mesa'); // Adjust path as necessary
const Prediators = require('../models/prediators'); // Adjust path as necessary
const Cesa = require('../models/cesa'); // Adjust path as necessary
const Igs = require('../models/igs'); // Adjust path as necessary
const Saie = require('../models/saie'); // Adjust path as necessary
const Sara = require('../models/sara'); // Adjust path as necessary

const multer = require('multer');
const { storage } = require("../cloudConfig");
const upload = multer({ storage });


// Middleware to Check if User is Logged In
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You must be signed in first!');
    res.redirect('/collegeclub/login');
}




// Computer Department Clubs
router.get('/computer/aces', isLoggedIn, (req, res) => {
    res.render('departmentclubs/computerAces', { title: "ACES" });
});

router.get('/computer/aces/apply', isLoggedIn, (req, res) => {
    res.render('forms/aces', { title: "ACSE" });
});

router.post('/computer/aces/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
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
            department: 'Computer Science',
            role,
            year,
            projectLink,
            resume: resumePath
        });

        await formData.save();
        res.render('thankyou/thankyouAces', { title: "Thank You!" });
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).send('An error occurred while processing your application.');
        }
    }
});

router.get('/computer/acm', isLoggedIn, (req, res) => {
    res.render('departmentclubs/computerAcm', { title: "ACM" });
});

router.get('/computer/acm/apply', isLoggedIn, (req, res) => {
    res.render('forms/acm', { title: "ACM" });
});

router.post('/computer/acm/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
    try {
        const { fullName, email, phone, role, year, projectLink } = req.body;
        const resume = req.file ? req.file.filename : '';

        const newAcm = new Acm({
            fullName,
            email,
            phone,
            department: 'Computer Science',
            role,
            year,
            projectLink,
            resume
        });

        await newAcm.save();
        res.render('thankyou/thankyouAcm', { title: 'Thank You!' });
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).send('An error occurred while processing your application.');
        }
    }
});

// Aids Department Clubs
router.get('/aids/s4ds', isLoggedIn, (req, res) => {
    res.render('departmentclubs/aidsS4ds', { title: "S4DS" });
});

router.get('/aids/s4ds/apply', isLoggedIn, (req, res) => {
    res.render('forms/s4ds', { title: "S4DS" });
});

router.post('/aids/s4ds/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
    try {
        const { fullName, email, phone, role, year, projectLink } = req.body;
        const resume = req.file ? req.file.filename : '';

        const newS4ds = new S4ds({
            fullName,
            email,
            phone,
            department: 'Artificial Intelligence and Data Science',
            role,
            year,
            projectLink,
            resume
        });

        await newS4ds.save();
        res.render('thankyou/thankyouS4ds', { title: 'Thank You!' });
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).send('An error occurred while processing your application.');
        }
    }
});

router.get('/aids/isa', isLoggedIn, (req, res) => {
    res.render('departmentclubs/aidsIsa', { title: "ISA" });
});

router.get('/aids/isa/apply', isLoggedIn, (req, res) => {
    res.render('forms/isa', { title: "ISA" });
});

router.post('/aids/isa/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
    try {
        const { fullName, email, phone, role, year, projectLink } = req.body;
        const resume = req.file ? req.file.filename : '';

        const newIsa = new Isa({
            fullName,
            email,
            phone,
            department: 'Artificial Intelligence and Data Science',
            role,
            year,
            projectLink,
            resume
        });

        await newIsa.save();
        res.render('thankyou/thankyouIsa', { title: 'Thank You!' });
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).send('An error occurred while processing your application.');
        }
    }
});

// Entc Department Clubs
router.get('/entc/enticers', isLoggedIn, (req, res) => {
    res.render('departmentclubs/entcEnticers', { title: "ENTICERS" });
});

router.get('/entc/enticers/apply', isLoggedIn, (req, res) => {
    res.render('forms/enticers', { title: "ENTICERS" });
});

router.post('/entc/enticers/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
    try {
        const newApplication = new Enticers({
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            department: req.body.department,
            role: req.body.role,
            year: req.body.year,
            projectLink: req.body.projectLink,
            resume: req.file.path
        });

        await newApplication.save();
        res.render('thankyou/thankyouEnticers', { title: 'Thank You' });
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).send('An error occurred while processing your application.');
        }
    }
});

router.get('/entc/iete', isLoggedIn, (req, res) => {
    res.render('departmentclubs/entcIete', { title: "IETE" });
});

router.get('/entc/iete/apply', isLoggedIn, (req, res) => {
    res.render('forms/iete', { title: "IETE" });
});

router.post('/entc/iete/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
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
        if (!res.headersSent) {
            res.status(500).send('An error occurred while processing your application.');
        }
    }
});

// IT Department Clubs
router.get('/it/itesa', isLoggedIn, (req, res) => {
    res.render('departmentclubs/itItesa', { title: "ITESA" });
});

router.get('/it/itesa/apply', isLoggedIn, (req, res) => {
        res.render('forms/itesa', { title: "ITESA" });
    });
    
    router.post('/it/itesa/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
        try {
            const { fullName, email, phone, department, role, year, projectLink } = req.body;
            const resume = req.file ? req.file.filename : null;
    
            const itesaApplication = new Itesa({
                fullName,
                email,
                phone,
                department,
                role,
                year,
                projectLink,
                resume
            });
    
            await itesaApplication.save();
            res.render('thankyou/thankyouItesa', { title: 'Thank You for Applying to ITESA Club!' });
        } catch (error) {
            console.error('Error while submitting ITESA application:', error);
            if (!res.headersSent) {
                res.status(500).send('An error occurred while processing your application.');
            }
        }
    });
    
    // Mechanical Department Clubs
    router.get('/mechanical/mesa', isLoggedIn, (req, res) => {
        res.render('departmentclubs/mechanicalMesa', { title: "MESA" });
    });
    
    router.get('/mechanical/mesa/apply', isLoggedIn, (req, res) => {
        res.render('forms/mesa', { title: "MESA" });
    });
    
    router.post('/mechanical/mesa/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
        try {
            const { fullName, email, phone, department, role, year, projectLink } = req.body;
            const resume = req.file ? req.file.filename : null;
    
            const mesaApplication = new Mesa({
                fullName,
                email,
                phone,
                department,
                role,
                year,
                projectLink,
                resume
            });
    
            await mesaApplication.save();
            res.render('thankyou/thankyouMesa', { title: 'Thank You for Applying to MESA Club!' });
        } catch (error) {
            console.error('Error while submitting MESA application:', error);
            if (!res.headersSent) {
                res.status(500).send('An error occurred while processing your application.');
            }
        }
    });
    

    router.get('/mechanical/prediators', isLoggedIn, (req, res) => {
        res.render('departmentclubs/mechanicalPrediators', { title: "PREDIATORS" });
    });
    
    router.get('/mechanical/prediators/apply', isLoggedIn, (req, res) => {
        res.render('forms/prediators', { title: "PREDIATORS" });
    });
    
    router.post('/mechanical/prediators/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
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
            res.render('thankyou/thankyouPrediators', { title: 'Thank You for Applying to PREDIATORS Club!' });
        } catch (error) {
            console.error('Error while submitting PREDIATORS application:', error);
            if (!res.headersSent) {
                res.status(500).send('An error occurred while processing your application.');
            }
        }
    });
    
    // civil Clubs
    router.get('/civil/cesa', isLoggedIn, (req, res) => {
        res.render('departmentclubs/civilCesa', { title: "CESA" });
    });
    
    router.get('/civil/cesa/apply', isLoggedIn, (req, res) => {
        res.render('forms/cesa', { title: "CESA" });
    });
    
    router.post('/civil/cesa/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
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
            if (!res.headersSent) {
                res.status(500).send('An error occurred while processing your application.');
            }
        }
    });
    
    router.get('/civil/igs', isLoggedIn, (req, res) => {
        res.render('departmentclubs/civilIgs', { title: "IGS" });
    });
    
    router.get('/civil/igs/apply', isLoggedIn, (req, res) => {
        res.render('forms/igs', { title: "IGS" });
    });
    
    router.post('/civil/igs/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
        try {
            const { fullName, email, phone, department, role, year, projectLink } = req.body;
            const resume = req.file ? req.file.filename : null;
    
            const igsApplication = new Igs({
                fullName,
                email,
                phone,
                department,
                role,
                year,
                projectLink,
                resume
            });
    
            await igsApplication.save();
            res.render('thankyou/thankyouIgs', { title: 'Thank You for Applying to IGS Club!' });
        } catch (error) {
            console.error('Error while submitting IGS application:', error);
            if (!res.headersSent) {
                res.status(500).send('An error occurred while processing your application.');
            }
        }
    });
    
    router.get('/instrumentation/saie', isLoggedIn, (req, res) => {
        res.render('departmentclubs/instrumentationSaie', { title: "SAIE" });
    });
    
    router.get('/instrumentation/saie/apply', isLoggedIn, (req, res) => {
        res.render('forms/saie', { title: "SAIE" });
    });
    
    router.post('/instrumentation/saie/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
        try {
            const { fullName, email, phone, department, role, year, projectLink } = req.body;
            const resume = req.file ? req.file.filename : null;
    
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
            res.render('thankyou/thankyouSaie', { title: 'Thank You for Applying to SAIE Club!' });
        } catch (error) {
            console.error('Error while submitting SAIE application:', error);
            if (!res.headersSent) {
                res.status(500).send('An error occurred while processing your application.');
            }
        }
    });
    
    router.get('/robotics/sara', isLoggedIn, (req, res) => {
        res.render('departmentclubs/roboticsSara', { title: "SARA" });
    });
    
    router.get('/robotics/sara/apply', isLoggedIn, (req, res) => {
        res.render('forms/sara', { title: "SARA" });
    });
    
    router.post('/robotics/sara/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
        try {
            const { fullName, email, phone, department, role, year, projectLink } = req.body;
            const resume = req.file ? req.file.filename : null;
    
            const saraApplication = new Sara({
                fullName,
                email,
                phone,
                department,
                role,
                year,
                projectLink,
                resume
            });
    
            await saraApplication.save();
            res.render('thankyou/thankyouSara', { title: 'Thank You for Applying to SARA Club!' });
        } catch (error) {
            console.error('Error while submitting SARA application:', error);
            if (!res.headersSent) {
                res.status(500).send('An error occurred while processing your application.');
            }
        }
    });
    
    module.exports = router;
    