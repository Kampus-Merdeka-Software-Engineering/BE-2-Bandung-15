const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

const userRoutes = require('./routes/users.js');
const middlewareLogRequest = require('./middleware/logs.js');

const dbPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '201201',
  database: 'express_mysql',
});

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(middlewareLogRequest);

app.use('/users', userRoutes);

app.use('/', (req, res) => {
  dbPool.execute('SELECT * FROM users', (err, rows) => {
    if (err) {
      res.json({
        message: 'Connection failed'
      })
    }
    res.json({
      message: 'Connection success',
      data: rows,
    })
  });
})

app.listen(port, () => {
    console.log(`Server up and running at http://localhost:${port}`);
});