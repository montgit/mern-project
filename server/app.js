const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
// const port = 3000;

dotenv.config({path: './config.env'})

// const DB = process.env.DATABASE;
const PORT = process.env.PORT;

// mongoose.connect(DB).then(() => {
//     console.log('Connection with Remote Database is successful..!')         // mongoose.connect is a Promise hence we've used THEN and CATCH to handle the resolve & reject state respectively
// }).catch((err) => {
//     console.log(err)
// })
require('./db/conn')

// This commad will let our server understand that user is sending JSON data - will give "undefined" if not use this line
app.use(express.json())

app.use(require('./router/auth'))

// const middleware = (req, res, next) => {
//     console.log('Middleware doing its job');     // commented out while working with the User authentication process
//     next();
// }


// Using Express Routing
app.get("/", (req, res) => {
    res.send("Hello.. I'm a bot from server - app.js");
});

// middleware()
// app.get("/about", middleware, (req, res) => {
//     console.log('Inside the About section')                 
//     next();
//     res.send("Hello.. I'm a bot from About server");
// }); 

app.get("/contact", (req, res) => {
    // res.cookie("Test", "contentss")
    res.send("Hello.. I'm a bot from Contact server");
});

app.get("/signin", (req, res) => {
    res.send("Hello.. I'm a bot from Login server");
});

app.get("/register", (req, res) => {
    res.send("Hello.. I'm a bot from Register server");
});

// console.log('Just do it')

// Listen from the Server:
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
})