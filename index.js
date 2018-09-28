require('dotenv').config()

const express = require('express')
const helmet = require('helmet')
const mainRouter = require('./src/routes/mainRouter')

const app = express()

app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');

// Serve public files.
app.use(express.static('public'))

// Helmet protects from something.
app.use(helmet())

// Form data stuff.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Router of the main page.
app.use('/', mainRouter)

// Handle 404.
app.use((req, res) => res.sendStatus(404))

// Handle errors.
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(8080)

// console.dir(json, {colors: true, depth: null})
