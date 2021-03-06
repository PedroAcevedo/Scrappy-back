"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserModel = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    profileImage: {
        type: String
    },
    lists: [Schema.Types.Mixed], 
    admin: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('user', UserModel);