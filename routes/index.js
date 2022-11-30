var express = require('express');
var router = express.Router();
var userHelper = require('../helper/userHelper');

const app_name = process.env.APP_NAME

/* GET home page. */
router.get('/', async function (req, res, next) {
    let user = req.user
    // console.log(req.user);
    if (user && user.permission.admin) {
        res.redirect('/admin/')
    } else {
        res.render('index', {
            title: app_name,
            user,
            home_page: true
        });
    }
});

router.get('/contact', function (req, res, next) {
    let user = req.user;
    res.render('pages/contact', {
        title: `Contact | ${app_name}`,
        user,
        contact_page: true
    })
});

router.get('/booking', function (req, res, next) {
    let user = req.user;
    userHelper.getFacilities().then((response) => {
        let facility = response;
        // console.log(facility);
        
        res.render('pages/booking', {
            title: `Booking | ${app_name}`,
            user,
            facility,
            booking_page: true
        })
    }).catch((error) => {
        console.log(error);
        req.redirect('/')
    })
    
});

router.get('/gallery', function (req, res, next) {
    let user = req.user;
    res.render('pages/gallery', {
        title: `Gallery | ${app_name}`,
        user,
        gallery_page: true
    })
});

router.post('/contact', function (req, res, next) {
    let user = req.user;
    if (user) {
        req.body.user = user.id;
    } else {
        req.body.user = null;
    }
    userHelper.contact(req.body).then((response) => {
        res.send(
            {
                response: "acknowledged",
                status: true
            }
        );
    })
});

router.post('/booking', function (req, res, next) {
    let user = req.user;
    if (user) {
        req.body.user = user.id;
    } else {
        req.body.user = null;
    }
    console.log(req.body)
    res.redirect('/booking')
});




module.exports = router;
