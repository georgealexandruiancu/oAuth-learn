const express = require('express');
const app = express();

// set up view engine
app.set('view engine', 'ejs')

//app home route
app.get('/', (req, res)=>{
    res.render('home');
})

app.listen(4040, () => {
    console.log('app listen port: 4040');
})