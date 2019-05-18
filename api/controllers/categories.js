"use strict";

const Categories = require("./../models/categories");

exports.all = (req, res, next) => {
            Categories.find()
            .then( categories => {
                res.json(categories);
            })
            .catch( err => {
                next(new Error(err));
            });
};

exports.validate = (req, res, next) => {

}

exports.post = (req, res, next) => {
    const category = req.body;
    new Categories(category).save(err=>{
               console.log(err);
    });
    
    res.json(category);
};

exports.get = (req, res, next) => {
};


exports.logout = (req, res, next) => { 
    
    
};

exports.login = (req, res, next) => { 

};

exports.put = (req, res, next) => {
    
};

exports.delete = (req, res, next) => { 
};