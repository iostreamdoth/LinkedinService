var ejs = require('ejs');
var mysql = require('mysql');
var requestqueue = require('./requestqueue');
var connectionpool = [];
var pushed = 0;
var popped = 0;
var poollength = 10;
var isconnectionpool = false;
function returnconnection(connection) {
	connectionpool.push(connection);
	console.log("Returning Connection")
	popped--;
	if (requestqueue.issomethinginqueue() == 1) {
		console.log("Something in queue")
		requestqueue.dequeue()
	}
}
function getConnection() {
	if (isconnectionpool == false) {
		popped--;
		var connection = mysql.createConnection({
			host : 'localhost',
			user : 'root',
			password : 'MySql',
			database : 'test',
			multipleStatements : true
		});

		return connection;
	} else {
		if (connectionpool.length == 0 && popped <= poollength) {
			var newConnection = mysql.createConnection({
				host : 'localhost',
				user : 'root',
				password : 'MySql',
				database : 'test',
				multipleStatements : true
			});
			// popped++;
			console.log("popped new Connection: " + popped);
			console.log("Connection pool length: " + connectionpool.length);
			return newConnection;
		} else {

			var newConnection = connectionpool.shift();
			// popped++;
			console.log("popped pool Connection: " + popped);
			console.log("Connection pool length: " + connectionpool.length);
			return newConnection;
		}
	}
}

function fetchdata(callback, sqlQuery) {

	console.log("\nSQL Query::" + sqlQuery);

	var connection = getConnection();
	if (isconnectionpool == false) {
		connection.connect();
	}
	connection.query(sqlQuery, function(err, rows, fields) {
		// console.log("\nConnection done..");
		// connection.end();
		returnconnection(connection);

		if (err) {
			console.log("ERROR: " + err.message);
		} else { // return err or result
			// console.log("DB Results:" + rows);
			callback(err, rows);
		}
		if (isconnectionpool == false) {
			connection.end()
		}
		;
	});

}
function shallwequeue() {
	if (popped < poollength) {
		console.log("NO");
		return 0;
	} else {
		console.log("Yes");
		return 1;
	}
}

function popconnection() {
	popped++;
}
exports.returnconnection = returnconnection;
exports.popconnection = popconnection;
exports.fetchdata = fetchdata;
exports.shallwequeue = shallwequeue;