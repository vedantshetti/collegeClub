const express = require('express');
const router = express.Router();
const session = require('express-session');
const flash = require('connect-flash')
const User = require('../models/user'); // Adjust the path as needed
const Aces = require('../models/aces'); // Make sure the path is correct
const Acm = require('../models/acm'); // Make sure the path is correct
const Cesa = require('../models/cesa'); // Make sure the path is correct
const Enticers = require('../models/enticers'); // Import the Enticers model
const Iete = require('../models/iete'); // Import the Iete model
const Igs = require('../models/igs'); // Import the Iete model
const Isa = require('../models/isa'); // Import the Iete model
const Itesa = require('../models/itesa'); // Import the Iete model
const Mesa = require('../models/mesa'); // Import the Iete model
const Abhivyakti = require('../models/panclubsAbhivyaktiForm'); // Import the Iete model
const PanclubsCpmcForm = require('../models/panclubsCpmcForm'); // Import the PanclubsCpmcForm model
const PanclubsGdscForm = require('../models/panclubsGdscForm'); 
const PanclubsNssForm = require('../models/panclubsNssForm');
const PanclubsOffbitForm = require('../models/panclubsOffbitForm'); 
const PanclubsToastmasterForm = require('../models/panclubsToastmasterForm'); 
const PanclubsVihangForm = require('../models/panclubsVihangForm'); 
const Prediators = require('../models/prediators');
const S4DS = require('../models/s4ds'); // Import your S4DS model
const Saie = require('../models/saie'); // Import your S4DS model
const Sara = require('../models/sara'); // Adjust the path as necessaryconst Sara = require('../models/Sara'); // Adjust the path as necessary






// Route for User Management
router.get('/dashboard/user', async (req, res) => {
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            const users = await User.find({});
            res.render('admin/user', { 
                title: 'User Management', 
                userEmail, 
                users 
            });
        } else {
            res.status(403).send('Access Denied: You do not have permission to view this data.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching users.');
    }
});

router.post('/dashboard/users/delete/:id', async (req, res) => {
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            const { id } = req.params;
            await User.findByIdAndDelete(id);
            req.flash('success_msg', 'User has been successfully deleted.');
            res.redirect('/collegeclub/admin/dashboard/user');
        } else {
            req.flash('error_msg', 'Access Denied: You do not have permission to delete this user.');
            res.redirect('/collegeclub/admin/dashboard/user');
        }
    } catch (err) {
        console.error(err);
        req.flash('error_msg', 'An error occurred while deleting the user.');
        res.redirect('/collegeclub/admin/dashboard/user');
    }
});



// Route for ACES



// Route for ACES
// Route for User Management


router.get('/dashboard/aces', async (req, res) => {
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            const aces = await Aces.find({}); // Fetch ACES data
            res.render('admin/aces', { 
                title: 'ACES Management', 
                userEmail, // Pass the user's email
                aces // Pass ACES data to the view
            });
        } else {
            res.status(403).send('Access Denied: You do not have permission to view this data.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching ACES data.');
    }
});
router.get('/dashboard/aces/test', (req, res) => {
    res.send('Test route works!');
});


// DELETE Route to delete a specific entry

router.post('/dashboard/aces/delete/:id', async (req, res) => {
    console.log(`Received request to delete ID: ${req.params.id}`);
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            await Aces.findByIdAndDelete(req.params.id);
            console.log(`Deleted entry with ID: ${req.params.id}`);
            res.redirect('/collegeclub/admin/dashboard/aces');
        } else {
            res.status(403).send('Access Denied: You do not have permission to delete this data.');
        }
    } catch (err) {
        console.error('Error during deletion:', err);
        res.status(500).send('An error occurred while deleting the entry.');
    }
});



// Route for ACM
// Route for ACM
router.get('/dashboard/acm', async (req, res) => {
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            const acm = await Acm.find({}); // Fetch ACM data
            res.render('admin/acm', { 
                title: 'ACM Management', 
                userEmail, // Pass the user's email
                acm // Pass ACM data to the view
            });
        } else {
            res.status(403).send('Access Denied: You do not have permission to view this data.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching ACM data.');
    }
});

