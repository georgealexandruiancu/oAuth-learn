const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/userModel');
passport.use(
    new GoogleStrategy({
        // options for the strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) =>{
        
        // passport callback function
        console.log(profile);
        console.log('passport callback function fired');
        new User({
            username: profile.displayName,
            googleID: profile.id
        }).save().then((newUser) => {
            console.log('new user created: ' + newUser);
        });
    })
)