if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const bcrypt = require('bcrypt')

const connection = require('./config/db')
const error = require('./config/error')
const passport = require('./config/passport')

const app = express()
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static(__dirname + '/public'))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        client: connection.getClient(),
        collectionName: 'sessions'
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 sec (in ms) * ... = 1 day
    }
}))
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
    console.log('AUTHENTICATED? : ' + req.isAuthenticated())
    next()
})
app.use((req,res, next) => {
    if (req.isAuthenticated()) {
        res.locals.username = req.user.username
    } else {
        res.locals.username = ''
    }
    res.locals.serviceObj = new Map()
    res.locals.secretkey = ''
    // res.locals.newservice = ''
    // res.locals.newusername = ''
    // res.locals.newpassword = ''
    res.locals.message = 'There was an error'
    next()
})

const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const signupRouter = require('./routes/signup')
const logoutRouter = require('./routes/logout')
const passwordsRouter = require('./routes/passwords')
const genPasswords = require('./routes/genPasswords')
app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/signup', signupRouter)
app.use('/logout', logoutRouter)
app.use('/passwords', passwordsRouter)
app.use('/genPasswords', genPasswords)

app.use((req,res) => {
    res.status(404)
    const message = 'This page is unavailable'
    res.render('message', { message })
})


app.listen(process.env.PORT || 3003, () => {
    console.log('The server is listening on port 3003, PasswordManager')

})

