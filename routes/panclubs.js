const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

// Ensure the path to app.js is correct

const PanclubsGdscForm = require('../models/panclubsGdscForm');
const PanclubsOffbitForm = require('../models/panclubsOffbitForm');
const PanclubsVihangForm= require('../models/panclubsVihangForm');
const PanclubsCpmcForm = require('../models/panclubsCpmcForm');
const PanclubsAbhivyaktiForm = require('../models/panclubsAbhivyaktiForm');
const PanclubsNssForm = require('../models/panclubsNssForm');
const PanclubsToastmasterForm = require('../models/panclubsToastmasterForm');



// Middleware to Check if User is Logged In
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You must be signed in first!');
    res.redirect('/collegeclub/login');
}



// GDSC route
router.get('/gdsc', isLoggedIn, (req, res) => {
    console.log('GDSC route accessed');
    res.render('panclubs/gdsc', { title: "GDSC" });
});

router.get('/gdsc/apply', isLoggedIn, (req, res) => {
    res.render('forms/panclubsGdscForm', { title: "Apply for GDSC" });
});

router.post('/gdsc/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
    try {
        const { fullName, email, phone, department, role, year, projectLink } = req.body;
        const resumePath = req.file ? req.file.path : '';
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
        res.render('thankyou/thankyouGdsc', { title: "Thank You!" });
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).send('An error occurred while processing your application.');
        }
    }
});

// Offbit route
router.get('/offbit', isLoggedIn, (req, res) => {
    res.render('panclubs/offbit', { title: "Offbit" });
});

router.get('/offbit/apply', isLoggedIn, (req, res) => {
    res.render('forms/panclubsOffbitForm', { title: "Apply for Offbit" });
});

router.post('/offbit/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
    try {
        const { fullName, email, phone, department, role, year, projectLink } = req.body;
        const resumePath = req.file ? req.file.path : '';
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
        res.render('thankyou/thankyouOffbit', { title: "Thank You!" });
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).send('An error occurred while processing your application.');
        }
    }
});

// Vihang route
router.get('/vihang', isLoggedIn, (req, res) => {
    res.render('panclubs/vihang', { title: "Vihang Kalamandal" });
});

router.get('/vihang/apply', isLoggedIn, (req, res) => {
    res.render('forms/panclubsVihangForm', { title: "Apply for Vihang Kalamandal" });
});

router.post('/vihang/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
    try {
        const { fullName, email, phone, department, role, year, projectLink } = req.body;
        const resumePath = req.file ? req.file.path : '';
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
        res.render('thankyou/thankyouVihang', { title: "Thank You!" });
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).send('An error occurred while processing your application.');
        }
    }
});

// CPMC route
router.get('/cpmc', isLoggedIn, (req, res) => {
    res.render('panclubs/cpmc', { title: "CPMC" });
});

router.get('/cpmc/apply', isLoggedIn, (req, res) => {
    res.render('forms/panclubsCpmcForm', { title: "Apply for CPMC" });
});

router.post('/cpmc/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
    try {
        const { fullName, email, phone, department, role, year, projectLink } = req.body;
        const resumePath = req.file ? req.file.path : '';
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
        res.render('thankyou/thankyouCpmc', { title: "Thank You!" });
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).send('An error occurred while processing your application.');
        }
    }
});

// Abhivyakti route
router.get('/abhivyakti', isLoggedIn, (req, res) => {
    res.render('panclubs/abhivyakti', { title: "Abhivyakti" });
});

router.get('/abhivyakti/apply', isLoggedIn, (req, res) => {
    res.render('forms/panclubsAbhivyaktiForm', { title: "Apply for Abhivyakti" });
});

router.post('/abhivyakti/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
    try {
        const { fullName, email, phone, department, role, year, projectLink } = req.body;
        const resumePath = req.file ? req.file.path : '';
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
        res.render('thankyou/thankyouAbhivyakti', { title: "Thank You!" });
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).send('An error occurred while processing your application.');
        }
    }
});

// NSS route
router.get('/nss', isLoggedIn, (req, res) => {
    res.render('panclubs/nss', { title: "NSS" });
});

router.get('/nss/apply', isLoggedIn, (req, res) => {
    res.render('forms/panclubsNssForm', { title: "Apply for NSS" });
});

router.post('/nss/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
    try {
        const { fullName, email, phone, department, role, year, projectLink } = req.body;
        const resumePath = req.file ? req.file.path : '';
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
        res.render('thankyou/thankyouNss', { title: "Thank You!" });
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).send('An error occurred while processing your application.');
        }
    }
});

// Toastmasters route
router.get('/toastmaster', isLoggedIn, (req, res) => {
    res.render('panclubs/toastmaster', { title: "Toastmasters" });
});

router.get('/toastmaster/apply', isLoggedIn, (req, res) => {
    res.render('forms/panclubsToastmasterForm', { title: "Apply for Toastmasters" });
});

router.post('/toastmaster/apply', upload.single('resume'), isLoggedIn, async (req, res) => {
    try {
        const { fullName, email, phone, department, role, year, projectLink } = req.body;
        const resumePath = req.file ? req.file.path : '';
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
        res.render('thankyou/thankyouToastmaster', { title: "Thank You!" });
    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            res.status(500).send('An error occurred while processing your application.');
        }
    }
});

module.exports = router;