router.post('/dashboard/acm/delete/:id', async (req, res) => {
    console.log(`Received request to delete ID: ${req.params.id}`);
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            await Acm.findByIdAndDelete(req.params.id);
            console.log(`Deleted entry with ID: ${req.params.id}`);
            req.flash('success', 'Entry successfully deleted!');
            res.redirect('/collegeclub/admin/dashboard/acm');
        } else {
            res.status(403).send('Access Denied: You do not have permission to delete this data.');
        }
    } catch (err) {
        console.error('Error during deletion:', err);
        res.status(500).send('An error occurred while deleting the entry.');
    }
});


// Route for CESA

// Route for CESA
router.get('/dashboard/cesa', async (req, res) => {
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            const cesa = await Cesa.find({}); // Fetch CESA data
            res.render('admin/cesa', { 
                title: 'CESA Management', 
                userEmail, // Pass the user's email
                cesa // Pass CESA data to the view
            });
        } else {
            res.status(403).send('Access Denied: You do not have permission to view this data.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching CESA data.');
    }
});

router.post('/dashboard/cesa/delete/:id', async (req, res) => {
    console.log(`Received request to delete ID: ${req.params.id}`);
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            await Cesa.findByIdAndDelete(req.params.id);
            console.log(`Deleted entry with ID: ${req.params.id}`);
            req.flash('success', 'Entry successfully deleted!');
            res.redirect('/collegeclub/admin/dashboard/cesa');
        } else {
            res.status(403).send('Access Denied: You do not have permission to delete this data.');
        }
    } catch (err) {
        console.error('Error during deletion:', err);
        res.status(500).send('An error occurred while deleting the entry.');
    }
});

// Route for ENTICERS

// Route for ENTICERS
// Route for Enticers
router.get('/dashboard/enticers', async (req, res) => {
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            const enticers = await Enticers.find({}); // Fetch Enticers data
            res.render('admin/enticers', { 
                title: 'Enticers Management', 
                userEmail, // Pass the user's email
                enticers // Pass Enticers data to the view
            });
        } else {
            res.status(403).send('Access Denied: You do not have permission to view this data.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching Enticers data.');
    }
});

// Route for Deleting Enticers
router.post('/dashboard/enticers/delete/:id', async (req, res) => {
    console.log(`Received request to delete ID: ${req.params.id}`);
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            await Enticers.findByIdAndDelete(req.params.id);
            console.log(`Deleted entry with ID: ${req.params.id}`);
            req.flash('success', 'Entry successfully deleted!');
            res.redirect('/collegeclub/admin/dashboard/enticers');
        } else {
            res.status(403).send('Access Denied: You do not have permission to delete this data.');
        }
    } catch (err) {
        console.error('Error during deletion:', err);
        res.status(500).send('An error occurred while deleting the entry.');
    }
});



// Route for IETE
// Route for fetching IETE data
router.get('/dashboard/iete', async (req, res) => {
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            const iete = await Iete.find({}); // Fetch IETE data
            res.render('admin/iete', { 
                title: 'IETE Management', 
                userEmail, // Pass the user's email
                iete // Pass IETE data to the view
            });
        } else {
            res.status(403).send('Access Denied: You do not have permission to view this data.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching IETE data.');
    }
});

// Route for deleting IETE entries
router.post('/dashboard/iete/delete/:id', async (req, res) => {
    console.log(`Received request to delete ID: ${req.params.id}`);
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            await Iete.findByIdAndDelete(req.params.id);
            console.log(`Deleted entry with ID: ${req.params.id}`);
            req.flash('success', 'Entry successfully deleted!');
            res.redirect('/collegeclub/admin/dashboard/iete');
        } else {
            res.status(403).send('Access Denied: You do not have permission to delete this data.');
        }
    } catch (err) {
        console.error('Error during deletion:', err);
        res.status(500).send('An error occurred while deleting the entry.');
    }
});



// Route for IGS
// Route for fetching IGS data
router.get('/dashboard/igs', async (req, res) => {
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            const igs = await Igs.find({}); // Fetch IGS data
            res.render('admin/igs', { 
                title: 'IGS Management', 
                userEmail, // Pass the user's email
                igs // Pass IGS data to the view
            });
        } else {
            res.status(403).send('Access Denied: You do not have permission to view this data.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching IGS data.');
    }
});

