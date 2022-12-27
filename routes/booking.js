var express = require('express');
var router = express.Router();
var userHelper = require('../helper/userHelper');
var functionHelper = require('../helper/functionHelper');

const app_name = process.env.APP_NAME

router.get('/', function (req, res, next) {
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
        // console.log(error);
        req.redirect('/')
    })

});

router.get('/confirm', function (req, res, next) {
    let user = req.user;
    let booking = req.session.booking;
    userHelper.getFacilities().then((response) => {
        let facilities = response;
        // userHelper.getFacility(booking.facility).then((response) => {
        //     let facility = response;
        //     let total = facility.price * booking.duration;
            
        // }).catch((error) => {
        //     console.log(error);
        //     req.redirect('/')
        // })
        res.render('pages/booking_confirm', {
            title: `Booking Confirm | ${app_name}`,
            user,
            facilities,
            booking,
            // total,
            booking_page: true
        })
    }).catch((error) => {
        console.log(error);
        req.redirect('/')
    })

});

router.post('/', function (req, res, next) {
    let user = req.user;
    if (user) {
        req.body.user = user.id;
    } else {
        req.body.user = null;
    }
    console.log(req.body);
    req.session.booking = req.body;
    res.redirect('/booking/confirm')
});

module.exports = router;