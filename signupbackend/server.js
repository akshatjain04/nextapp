const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv=require('dotenv')
const routesUrls = require('./routes/routes')
const cors = require('cors')

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


dotenv.config()

mongoose.connect(process.env.DATABASE, () =>console.log("our database is connected"))

app.use(express.json())
app.use(cors())
app.use('/app', routesUrls)
app.listen(4000, () => console.log("server is up and running"))