require('dotenv').config();
const passport =require("passport");
const localStrategy = require("passport-local").Strategy;
const jwtStrategy = require("passport-jwt").Strategy;

const User =require("./models/usersDb.js");

const cookieExtractor = req=>{
    let token = null;

    if(req && req.cookies){
        token = req.cookies["access_token"];
    }

    return token;
}

const secretKey = process.env.USER_ENCRYPTION_KEY;

// authorization
passport.use(new jwtStrategy({

    jwtFromRequest: cookieExtractor,
    secretOrKey: secretKey

}, (payload, done)=>{
    User.findById({_id : payload.sub}, (err, user)=>{
        if(err){
            return done(err, false);}
        if(user){
            return done(null, user);}
        else {
            return done(null, false);}
    });
}));

// authenticated local strategy using username and password

passport.use(new localStrategy((username, password, done)=>{
    User.findOne({username}, (err, user)=>{
        // if there's any user
        if(err)
            return done(err);
            // if there is no user
        if(!user)
            return done(null, false);
            // check if password is correct
        user.comparePassword(password, done);
    });

}));