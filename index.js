require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;

const middlewareLogRequest = require('./middleware/logs.js');

const { messageRoutes } = require('./routes/message.routes.js');

const upload = require('./middleware/multer.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(middlewareLogRequest);

app.use('/assets', express.static('public'));

app.use('/upload', upload.single('photo'), (req, res) => {
    res.json({
        message: 'Upload success'
    });
});

// messages route
app.use('/messages', messageRoutes);

app.all('*', async (req, res) => {
    res.json({
        message: "Routes you're looking is not found"
    });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server up and running at http://localhost:${PORT}`);
});