// Route for deleting IGS entries
router.post('/dashboard/igs/delete/:id', async (req, res) => {
    console.log(`Received request to delete ID: ${req.params.id}`);
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            await Igs.findByIdAndDelete(req.params.id);
            console.log(`Deleted entry with ID: ${req.params.id}`);
            req.flash('success', 'Entry successfully deleted!');
            res.redirect('/collegeclub/admin/dashboard/igs');
        } else {
            res.status(403).send('Access Denied: You do not have permission to delete this data.');
        }
    } catch (err) {
        console.error('Error during deletion:', err);
        res.status(500).send('An error occurred while deleting the entry.');
    }
});


// Route for ISA
// Route for fetching ISA data
router.get('/dashboard/isa', async (req, res) => {
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            const isa = await Isa.find({}); // Fetch ISA data
            res.render('admin/isa', { 
                title: 'ISA Management', 
                userEmail, // Pass the user's email
                isa // Pass ISA data to the view
            });
        } else {
            res.status(403).send('Access Denied: You do not have permission to view this data.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching ISA data.');
    }
});

// Route for deleting ISA entries
router.post('/dashboard/isa/delete/:id', async (req, res) => {
    console.log(`Received request to delete ID: ${req.params.id}`);
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            await Isa.findByIdAndDelete(req.params.id);
            console.log(`Deleted entry with ID: ${req.params.id}`);
            req.flash('success', 'Entry successfully deleted!');
            res.redirect('/collegeclub/admin/dashboard/isa');
        } else {
            res.status(403).send('Access Denied: You do not have permission to delete this data.');
        }
    } catch (err) {
        console.error('Error during deletion:', err);
        res.status(500).send('An error occurred while deleting the entry.');
    }
});


// Route for ITESA
// Route for fetching ITESA data
router.get('/dashboard/itesa', async (req, res) => {
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            const itesa = await Itesa.find({}); // Fetch ITESA data
            res.render('admin/itesa', { 
                title: 'ITESA Management', 
                userEmail, // Pass the user's email
                itesa // Pass ITESA data to the view
            });
        } else {
            res.status(403).send('Access Denied: You do not have permission to view this data.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching ITESA data.');
    }
});

// Route for deleting ITESA entries
router.post('/dashboard/itesa/delete/:id', async (req, res) => {
    console.log(`Received request to delete ID: ${req.params.id}`);
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            await Itesa.findByIdAndDelete(req.params.id);
            console.log(`Deleted entry with ID: ${req.params.id}`);
            req.flash('success', 'Entry successfully deleted!');
            res.redirect('/collegeclub/admin/dashboard/itesa');
        } else {
            res.status(403).send('Access Denied: You do not have permission to delete this data.');
        }
    } catch (err) {
        console.error('Error during deletion:', err);
        res.status(500).send('An error occurred while deleting the entry.');
    }
});


// Route for MESA
// Route for fetching MESA data
router.get('/dashboard/mesa', async (req, res) => {
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            const mesa = await Mesa.find({}); // Fetch MESA data
            res.render('admin/mesa', { 
                title: 'MESA Management', 
                userEmail, // Pass the user's email
                mesa // Pass MESA data to the view
            });
        } else {
            res.status(403).send('Access Denied: You do not have permission to view this data.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching MESA data.');
    }
});

// Route for deleting MESA entries
router.post('/dashboard/mesa/delete/:id', async (req, res) => {
    console.log(`Received request to delete ID: ${req.params.id}`);
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            await Mesa.findByIdAndDelete(req.params.id);
            console.log(`Deleted entry with ID: ${req.params.id}`);
            req.flash('success', 'Entry successfully deleted!');
            res.redirect('/collegeclub/admin/dashboard/mesa');
        } else {
            res.status(403).send('Access Denied: You do not have permission to delete this data.');
        }
    } catch (err) {
        console.error('Error during deletion:', err);
        res.status(500).send('An error occurred while deleting the entry.');
    }
});


