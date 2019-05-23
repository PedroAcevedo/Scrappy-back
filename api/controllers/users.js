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
            res.json({"mensaje": err});
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


exports.list = (req, res, next) => {
    const id =  req.params.email;
    User.findOne({ '_id': id }, 'lists' , function (err, user) {
        const lists = user.lists;
        if(user!=null){
            if(user.lists != null){
                res.json(lists[lists[lists.length - 1]]);   
            }else{
                res.json({});    
            }
        }else{
            res.json({'status':'NONE'});
        }
    })
};

exports.addlist = (req, res, next) => { 
    const list_new = req.body;    
    const id = req.params.id;
    User.findOne({ '_id': id }, "lists" , function (err, user) {
        const lists = user.lists;
        var months = new Array(
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre"
            );
            var fecha_actual = new Date();
        if(lists.length > 0){
            lists[lists.length - 1]["products"].push(list_new);
            lists[lists.length - 1]["date"] = fecha_actual.getDate() +
                  " de " +
                  months[fecha_actual.getMonth()] +
                  " del " +
                  fecha_actual.getFullYear();
        }else{
            lists.push({
                "products" : [],
                "date":  fecha_actual.getDate() +
                  " de " +
                  months[fecha_actual.getMonth()] +
                  " del " +
                  fecha_actual.getFullYear()
            })
            lists[0]["products"].push(list_new);
        }
        User.updateOne({ "_id": id }, { "lists": lists }, function (err) {
            if(err){
                console.log(err);
            }
            res.json({"status": "OK"});
        });
    });
    
};

exports.removelist = (req, res, next) => { 
    const list_remove = req.headers["product"];;    
    const id = req.params.id;
    User.findOne({ '_id': id }, "lists" , function (err, user) {
        const lists = user.lists;
        if(lists != null){
        for(var i = lists[lists.length - 1]["products"].length - 1; i > 0; i--) {
            if( lists[lists.length - 1]["products"][i]["name"] === list_remove) {
               lists[lists.length - 1]["products"].splice(i, 1);
            }
        }
        User.updateOne({ "_id": id }, { "lists": lists }, function (err) {
            if(err){
                console.log(err);
            }
            res.json({"status": "OK"});
        });
        }else{
              res.json({"status": "NOOK"});
        }
    });
};



exports.getlist  = (req, res, next) => { 
    const id = req.params.id;
    User.findOne({ '_id': id }, "lists" , function (err, user) {
        if(user.lists){
            res.json(user.lists[user.lists.length - 1]);   
        }else{
            res.json({})
        }
    })
};

exports.historical = (req, res, next) => { 
    const id = req.params.id;
    User.findOne({ '_id': id }, "lists" , function (err, user) {
        res.json(user.lists);
    })
};





