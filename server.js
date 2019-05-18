'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/MyDB',()=>{
    console.log("Conectado a la base de datos")
});

const api = require("./api/");

var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use("/api", api);

const server = app.listen(process.env.PORT || 8080,()=>{
    console.log('Servidor iniciado');
});

