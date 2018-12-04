const express = require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

// set up view engine
app.set('view engine', 'ejs')

//connect to mongoDB
mongoose.connect(keys.mongodb.dbURL, () => {
    console.log('connected to mongoDB on mLAB');
});

//set up routes
app.use('/auth',authRoutes);

//app home route
app.get('/', (req, res)=>{
    res.render('home');
})

app.listen(4040, () => {
    console.log('app listen port: 4040');
})