const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-Parser')
const methodOverride = require('method-override')

const userPassport = require('./config/passport')
const routes = require('./routes')

const app = express()
const PORT = 3000

userPassport(app)
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


app.use(routes)

app.listen(PORT, () => {
  console.log(`running on localhost:${PORT}`)
})