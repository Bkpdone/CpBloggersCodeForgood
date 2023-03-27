//RajadhiRaj Maharaj Mehandipur Balaji Sarakar Ki Jai

const express = require('express');
const app = express();
const port = 7000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const cors = require('cors');
const env=require('./config/environment');
app.use(cors());
//passport
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy')
const MongoCookieStore = require('connect-mongo')(session);
const body_parare=require('body-parser');
const path=require('path');

//socket.io
const chatServer=require('http').Server(app);
const chatSockets=require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(3000);

console.log('HI Bhavesh Sir Socket.IO is listening At port: 50007 ............');

//js see
//read data from post re
app.use(express.json());
app.use(express.urlencoded());

//static path upto assets
app.use(express.static(env.assets_path));



//profile pic path
app.use("/uploads",express.static(__dirname+"/uploads"));

//layout
app.use(expressLayouts);

//extract style and and script from sub page into layout head
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



//setup ejs
app.set('view engine', 'ejs');
app.set('views', './views');

//
app.use(session({
    name: 'CpBloggers',
    secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
    ,
    store: new MongoCookieStore({
        mongooseConnection: db,
        autoRemove: "disabled"
    }
        ,
        function (err) {
            console.log("hi Error In Cookies Set Bro......:", err);
        }
    )
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
//Router Use
app.use('/', require("./routes/index"));

app.listen(port, (err) => {

    if (err) {
        console.log(`Hi Bhavesh Error => Running Server :${err} xxxxx xxxxx xxxxx`);
    }
    console.log(`Hi Bhavesh Sir Server is Run At Port : ${port} SuccessFully.........`);
});