// Route for Abhivyakti
// Route for fetching ABHIVYAKTI data
router.get('/dashboard/abhivyakti', async (req, res) => {
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            const abhivyakti = await Abhivyakti.find({}); // Fetch ABHIVYAKTI data
            res.render('admin/abhivyakti', { 
                title: 'ABHIVYAKTI Management', 
                userEmail, // Pass the user's email
                abhivyakti // Pass ABHIVYAKTI data to the view
            });
        } else {
            res.status(403).send('Access Denied: You do not have permission to view this data.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching ABHIVYAKTI data.');
    }
});

// Route for deleting ABHIVYAKTI entries
router.post('/dashboard/abhivyakti/delete/:id', async (req, res) => {
    console.log(`Received request to delete ID: ${req.params.id}`);
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            await Abhivyakti.findByIdAndDelete(req.params.id);
            console.log(`Deleted entry with ID: ${req.params.id}`);
            req.flash('success', 'Entry successfully deleted!');
            res.redirect('/collegeclub/admin/dashboard/abhivyakti');
        } else {
            res.status(403).send('Access Denied: You do not have permission to delete this data.');
        }
    } catch (err) {
        console.error('Error during deletion:', err);
        res.status(500).send('An error occurred while deleting the entry.');
    }
});



// Route for CPMC
// Route for fetching CPMc data
router.get('/dashboard/cpmc', async (req, res) => {
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            const cpmc = await PanclubsCpmcForm.find({}); // Fetch CPMc data
            res.render('admin/cpmc', { 
                title: 'CPMC Management', 
                userEmail, // Pass the user's email
                cpmc // Pass CPMc data to the view
            });
        } else {
            res.status(403).send('Access Denied: You do not have permission to view this data.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching CPMc data.');
    }
});

// Route for deleting CPMc entries
router.post('/dashboard/cpmc/delete/:id', async (req, res) => {
    console.log(`Received request to delete ID: ${req.params.id}`);
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            await PanclubsCpmcForm.findByIdAndDelete(req.params.id);
            console.log(`Deleted entry with ID: ${req.params.id}`);
            req.flash('success', 'Entry successfully deleted!');
            res.redirect('/collegeclub/admin/dashboard/cpmc');
        } else {
            res.status(403).send('Access Denied: You do not have permission to delete this data.');
        }
    } catch (err) {
        console.error('Error during deletion:', err);
        res.status(500).send('An error occurred while deleting the entry.');
    }
});



// Route for GDSC
router.get('/dashboard/gdsc', async (req, res) => {
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            const gdsc = await PanclubsGdscForm.find({}); // Fetch GDSC data
            res.render('admin/gdsc', { 
                title: 'GDSC Management', 
                userEmail, // Pass the user's email
                gdsc // Pass GDSC data to the view
            });
        } else {
            res.status(403).send('Access Denied: You do not have permission to view this data.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching GDSC data.');
    }
});

// Route for deleting GDSC entries
router.post('/dashboard/gdsc/delete/:id', async (req, res) => {
    console.log(`Received request to delete ID: ${req.params.id}`);
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            await PanclubsGdscForm.findByIdAndDelete(req.params.id);
            console.log(`Deleted entry with ID: ${req.params.id}`);
            req.flash('success', 'Entry successfully deleted!');
            res.redirect('/collegeclub/admin/dashboard/gdsc');
        } else {
            res.status(403).send('Access Denied: You do not have permission to delete this data.');
        }
    } catch (err) {
        console.error('Error during deletion:', err);
        res.status(500).send('An error occurred while deleting the entry.');
    }
});


// Route for NSS
// Route for NSS
router.get('/dashboard/nss', async (req, res) => {
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            const nss = await PanclubsNssForm.find({}); // Fetch NSS data
            res.render('admin/nss', { 
                title: 'NSS Management', 
                userEmail, // Pass the user's email
                nss // Pass NSS data to the view
            });
        } else {
            res.status(403).send('Access Denied: You do not have permission to view this data.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching NSS data.');
    }
});

// Route for deleting NSS entries
router.post('/dashboard/nss/delete/:id', async (req, res) => {
    console.log(`Received request to delete ID: ${req.params.id}`);
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            await PanclubsNssForm.findByIdAndDelete(req.params.id);
            console.log(`Deleted entry with ID: ${req.params.id}`);
            req.flash('success', 'Entry successfully deleted!');
            res.redirect('/collegeclub/admin/dashboard/nss');
        } else {
            res.status(403).send('Access Denied: You do not have permission to delete this data.');
        }
    } catch (err) {
        console.error('Error during deletion:', err);
        res.status(500).send('An error occurred while deleting the entry.');
    }
});


