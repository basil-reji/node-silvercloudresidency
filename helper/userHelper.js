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
            try{
                db.get()
                .collection(process.env.DB_COLLECTION_FACILITY)
                .find()
                .toArray()
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            } catch(error) {
                console.log(error)
                resolve('')
            }
        })
    },

    addBooking: (info) => {
        return new Promise(async (resolve, reject) => {
            data = db.models.booking;
            data.events.booking = new Date();
            data.checkin = new Date(info.checkin);
            data.checkout = new Date(info.checkout);
            data.facility._id = info.facility._id;
            data.facility.name = info.facility.name;
            data.facility.tag = info.facility.tag;
            data.facility.price = parseInt(info.facility.price);
            data.facility.count = parseInt(info.facility_count);
            data.duration = parseInt(info.duration);
            data.childrens = parseInt(info.childrens);
            data.adults = parseInt(info.adults);
            data.grand_total = parseFloat(info.total);
            data.poc.name = info.name;
            data.poc.email = info.email;
            data.poc.phone = info.phone;
            data.poc.address = info.address;
            db.get()
                .collection(process.env.DB_COLLECTION_BOOKING)
                .insertOne(data)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
            // console.log(info);
            // resolve('')
        })
    },

    getFacility: (tag) => {
        return new Promise(async (resolve, reject) => {
            db.get()
                .collection(process.env.DB_COLLECTION_FACILITY)
                .findOne(
                    {
                        'tag': tag
                    }
                )
                .then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
        })
    },
}