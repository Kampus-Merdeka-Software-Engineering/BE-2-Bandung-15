require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

const userRoutes = require('./routes/users.js');
const middlewareLogRequest = require('./middleware/logs.js');
const upload = require('./middleware/multer.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(middlewareLogRequest);

app.use('/assets', express.static('public'));

app.use('/users', userRoutes);

app.use('/upload', upload.single('photo'), (req, res) => {
    res.json({
        message: 'Upload success'
    })
})

app.listen(PORT, () => {
    console.log(`Server up and running at http://localhost:${PORT}`);
});