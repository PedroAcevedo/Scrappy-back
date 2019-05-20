"use strict";

const router = require("express").Router();
const controller = require("./../controllers/categories");

router.route("/")
    .get(controller.all)
    .post(controller.validate,controller.post)
    .delete(controller.validate, controller.delete);

router.route("/:idCategory/products")
    .get(controller.prods)
    .post(controller.validate,controller.addprod)
    .delete(controller.validate, controller.removeprod);


module.exports = router;