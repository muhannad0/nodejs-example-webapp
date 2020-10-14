const express = require('express');
require('dotenv').config();
var mysql = require('mysql');

const port = process.env.SERVER_PORT || 3000;
const server_text = process.env.SERVER_TEXT || 'Hello World';
var db_config = {
  host : process.env.DB_ADDRESS,
  port : process.env.DB_PORT,
  database: process.env.DB_NAME,
  user : process.env.DB_USERNAME,
  password : process.env.DB_PASSWORD
}
var connection;
var db_conn_msg_fail = '<span style="color:red;">FAIL</span>';
var db_conn_msg_success = '<span style="color:green;">PASS</span>';

function reconnect(){
  console.log('Connecting to database');

	// Destroy existing connection since it cannot be re-used
  //if (connection) connection.destroy();
	connection = mysql.createConnection(db_config);

  connection.connect((err) => {
    if (err) {
      console.log('Error connecting to database: ' + err.code);
      setTimeout(reconnect, 2000);
    } else {
			console.log('Connected to database');
			//return connection;
    }
  });

	// Handle server disconnect
	connection.on('error', (err) => {
		console.log('Error connecting to database: ' + err.code);
		if (err.code === 'PROTOCOL_CONNECTION_LOST'){
			reconnect();
		} else {
			throw err;
		}
	});
}

// Attempt connection
reconnect()

const app = express();
app.set('view engine', 'pug');
app.set('views', __dirname);
app.get('/', (req, res) => {
	var db_conn_status = (connection['state'] === 'connected' || connection['state'] === 'authenticated') ? db_conn_msg_success : db_conn_msg_fail;
  res.render('index', { heading: server_text, db_conn_status: db_conn_status });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
