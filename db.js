const mysql = require('mysql');

const connection = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'projekt-jul'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
    return connection;
});

module.exports = connection;