// Route for Offbit

// Route for Offbit
router.get('/dashboard/offbit', async (req, res) => {
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            const offbit = await PanclubsOffbitForm.find({}); // Fetch Offbit data
            res.render('admin/offbit', { 
                title: 'Offbit Management', 
                userEmail, // Pass the user's email
                offbit // Pass Offbit data to the view
            });
        } else {
            res.status(403).send('Access Denied: You do not have permission to view this data.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching Offbit data.');
    }
});

// Route for deleting Offbit entries
router.post('/dashboard/offbit/delete/:id', async (req, res) => {
    console.log(`Received request to delete ID: ${req.params.id}`);
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            await PanclubsOffbitForm.findByIdAndDelete(req.params.id);
            console.log(`Deleted entry with ID: ${req.params.id}`);
            req.flash('success', 'Entry successfully deleted!');
            res.redirect('/collegeclub/admin/dashboard/offbit');
        } else {
            res.status(403).send('Access Denied: You do not have permission to delete this data.');
        }
    } catch (err) {
        console.error('Error during deletion:', err);
        res.status(500).send('An error occurred while deleting the entry.');
    }
});



// Route for Toastmaster

// Route for Toastmaster
router.get('/dashboard/toastmaster', async (req, res) => {
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            const toastmaster = await PanclubsToastmasterForm.find({}); // Fetch Toastmaster data
            res.render('admin/toastmaster', { 
                title: 'Toastmaster Management', 
                userEmail, // Pass the user's email
                toastmaster // Pass Toastmaster data to the view
            });
        } else {
            res.status(403).send('Access Denied: You do not have permission to view this data.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching Toastmaster data.');
    }
});

// Route for deleting Toastmaster entries
router.post('/dashboard/toastmaster/delete/:id', async (req, res) => {
    console.log(`Received request to delete ID: ${req.params.id}`);
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            await PanclubsToastmasterForm.findByIdAndDelete(req.params.id);
            console.log(`Deleted entry with ID: ${req.params.id}`);
            req.flash('success', 'Entry successfully deleted!');
            res.redirect('/collegeclub/admin/dashboard/toastmaster');
        } else {
            res.status(403).send('Access Denied: You do not have permission to delete this data.');
        }
    } catch (err) {
        console.error('Error during deletion:', err);
        res.status(500).send('An error occurred while deleting the entry.');
    }
});




// Route for Vihang
// Route for Vihang
router.get('/dashboard/vihang', async (req, res) => {
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            const vihang = await PanclubsVihangForm.find({}); // Fetch Vihang data
            res.render('admin/vihang', { 
                title: 'Vihang Management', 
                userEmail, // Pass the user's email
                vihang // Pass Vihang data to the view
            });
        } else {
            res.status(403).send('Access Denied: You do not have permission to view this data.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching Vihang data.');
    }
});

// Route for deleting Vihang entries
router.post('/dashboard/vihang/delete/:id', async (req, res) => {
    console.log(`Received request to delete ID: ${req.params.id}`);
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            await PanclubsVihangForm.findByIdAndDelete(req.params.id);
            console.log(`Deleted entry with ID: ${req.params.id}`);
            req.flash('success', 'Entry successfully deleted!');
            res.redirect('/collegeclub/admin/dashboard/vihang');
        } else {
            res.status(403).send('Access Denied: You do not have permission to delete this data.');
        }
    } catch (err) {
        console.error('Error during deletion:', err);
        res.status(500).send('An error occurred while deleting the entry.');
    }
});


// Route for Prediators
// Route for displaying Prediators data
router.get('/dashboard/prediators', async (req, res) => {
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            const prediators = await Prediators.find({}); // Fetch Prediators data
            res.render('admin/prediators', { 
                title: 'Prediators Management', 
                userEmail, // Pass the user's email
                prediators // Pass Prediators data to the view
            });
        } else {
            res.status(403).send('Access Denied: You do not have permission to view this data.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching Prediators data.');
    }
});

