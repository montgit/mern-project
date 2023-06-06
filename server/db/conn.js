
const mongoose = require('mongoose')
const DB = process.env.DATABASE;


mongoose.connect(DB).then(() => {
    console.log('Connection with Remote Database is successful..!')         // mongoose.connect is a Promise hence we've used THEN and CATCH to handle the resolve & reject state respectively
}).catch((err) => {
    console.log(err)
})
