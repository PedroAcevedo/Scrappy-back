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
            res.send({"mensaje": err});
        }else{
            next();   
        }
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
    const email = req.params.email;
    User.findOne({ 'email': email }, function (err, user) {
        res.json(user);
    });
};


exports.logout = (req, res, next) => { 
    
};

exports.email = (req, res, next) => {
    const email = req.params.email;
    User.findOne({ 'email': email },'email', function (err, user) {
        res.json(user);
    });
};


exports.login = (req, res, next) => { 
    const user2 = req.body;
    const email = user2["email"];
    const password = user2["password"];
    User.findOne({ 'email': email }, ['password','admin'] , function (err, user) {
        if(user==null){
            res.json({"login": false});
        }else{
            bcrypt.compare(password, user.password, function(err, resu) {
                if(resu==true){
                    if(user.admin==true){
                        res.json({"login" : true, "token" : jwt.sign({ 'email': email }, 'secret', { algorithm: 'HS384'}, { expiresIn: 60 * 60 }), "admin": true}); 
                    }else{
                        res.json({"login" : true, "token" : jwt.sign({ 'email': email },'shhhhh'),"admin": false});       /*By default HMAC SHA256*/     
                    }
                }else{
                    res.json({"login" : false})
                }
            });
        }
    });
    
};

exports.put = (req, res, next) => {
    const updates = req.body;
    const email = updates["email"];
    User.updateOne({ 'email': email }, { 'name': updates["name"], 'profileImage':updates["profileImage"], 'address': updates["address"] }, function (err, user) {
        if(err){
            console.log(err);
        }
    });
    res.json({"update": "OK"});
};

exports.delete = (req, res, next) => {
    User.deleteMany({ 'email': 'vacilalorumbero' }, function (err) {
        if(err){
            console.log(err)
        }
        res.json({"You":"Are a devil"});
    });
};