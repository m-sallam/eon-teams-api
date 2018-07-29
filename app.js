const express = require('express')
const cloudinary = require('cloudinary')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const path = require('path')
const auth = require('./middleware/auth')

const app = express()

require('dotenv').config()

const indexRoutes = require('./api/routes')
const projectoutes = require('./api/routes/project')
const userRoutes = require('./api/routes/user')

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET
})

app.use(cors())
app.use(fileUpload())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'assets', 'dist')))

app.use('/api', indexRoutes)
app.use('/api', auth.verify, projectoutes)
app.use('/api', auth.verify, userRoutes)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'public', 'index.html'))
})

var start = async () => {
  try {
    await mongoose.connect(process.env.DBURL, { useNewUrlParser: true })
    console.log('connect to database')
    await app.listen(process.env.PORT || 3000)
    console.log(`listening on port ${process.env.PORT || 3000} ...`)
  } catch (err) {
    console.log(err)
    process.abort()
  }
}

start()
