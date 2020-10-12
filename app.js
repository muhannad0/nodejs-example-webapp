const express = require('express')
require('dotenv').config()

const port = process.env.SERVER_PORT || 3000
const server_text = process.env.SERVER_TEXT || 'Hello World'

var mysql = require('mysql')
var connection = mysql.createConnection({
  host : process.env.DB_ADDRESS,
  port : process.env.DB_PORT,
  database: process.env.DB_NAME,
  user : process.env.DB_USERNAME,
  password : process.env.DB_PASSWORD
})
var db_conn_status = 'pending'

connection.connect((err) => {
  if (err) {
    console.log('Error connecting to database: '+ err.code)
    //console.log(err.fatal)
    db_conn_status = 'FAIL'
    return
  }
  console.log('Connected to database')
  db_conn_status = 'PASS'	
})

const app = express()
app.set('view engine', 'pug')
app.set('views', __dirname)
app.get('/', (req, res) => {
  res.render('index', { heading: server_text, db_conn_status: db_conn_status })
})

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})
