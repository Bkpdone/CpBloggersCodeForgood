const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//Authentication FUnction=>
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback:true
},
    function (req,email, password, done) {

        User.findOne({ email: email }, function (err, user) {
            

            if (err) {
                console.log('HI Bhavesh Error in Find User in Passport xxxxxx xxxxxxxxxxx ');
                 
                return done(err);
                
            }
            if (!user || user.password != password) {
                
                if(user==null)
                console.log("User: ", user);
                // console.log('user password : ', user.password);
                // console.log('password : ', password);
                console.log("Hi Bhavesh Sir User Not Found By Passport Js x x x");
                console.log('Hi Bhavesh Password is Not match x x x x');
                return done(null, false);
            }

            return done(null, user);
        });
    }
));

//Put in id in Cookies
passport.serializeUser(function (user, done) {
    //    console.log("user : =>  => ",user)
   
   
    
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        if (err) {
            console.log("hi Bhavesh Error in Deserialized xxxxx xxxxxxxxx xxxxxxxx ");
            return done(err);
        }
        return done(null, user);
    });
});


//Part 2
//middleware User Sign-in Aahe Ka? nahi path change Kar
passport.checkAuthentication = function (req, res, next) {

    if (req.isAuthenticated()) {
        console.log("hi Bhavesh Sir User is Authenticated Middleware PassIt SuccessFully..............");
        return next();
    }

    console.log("hi Bhavesh Sir User is Not  Authenticated x x");
    return res.redirect('/users/sign-in');

}

passport.setAuthenticatedUser = function (req, res, next) {

    if (req.isAuthenticated()) {
        //req.user contain the current signed in user from the session cookie and we just sending this is locals for views (frontend part)
        res.locals.user = req.user;

    }
    next();
}

module.exports = passport;