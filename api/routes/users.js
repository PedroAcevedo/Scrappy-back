"use strict";

const router = require("express").Router();
const controller = require("./../controllers/users");

router.route("/")
    .get(controller.validate,controller.all)
    .post(controller.post)
    .put(controller.validate,controller.put);

router.route("/login")
    .post(controller.login);

router.route("/:email")
    .get(controller.validate,controller.get);
    
router.route("/login/:email")
    .get(controller.email);

    
module.exports = router;