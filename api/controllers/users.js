"use strict";

const User = require("./../models/users");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.all = (req, res, next) => {
            User.find()
            .then( users => {
                res.json(users);
            })
            .catch( err => {
                next(new Error(err));
            });
};

exports.validate = (req, res, next) => {
    const token = req.headers["token"];
    jwt.verify(token, 'shhhhh', function(err, decoded) {
        if(err){
            res.send({"mensaje": err})
        }
        next();
    });
}

exports.post = (req, res, next) => {
    const user = req.body;
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(user["password"], salt, function(err, hash) {
            user["password"] = hash;
            new User(user).save(err=>{
               console.log(err);
            });
            res.json(user);
     });
    });
};

exports.get = (req, res, next) => {
};


exports.logout = (req, res, next) => { 
    
    
};

exports.login = (req, res, next) => { 
    const user2 = req.body;
    const email = user2["email"];
    const password = user2["password"];
    
    User.findOne({ 'email': email }, 'password', function (err, user) {
        bcrypt.compare(password, user.password, function(err, resu) {
            res.json({"token" : jwt.sign({ 'email': email },'shhhhh')});
        });
    });
    
};

exports.put = (req, res, next) => {
    
};

exports.delete = (req, res, next) => { 
};