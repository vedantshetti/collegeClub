const express = require("express");
const passport = require("passport");
const User = require("../models/user");
const router = express.Router();

// Logout Route (POST)

router.post('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'You have successfully logged out.');
        res.redirect('/'); // Redirect to the home page
    });
});


router.get('/signup', (req, res) => {
    res.render('users/signup', { title: 'Sign Up' });
});




// Signup Route (GET)
router.post('/signup', async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        
        req.login(registeredUser, err => {
            if (err) {
                console.log('Error during login after signup:', err);
                return next(err);
            }
            req.flash('success', 'Welcome to College Club!');
            res.redirect('/');
        });
    } catch (e) {
        console.log('Error during signup:', e.message);
        req.flash('error', e.message);
        res.redirect('/collegeclub/signup');
    }
});

router.post("/login", passport.authenticate("local", {
    failureRedirect: "/collegeclub/login",
    failureFlash: true,
}), (req, res) => {
    req.flash("success", "Welcome back!");
    res.redirect("/");
});

// Login Route (GET)
router.get("/login", (req, res) => {
    res.render("users/login", { title: "Log In" });
});







module.exports = router;
