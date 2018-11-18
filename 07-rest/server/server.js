
const express = require('express')
const app = express()

require('./config/config')

// Using Node.js `require()`
const mongoose = require('mongoose');

var options = {
    user: "root",
    pass: "example",
    server: { auto_reconnect: true }
  };


//mongoose.connect('mongodb://root:example@localhost:27017/cafe?authSource=admin',options);
mongoose.connect('mongodb://root:example@mongo:27017/cafe?authSource=admin',options);

// mongoose.connect('mongodb://root:example@localhost:27017/cafe',(err,res)=>{

//     if(err) throw err;

//     console.log(`Base de datos online.`);
// });



const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/user'));


app.listen(process.env.PORT,()=>{
    console.log('Server start',process.env.PORT);
})
