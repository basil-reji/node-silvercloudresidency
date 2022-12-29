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
        let error = req.flash('error');
        res.render('pages/booking', {
            title: `Booking | ${app_name}`,
            user,
            facility,
            error,
            booking_page: true
        })
    }).catch((error) => {
        console.log(error);
        res.redirect('/booking')
    })

});

router.get('/confirm', function (req, res, next) {
    let user = req.user;
    let booking = req.session.booking;

    if (booking) {
        userHelper.getFacilities().then((response) => {
            let facilities = response;
            userHelper.getFacility(booking.facility).then((response) => {
                let facility = response;
                let total = facility.price * booking.duration * booking.facility_count;
                req.session.booking.total = total;
                req.session.booking.facility = facility;
                res.render('pages/booking_confirm', {
                    title: `Booking Confirm | ${app_name}`,
                    user,
                    facility,
                    facilities,
                    booking,
                    total,
                    booking_page: true
                })
            }).catch((error) => {
                console.log(error);
                req.redirect('/')
            })
        }).catch((error) => {
            console.log(error);
            req.redirect('/')
        })
    } else {
        res.redirect('/booking')
    }
});

router.post('/', function (req, res, next) {
    let user = req.user;
    if (user) {
        req.body.user = user.id;
    } else {
        req.body.user = null;
    }
    req.body.duration = functionHelper.getDateDifferece(req.body.checkin, req.body.checkout)
    if (req.body.duration == 0) {
        req.body.duration = 1;
    }
    // console.log(req.body);
    req.session.booking = req.body;
    res.redirect('/booking/confirm')
});

router.post('/confirm', function (req, res, next) {
    let user = req.user;
    let booking = {
        ...req.session.booking,
        ...req.body
    }
    // console.log(booking);
    userHelper.addBooking(booking).then((response) => {
        if(req.session){ req.session.destroy() }
        res.render('pages/confirmation', {
            title: `Confirmation | ${app_name}`,
            user,
            booking_page: true
        })
    })
    .catch((error) => {
        console.log(error);
        res.redirect('/booking');
    })
});

router.get('/confirmation', function (req, res, next) {
    let user = req.user;
    res.render('pages/confirmation', {
        title: `Confirmation | ${app_name}`,
        user,
        booking_page: true
    })
})

module.exports = router;