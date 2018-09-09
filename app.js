const express = require('express')
const morgan = require('morgan')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const app = express()

app.use(morgan('short'))
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({ extended: false }));


app.get("/", (req, res) => {
    console.log("reponding to route");
    res.send('hello to route')
})

const allstars = require('./routes/allstars.js')
app.use(allstars)



app.listen(PORT, () => {
    console.log('Running on port 3000')
})