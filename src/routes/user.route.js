module.exports = function (app) {
    const users = require("../controllers/user.controller.js");
    const router = require("express").Router();

    router.get("/", users.getAllUsers);
    router.post("/", users.createUser);

    app.use("/api/users", router);
}