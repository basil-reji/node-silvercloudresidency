const { response } = require('express');
var express = require('express');
var router = express.Router();
var admin = require('../helper/adminHelper');

const app_name = process.env.APP_NAME

const isAdmin = (req, res, next) => {
    try {
        if (req.user.permission.admin) {
            next();
        } else {
            res.redirect('/login');
        }
    } catch {
        res.redirect('/login');
    }
}

const haveFullControll = (req, res, next) => {
    if (req.user.permission.full_control) {
        next();
    } else {
        res.redirect('/');
    }
}

router.get('/', isAdmin, function (req, res, next) {
    let user = req.user
    res.render('admin/dashboard', {
        title: app_name,
        page_title: 'Dashboard',
        breadcrumbs: [
            {
                page_name: 'Dashboard',
                active: true,
            }
        ],
        dashboard_page: true,
        user
    });
});

router.get('/messages', isAdmin, function (req, res, next) {
    let user = req.user;
    admin.getMessages().then((data) => {
        // console.log(data)
        res.render('admin/messages', {
            title: app_name,
            page_title: 'Contacts',
            breadcrumbs: [
                {
                    page_name: 'Messages',
                    active: true,
                }
            ],
            messages_page: true,
            user,
            data
        });
    })
});

router.post('/messages/delete', isAdmin, function (req, res, next) {
    let user = req.user
    admin.deleteMessage(req.body.id).then((response) => {
        res.send(
            {
                response: "acknowledged",
                status: true
            }
        );
    })
});

router.get('/admins', isAdmin, haveFullControll, function (req, res, next) {
    let user = req.user
    admin.getAdmins().then((admins) => {
        // console.log(response);
        res.render('admin/admins', {
            title: app_name,
            page_title: 'Admins',
            breadcrumbs: [
                {
                    page_name: 'Admins',
                    active: true,
                }
            ],
            admins_page: true,
            user,
            admins
        });
    })
});

router.get('/admins/:id', isAdmin, haveFullControll, function (req, res, next) {
    let user = req.user
    admin.getAdmin(req.params.id)
        .then((admin) => {
            // console.log(response);
            res.render('admin/admins/edit_admin', {
                title: app_name,
                page_title: 'Admins',
                breadcrumbs: [
                    {
                        page_name: 'Admins',
                        page_link: '/admins'
                    },
                    {
                        page_name: 'Edit Admin',
                        active: true,
                    }
                ],
                admins_page: true,
                user,
                admin
            });
        })
});

router.post('/admins/update/:id', isAdmin, haveFullControll, function (req, res, next) {
    // console.log(req.params.id);
    // console.log(req.body)
    let user = req.user
    admin.updateAdmin(req.params.id, req.body)
        .then((response) => {
            // console.log(response);
            res.redirect('/admin/admins/')
        })
});

router.post('/admins/remove/', isAdmin, haveFullControll, function (req, res, next) {
    let user = req.user
    admin.removeAdmin(req.body.id).then((response) => {
        res.send(
            {
                response: "ok",
                status: true
            }
        );
    })
});

router.get('/add-admin', function (req, res, next) {
    let user = req.user
    res.render('admin/admins/add_admin', {
        title: app_name,
        page_title: 'Admins',
        breadcrumbs: [
            {
                page_name: 'Admins',
                page_link: '/admins'
            },
            {
                page_name: 'Add Admin',
                active: true,
            }
        ],
        admins_page: true,
        user
    });
});

router.get('/account', isAdmin, function (req, res, next) {
    let user = req.user
    res.render('admin/account', {
        title: app_name,
        page_title: 'My Account',
        breadcrumbs: [
            {
                page_name: 'account',
                active: true,
            }
        ],
        admin_page: true,
        user
    });
});

router.post('/account/update', isAdmin, function (req, res, next) {
    let user = req.user
    // console.log(req.body)
    admin.updateAccount(user._id, req.body)
    .then((response) => {
        res.send({
            status: true,
            message: 'ok'
        })
    })
});

module.exports = router;
