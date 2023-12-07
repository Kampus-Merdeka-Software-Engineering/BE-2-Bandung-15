require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

const middlewareLogRequest = require("./src/middleware/logs.js");
const upload = require("./src/middleware/multer.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(middlewareLogRequest);

app.use("/assets", express.static("public"));
app.use("/upload", upload.single("photo"), (req, res) => {
    res.json({
        message: "Upload success"
    })
});

// prisma.$connect()
//     .then(() => {
//         console.log("Database connected");
//     }).catch((error) => {
//         console.log(error);
//         process.exit(1);
//     })

app.get("/", (req, res) => {
    res.send("Here is the respond!");
})

require("./src/routes/post.route.js")(app) // posts route
require("./src/routes/message.route.js")(app) // messages route
require("./src/routes/booking.route.js")(app) // bookings route

app.all("*", async (req, res) => {
    res.json({
        message: "Routes you're looking is not found"
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server up and running at http://localhost:${PORT}`);
});