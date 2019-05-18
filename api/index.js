"use strict";

const router = require("express").Router();

const categoriesRoutes = require("./routes/categories");
router.use("/categories", categoriesRoutes);

const usersRoutes = require("./routes/users");
router.use("/users", usersRoutes);

module.exports = router;