const express = require('express')
require('dotenv').config()

const port = process.env.SERVER_PORT || 3000
const server_text = process.env.SERVER_TEXT || 'Hello World'

const app = express()
app.set('view engine', 'pug')
app.set('views', __dirname)
app.get('/', (req, res) => {
  // res.send('Hello World')
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting: ' + err.stack)
      //return
      res.render('index', { heading: server_text, db_conn_status: 'FAIL' })
    }

    console.log('Database connected as: ' + connection.threadId)
    res.render('index', { heading: server_text, db_conn_status: 'PASS' })
  })
  connection.end()
})

app.listen(port, () => {
  console.log(`Web app listening at http://localhost:${port}`)
})

var mysql = require('mysql')
var connection = mysql.createConnection({
  host : process.env.DB_ADDRESS,
  port : process.env.DB_PORT,
  database: process.env.DB_NAME,
  user : process.env.DB_USERNAME,
  password : process.env.DB_PASSWORD
})

