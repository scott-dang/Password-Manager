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
    // console.log(req.session)
    // console.log(req.user)
    console.log('AUTHENTICATED? : ' + req.isAuthenticated())
    next()
})


const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const signupRouter = require('./routes/signup')
const logoutRouter = require('./routes/logout')
app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/signup', signupRouter)
app.use('/logout', logoutRouter)



app.listen(process.env.PORT || 3003, () => {
    console.log('The server is listening on port 3003, PasswordManager')

})

