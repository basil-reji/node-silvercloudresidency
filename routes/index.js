var express = require('express');
var router = express.Router();
var userHelper = require('../helper/userHelper');

const app_name = process.env.APP_NAME

const isAdmin = (req, res, next) => {
    let user = req.user;
    if (user){
        if (req.user.permission.admin) {
            res.redirect('/admin');
        } else {
            next();
        }
    }else{
        next();
    }   
}

/* GET home page. */
router.get('/', isAdmin, async function (req, res, next) {
    let user = req.user
    // console.log(req.user);
    userHelper.getFacilities().then((facilities) => {
        // console.log(facilities)
        res.render('index', {
            title: app_name,
            user,
            facilities,
            home_page: true
        });
    })
});

router.get('/contact', isAdmin, function (req, res, next) {
    let user = req.user;
    res.render('pages/contact', {
        title: `Contact | ${app_name}`,
        user,
        contact_page: true
    })
});

router.get('/gallery', isAdmin, function (req, res, next) {
    let user = req.user;
    res.render('pages/gallery', {
        title: `Gallery | ${app_name}`,
        user,
        gallery_page: true
    })
});

router.post('/contact', isAdmin, function (req, res, next) {
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

module.exports = router;