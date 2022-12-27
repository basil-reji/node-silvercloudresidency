const db = require('../config/database');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');

module.exports = {
    contact: (data) => {
        return new Promise(async (resolve, reject) => {
            // console.log(data)
            delete data['']
            data.date = new Date()
            // resolve('')
            db.get()
                .collection(process.env.DB_COLLECTION_MESSAGE)
                .insertOne(data)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
        })
    },

    getFacilities: () => {
        return new Promise(async (resolve, reject) => {
            db.get()
                .collection(process.env.DB_COLLECTION_FACILITY)
                .find()
                .toArray()
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
        })
    },

    // getFacility: (tag) => {
    //     return new Promise((resolve, reject) => {
    //         db.get()
    //             .collection(process.env.DB_COLLECTION_FACILITY)
    //             .findOne(
    //                 {
    //                     'tag': tag
    //                 }
    //             )
    //             .then((response) => {
    //                 resolve(response);
    //             }).catch((error) => {
    //                 reject(error);
    //             })
    //     })
    // },

    bookFacility: (info) => {
        return new Promise(async (resolve, reject) => {
            data = db.models.booking;
            data.date = new Date()
            data.events.booking = new Date()
            data.checkin = new Date(info.checkin)
            data.checkout = new Date(info.checkout)
            data.facility = info.facility

            db.get()
                .collection(process.env.DB_COLLECTION_BOOKING)
                .insertOne(data)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
        })
    },
}