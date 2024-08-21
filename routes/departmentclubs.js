const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload'); // Adjust path as necessary
const { isLoggedIn } = require('../middleware/auth'); // Adjust path as necessary
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

// Computer Department Clubs
router.get('/collegeclub/departmentclubs/computer/aces', isLoggedIn, (req, res) => {
    res.render('departmentclubs/computerAces', { title: "ACES" });
});

router.get('/collegeclub/departmentclubs/computer/aces/apply', isLoggedIn, (req, res) => {
    res.render('forms/aces', { title: "ACSE" });
});

router.post('/collegeclub/departmentclubs/computer/aces/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
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

router.get('/collegeclub/departmentclubs/computer/acm', isLoggedIn, (req, res) => {
    res.render('departmentclubs/computerAcm', { title: "ACM" });
});

router.get('/collegeclub/departmentclubs/computer/acm/apply', isLoggedIn, (req, res) => {
    res.render('forms/acm', { title: "ACM" });
});

router.post('/collegeclub/departmentclubs/computer/acm/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
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
router.get('/collegeclub/departmentclubs/aids/s4ds', isLoggedIn, (req, res) => {
    res.render('departmentclubs/aidsS4ds', { title: "S4DS" });
});

router.get('/collegeclub/departmentclubs/aids/s4ds/apply', isLoggedIn, (req, res) => {
    res.render('forms/s4ds', { title: "S4DS" });
});

router.post('/collegeclub/departmentclubs/aids/s4ds/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
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

router.get('/collegeclub/departmentclubs/aids/isa', isLoggedIn, (req, res) => {
    res.render('departmentclubs/aidsIsa', { title: "ISA" });
});

router.get('/collegeclub/departmentclubs/aids/isa/apply', isLoggedIn, (req, res) => {
    res.render('forms/isa', { title: "ISA" });
});

router.post('/collegeclub/departmentclubs/aids/isa/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
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
router.get('/collegeclub/departmentclubs/entc/enticers', isLoggedIn, (req, res) => {
    res.render('departmentclubs/entcEnticers', { title: "ENTICERS" });
});

router.get('/collegeclub/departmentclubs/entc/enticers/apply', isLoggedIn, (req, res) => {
    res.render('forms/enticers', { title: "ENTICERS" });
});

router.post('/collegeclub/departmentclubs/entc/enticers/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
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

router.get('/collegeclub/departmentclubs/entc/iete', isLoggedIn, (req, res) => {
    res.render('departmentclubs/entcIete', { title: "IETE" });
});

router.get('/collegeclub/departmentclubs/entc/iete/apply', isLoggedIn, (req, res) => {
    res.render('forms/iete', { title: "IETE" });
});

router.post('/collegeclub/departmentclubs/entc/iete/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
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
router.get('/collegeclub/departmentclubs/it/itesa', isLoggedIn, (req, res) => {
    res.render('departmentclubs/itItesa', { title: "ITESA" });
});

router.get('/collegeclub/departmentclubs/it/itesa/apply', isLoggedIn, (req, res) => {
        res.render('forms/itesa', { title: "ITESA" });
    });
    
    router.post('/collegeclub/departmentclubs/it/itesa/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
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
    router.get('/collegeclub/departmentclubs/mechanical/mesa', isLoggedIn, (req, res) => {
        res.render('departmentclubs/mechanicalMesa', { title: "MESA" });
    });
    
    router.get('/collegeclub/departmentclubs/mechanical/mesa/apply', isLoggedIn, (req, res) => {
        res.render('forms/mesa', { title: "MESA" });
    });
    
    router.post('/collegeclub/departmentclubs/mechanical/mesa/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
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
    
    // Civil Department Clubs
    router.get('/collegeclub/departmentclubs/civil/prediators', isLoggedIn, (req, res) => {
        res.render('departmentclubs/civilPrediators', { title: "PREDIATORS" });
    });
    
    router.get('/collegeclub/departmentclubs/civil/prediators/apply', isLoggedIn, (req, res) => {
        res.render('forms/prediators', { title: "PREDIATORS" });
    });
    
    router.post('/collegeclub/departmentclubs/civil/prediators/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
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
    
    // General Clubs
    router.get('/collegeclub/departmentclubs/general/cesa', isLoggedIn, (req, res) => {
        res.render('departmentclubs/generalCesa', { title: "CESA" });
    });
    
    router.get('/collegeclub/departmentclubs/general/cesa/apply', isLoggedIn, (req, res) => {
        res.render('forms/cesa', { title: "CESA" });
    });
    
    router.post('/collegeclub/departmentclubs/general/cesa/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
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
    
    router.get('/collegeclub/departmentclubs/general/igs', isLoggedIn, (req, res) => {
        res.render('departmentclubs/generalIgs', { title: "IGS" });
    });
    
    router.get('/collegeclub/departmentclubs/general/igs/apply', isLoggedIn, (req, res) => {
        res.render('forms/igs', { title: "IGS" });
    });
    
    router.post('/collegeclub/departmentclubs/general/igs/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
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
    
    router.get('/collegeclub/departmentclubs/general/saie', isLoggedIn, (req, res) => {
        res.render('departmentclubs/generalSaie', { title: "SAIE" });
    });
    
    router.get('/collegeclub/departmentclubs/general/saie/apply', isLoggedIn, (req, res) => {
        res.render('forms/saie', { title: "SAIE" });
    });
    
    router.post('/collegeclub/departmentclubs/general/saie/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
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
    
    router.get('/collegeclub/departmentclubs/general/sara', isLoggedIn, (req, res) => {
        res.render('departmentclubs/generalSara', { title: "SARA" });
    });
    
    router.get('/collegeclub/departmentclubs/general/sara/apply', isLoggedIn, (req, res) => {
        res.render('forms/sara', { title: "SARA" });
    });
    
    router.post('/collegeclub/departmentclubs/general/sara/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
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
    