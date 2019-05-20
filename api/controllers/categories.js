"use strict";

const Categories = require("./../models/categories");
const User = require("./../models/users");
const jwt = require('jsonwebtoken');
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
    const token = req.headers["token"];
    jwt.verify(token,  'secret', { algorithm: 'HS384'}, function(err, decoded) {
        if(err){
            res.send({"mensaje": err});
        }else{
            next();   
        }
    });
};

exports.post = (req, res, next) => {
    const category = req.body;
    new Categories(category).save(err=>{
               console.log(err);
    });
    res.json(category);
};

exports.get = (req, res, next) => {
    
};

exports.put = (req, res, next) => {
    
};

exports.prods = (req, res, next) => {
    const id = req.params.idCategory;
     Categories.findOne({ '_id': id }, "products" , function (err, category) {
             res.json(category.products);
     })
};


exports.addprod = (req, res, next) => {
    const id = req.params.idCategory;
    const product = req.body;
    Categories.findOne({ '_id': id }, "products" , function (err, category) {
        const prods = category.products;
        prods.push(product);
         Categories.updateOne({ "_id": id }, { "products": prods }, function (err) {
         if(err){
            console.log(err);
        }
        res.json({"status": "OK"});
    });  
    })
};

exports.removeprod = (req, res, next) => {
    const id = req.params.idCategory;
    const product = req.body;
    Categories.findOne({ '_id': id }, "products" , function (err, category) {
        const prods = category.products;
        const new_prods =  prods.filter(function(prod){
            return prod.name != product.name;
        });
        Categories.updateOne({ "_id": id }, { "products": new_prods }, function (err) {
         if(err){
            console.log(err);
        }
        res.json({"status": "OK"});
    });  
    })
};


exports.delete = (req, res, next) => {
    const name = req.body["name"];
    Categories.deleteOne({ 'name': name }, function (err) {
        if(err){
            console.log(err);
        }
        res.json({"status": "OK"})
    });
};