const db = require('../config/database');
const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');


module.exports = {

    updateAccount: (id, data) => {
        let user = {};
        user.fname = data.fname;
        user.sname = data.sname;
        if (data.phone.length > 5) {
            user.phone = data.phone;
        }
        return new Promise((resolve, reject) => {
            db.get()
                .collection(process.env.DB_COLLECTION_USER)
                .updateOne(
                    {
                        '_id': ObjectId(id)
                    },
                    {
                        $set: user,
                    }
                )
                .then((response) => {
                    // console.log(response)
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
        })
    },

    getAdmins: () => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(process.env.DB_COLLECTION_USER)
                .find(
                    {
                        'role': {
                            '$in': ['admin', 'super_admin']
                        }
                    },
                    {
                        projection: {
                            password: 0,
                            permission: 0,
                            events: 0,
                            flags: 0
                        }
                    }
                )
                .toArray()
                .then((response) => {
                    // console.log(response)
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
        })
    },

    getAdmin: (id) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(process.env.DB_COLLECTION_USER)
                .findOne(
                    {
                        '_id': ObjectId(id)
                    },
                    {
                        projection: {
                            password: 0,
                            permission: 0,
                            events: 0,
                            flags: 0
                        }
                    }
                )
                .then((response) => {
                    // console.log(response)
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
        })
    },

    updateAdmin: (id, data) => {
        let user = {};
        if (data.role == 'admin') {
            let model = db.models.admin;
            user.permission = model.permission;
            user.fname = data.fname;
            user.sname = data.sname;
            user.role = model.role;
        } else if (data.role == 'super_admin') {
            let model = db.models.super_admin;
            user.permission = model.permission;
            user.fname = data.fname;
            user.sname = data.sname;
            user.role = model.role
        } else {
            user = {}
        }
        return new Promise((resolve, reject) => {
            db.get()
                .collection(process.env.DB_COLLECTION_USER)
                .updateOne(
                    {
                        '_id': ObjectId(id)
                    },
                    {
                        $set: user,
                    }
                )
                .then((response) => {
                    // console.log(response)
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
        })
    },

    removeAdmin: (id) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(process.env.DB_COLLECTION_USER)
                .remove(
                    {
                        _id: ObjectId(id)
                    }
                )
                .then((response) => {
                    // console.log(response)
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
        })
    },

    getMessages: () => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(process.env.DB_COLLECTION_MESSAGE)
                .find()
                .toArray()
                .then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
        })
    },

    deleteMessage: (id) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(process.env.DB_COLLECTION_MESSAGE)
                .remove(
                    {
                        _id: ObjectId(id)
                    }
                )
                .then((response) => {
                    // console.log(response)
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
        })
    },
}

module.exports.facilities = {

    add: (info) => {
        return new Promise(async (resolve, reject) => {
            let facility = db.models.facility;
            facility.name = info.name
            facility.tag = info.tag
            facility.count = info.count
            facility.price = info.price
            facility.events.created = new Date()
            db.get()
                .collection(process.env.DB_COLLECTION_FACILITY)
                .insertOne(facility)
                .then((response) => {
                    resolve(response)
                }).catch((error) => {
                    reject(error)
                })
        })
    },

    getAll: () => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(process.env.DB_COLLECTION_FACILITY)
                .find()
                .toArray()
                .then((response) => {
                    // console.log(response)
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
        })
    },

    getOne: (tag) => {
        return new Promise((resolve, reject) => {
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

    updateOne: (id, data) => {
        new_data = {};
        new_data.name = data.name,
            new_data.price = data.price,
            new_data.count = data.count
        return new Promise((resolve, reject) => {
            db.get()
                .collection(process.env.DB_COLLECTION_FACILITY)
                .updateOne(
                    {
                        '_id': ObjectId(id)
                    },
                    {
                        $set: new_data,
                    }
                )
                .then((response) => {
                    // console.log(response)
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
        })
    },

    deleteOne: (id) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(process.env.DB_COLLECTION_FACILITY)
                .remove(
                    {
                        _id: ObjectId(id)
                    }
                )
                .then((response) => {
                    // console.log(response)
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
        })
    },
}

module.exports.records = {
    getAll: () => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(process.env.DB_COLLECTION_BOOKING)
                .find()
                .toArray()
                .then((response) => {
                    // console.log(response)
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
        })
    },

    getOne: (id) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(process.env.DB_COLLECTION_BOOKING)
                .findOne(
                    {
                        '_id': ObjectId(id)
                    }
                )
                .then((response) => {
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
        })
    },

    updateOne: (id, info) => {
        // new_data = {};
        // new_data.returned = true;
        // new_data.returned_date = new Date(data.returned_date);
        // console.log(new_data)
        return new Promise((resolve, reject) => {
            // console.log(id, data)
            db.get()
                .collection(process.env.DB_COLLECTION_BOOKING)
                .findOne(
                    {
                        '_id': ObjectId(id)
                    },
                    {
                        projection: {
                            _id: 0,
                        }
                    }

                )
                .then((data) => {
                    // console.log(info)
                    data.flags.booking = info.status;

                    if (data.flags.booking == 'cancelled' || data.flags.booking == 'rejected') {
                        data.status = false;
                        if (!data.flags.cancelled) {
                            data.flags.cancelled = true;
                            data.events.cancelled = new Date();
                        }
                    } else {
                        data.status = true;
                        data.flags.cancelled = false;
                        data.events.cancelled = '';
                        if (info.payment == '1') {
                            data.flags.booking = 'completed';
                            data.flags.contacted = true
                            data.flags.payment = true;
                            data.events.payment = new Date()
                            data.events.confirmed = new Date()
                        } else {
                            data.flags.payment = false;
                            if (data.flags.booking == 'completed') {
                                data.flags.booking = 'pending'
                            }
                        }

                        if (info.contacted == '1') {
                            data.flags.contacted = true;
                            data.events.contacted = new Date()
                        } else {
                            data.flags.contacted = false;
                        }
                    }

                    db.get()
                        .collection(process.env.DB_COLLECTION_BOOKING)
                        .updateOne(
                            {
                                '_id': ObjectId(id)
                            },
                            {
                                $set: data,
                            }
                        )
                        .then((response) => {
                            resolve(response);
                        }).catch((error) => {
                            reject(error);
                        })
                })
        })
    },

    deleteOne: (id) => {
        return new Promise((resolve, reject) => {
            db.get()
                .collection(process.env.DB_COLLECTION_BOOKING)
                .deleteOne(
                    {
                        _id: ObjectId(id)
                    }
                )
                .then((response) => {
                    // console.log(response)
                    resolve(response);
                }).catch((error) => {
                    reject(error);
                })
        })
    },
}