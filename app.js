require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const app = express();
const port = process.env.PORT || 4000;
const prisma = new PrismaClient();

const middlewareLogRequest = require("./src/middleware/logs.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middlewareLogRequest);

prisma.$connect()
    .then(() => {
        console.log("Database connected");
    }).catch((error) => {
        console.error(error);
        process.exit(1);
    })

app.get("/", (req, res) => {
    res.send("Here is the respond!");
})

require("./src/routes/post.route.js")(app) // posts route
require("./src/routes/message.route.js")(app) // messages route
require("./src/routes/booking.route.js")(app) // bookings route
require("./src/routes/user.route.js")(app) // users route

app.all("*", async (req, res) => {
    res.json({
        message: "Routes you're looking is not found"
    });
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Server up and running at http://localhost:${port}`);
});