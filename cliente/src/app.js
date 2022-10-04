const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const sesion = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const mysqlstore = require('express-mysql-session')(sesion);
const bodyparser = require('body-parser');
const fileUpload = require('express-fileupload');

const {database} = require('./keys');

const app = express()
require('./lib/passport')

const handlebars = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'Vistas', 'layouts'),
    partialsDir: path.join(__dirname, 'Vistas', 'partials'),
    extname: '.hbs',
    helpers: require('./lib/helpers')
})

app.set('port', process.env.PORT || 4000)

app.set('views', path.join(__dirname, 'Vistas'))

app.engine('.hbs', handlebars.engine)

app.set('view engine', '.hbs')

app.use(fileUpload())

app.use(morgan('dev'))

app.use(bodyparser.urlencoded({extended:false}))

app.use(bodyparser.json())

app.use(sesion({
    secret: 'Quitus RB',
    resave: false,
    saveUninitialized: false,
    store: new mysqlstore(database)
}))

app.use(flash())

app.use(passport.initialize())

app.use(passport.session())

app.use((req, res , next) =>{
    app.locals.message = req.flash('message'),
    app.locals.success = req.flash('success'),
    app.locals.user = req.user,
    next()
})

app.use(express.static(path.join(__dirname, 'public')))

//RUTAS

app.use(require('./Rutas/index.rutas'))

app.use(require('./Rutas/inicio.rutas'))

app.use(require('./Rutas/login.rutas'))

app.use(require('./Rutas/bicicleta.rutas'))

app.use(require('./Rutas/grupo.rutas'))

app.use(require('./Rutas/perfil.rutas'))

module.exports = app