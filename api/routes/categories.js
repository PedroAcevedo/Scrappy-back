"use strict";

const router = require("express").Router();
const controller = require("./../controllers/categories");

router.route("/")
    .get(controller.all)
    .post(controller.post);
module.exports = router;