module.exports = function (app) {
    const messages = require("../controllers/message.controller.js");
    const router = require("express").Router();

    router.get("/", messages.getAllMessages);
    router.post("/", messages.createMessage);

    app.use("/api/messages", router);
}