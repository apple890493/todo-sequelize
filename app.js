const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-Parser')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')

const app = express()
const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  res.send('hi')
})


app.listen(PORT, () => {
  console.log(`running on localhost:${PORT}`)
})