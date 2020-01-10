// Import modules and exports
const express = require('express');
const logger = require("morgan");
const errorhandler = require("errorhandler");
const bodyParser = require("body-parser");
const path = require('path');
const db = require('./db');

// Use express app and router
const app = express();
const router = express.Router();

// Setup middleware
app.use('/', router);
app.use(express.static(__dirname + '/public/'));
app.use(bodyParser.json({
    extended: false
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use(errorhandler());

// Routes
app.get('/', function(req, res) {
    res.status(200).sendFile(path.join(__dirname+'/index.html'));
});
app.get('/generate', function(req, res) {
	db.query('SELECT * FROM `julklappar`', (err, result) => {
        if (err) throw err;
        res.status(200).send(result);
    });
});
app.post('/add', function(req, res) {
	var namn = req.body['namn'];
	var url = req.body['url'];
	var bild = req.body['bild'];
	db.query('INSERT INTO `julklappar` (`namn`, `url`, `bild`) VALUES (?, ?, ?);', [namn, url, bild], (err, result) => {
		if (err) throw err;
		res.sendStatus(201);
	});
})

// Start the server
var port = 4100;
var server = app.listen(port, () => console.log("projekt-jul listening on " + port));

// Server shutdown, called by entering Ctrl+C
process.on('SIGINT', function() {
	process.stdout.write('\x1b[34m'+'\nSIGINT received, shutting down...');
	process.stdout.write('\x1b[33m'+'\nClosing MySQL connection to db... ');
	db.end();
	process.stdout.write('\x1b[32m'+'Done!\n'+'\x1b[0m');
	server.close();
	console.log('Shutdown complete.');
});