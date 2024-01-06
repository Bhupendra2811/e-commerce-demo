// server.js
const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')
const cors = require('cors')
const DBConnection = require("./db");

DBConnection();  // connect to database

const app = express()
const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.json())
app.use('/api', router)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
