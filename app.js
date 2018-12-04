const express = require('express');
const app = express();
const authRoutes = require('./routes/auth-routes');

// set up view engine
app.set('view engine', 'ejs')

//set up routes
app.use('/auth',authRoutes);

//app home route
app.get('/', (req, res)=>{
    res.render('home');
})

app.listen(4040, () => {
    console.log('app listen port: 4040');
})