const express = require('express')
const app = express()
const ejs = require('ejs')
const mongoose = require('mongoose')
const expressSession = require('express-session')
const flash = require('connect-flash')
const bcrypt = require('bcrypt')

// MongoDB Connection
mongoose.connect('mongodb+srv://admin:<password>@cluster0.x0e2ji2.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser : true
})

global.loggedIn = null

// Controller
const indexController = require('./controller/indexController')
const loginController = require('./controller/loginController')
const registerController = require('./controller/registerController')
const storeUserController = require('./controller/storeUserController')
const loginUserController = require('./controller/loginUserController')
const logoutController = require('./controller/logoutController')
const homeController = require('./controller/homeController')

//middleware
const redirectifAuth = require('./middleware/rederectifAuth')
const authMiddleware = require('./middleware/authMiddieware')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(flash())
app.use(expressSession({
    secret: "node secret"
}))
app.use("*", (req, res, next) => {
     loggedIn = req.session.userId
     next()
})
app.set('view engine', 'ejs')

app.get('/', indexController)
app.get('/home', authMiddleware, homeController)
app.get('/login', redirectifAuth, loginController)
app.get('/register', redirectifAuth, registerController)
app.post('/user/register', redirectifAuth, storeUserController)
app.post('/user/login',redirectifAuth,  loginUserController)
app.get('/logout', logoutController)

app.listen(4000, () => console.log("App running port 4000"))