// Route for deleting Prediators entries
router.post('/dashboard/prediators/delete/:id', async (req, res) => {
    console.log(`Received request to delete ID: ${req.params.id}`);
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            await Prediators.findByIdAndDelete(req.params.id);
            console.log(`Deleted entry with ID: ${req.params.id}`);
            req.flash('success', 'Entry successfully deleted!');
            res.redirect('/collegeclub/admin/dashboard/prediators');
        } else {
            res.status(403).send('Access Denied: You do not have permission to delete this data.');
        }
    } catch (err) {
        console.error('Error during deletion:', err);
        res.status(500).send('An error occurred while deleting the entry.');
    }
});




// Route for S4DS
// Route for displaying S4DS data
router.get('/dashboard/s4ds', async (req, res) => {
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            const s4ds = await S4DS.find({}); // Fetch S4DS data
            res.render('admin/s4ds', { 
                title: 'S4DS Management', 
                userEmail, // Pass the user's email
                s4ds // Pass S4DS data to the view
            });
        } else {
            res.status(403).send('Access Denied: You do not have permission to view this data.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching S4DS data.');
    }
});

// Route for deleting S4DS entries
router.post('/dashboard/s4ds/delete/:id', async (req, res) => {
    console.log(`Received request to delete ID: ${req.params.id}`);
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            await S4DS.findByIdAndDelete(req.params.id);
            console.log(`Deleted entry with ID: ${req.params.id}`);
            req.flash('success', 'Entry successfully deleted!');
            res.redirect('/collegeclub/admin/dashboard/s4ds');
        } else {
            res.status(403).send('Access Denied: You do not have permission to delete this data.');
        }
    } catch (err) {
        console.error('Error during deletion:', err);
        res.status(500).send('An error occurred while deleting the entry.');
    }
});



// Route for SAIE
// Route for displaying SAIE data
router.get('/dashboard/saie', async (req, res) => {
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            const saie = await Saie.find({}); // Fetch SAIE data
            res.render('admin/saie', { 
                title: 'SAIE Management', 
                userEmail, // Pass the user's email
                saie // Pass SAIE data to the view
            });
        } else {
            res.status(403).send('Access Denied: You do not have permission to view this data.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching SAIE data.');
    }
});

// Route for deleting SAIE entries
router.post('/dashboard/saie/delete/:id', async (req, res) => {
    console.log(`Received request to delete ID: ${req.params.id}`);
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            await Saie.findByIdAndDelete(req.params.id);
            console.log(`Deleted entry with ID: ${req.params.id}`);
            req.flash('success', 'Entry successfully deleted!');
            res.redirect('/collegeclub/admin/dashboard/saie');
        } else {
            res.status(403).send('Access Denied: You do not have permission to delete this data.');
        }
    } catch (err) {
        console.error('Error during deletion:', err);
        res.status(500).send('An error occurred while deleting the entry.');
    }
});


// Route for SARA
// Route for displaying Sara data
router.get('/dashboard/sara', async (req, res) => {
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            const sara = await Sara.find({}); // Fetch Sara data
            res.render('admin/sara', { 
                title: 'Sara Management', 
                userEmail, // Pass the user's email
                sara // Pass Sara data to the view
            });
        } else {
            res.status(403).send('Access Denied: You do not have permission to view this data.');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred while fetching Sara data.');
    }
});

// Route for deleting Sara entries
router.post('/dashboard/sara/delete/:id', async (req, res) => {
    console.log(`Received request to delete ID: ${req.params.id}`);
    try {
        const userEmail = req.user ? req.user.email : null;

        if (userEmail === 'vedantshetti123456@gmail.com') {
            await Sara.findByIdAndDelete(req.params.id);
            console.log(`Deleted entry with ID: ${req.params.id}`);
            req.flash('success', 'Entry successfully deleted!');
            res.redirect('/collegeclub/admin/dashboard/sara');
        } else {
            res.status(403).send('Access Denied: You do not have permission to delete this data.');
        }
    } catch (err) {
        console.error('Error during deletion:', err);
        res.status(500).send('An error occurred while deleting the entry.');
    }
});


module.exports = router;
