"use strict";

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategoryModel = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    products : [Schema.Types.Mixed]
    
}, {
    timestamps: true
});

module.exports = mongoose.model('category', CategoryModel);