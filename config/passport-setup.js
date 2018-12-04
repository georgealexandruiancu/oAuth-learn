const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/userModel');


passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        // options for the strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) =>{
        
        // passport callback function
        // check if user already exists in DB
        User.findOne({googleID: profile.id}).then((currentUser)=>{
            if(currentUser){
                //already have the user in DB
                console.log('user is: ', currentUser);
                // move to serializeUser <-
                done(null, currentUser);
            }
            else{
                //if not created in our DB -> create
                new User({
                    username: profile.displayName,
                    googleID: profile.id
                }).save().then((newUser) => {
                    console.log('new user created: ' + newUser);
                    // move to serializeUser <-
                    done(null, newUser);
                });
            }
        })
    })
)