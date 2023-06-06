
// const express = require('express')
// const router = express.Router()
const jwt = require('jsonwebtoken')
const Users = require('../model/userSchema')

// This codes won't work here - only work in auth.js
// const app = express()
// app.use(cookieParser())
// const cookieParser = require("cookie-parser")
// router.use(cookieParser())

const authenticate = async (req, res, next) => {
    try {
        // console.log("JWT = " , req.cookies.jwtoken)
        const token = req.cookies.jwtoken
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)       // here we're Verifying the Token

        const rootUser = await Users.findOne({ _id: verifyToken._id, "tokens.token": token})

        if(!rootUser) { throw new Error("User not found")}

        req.token = token
        req.rootUser = rootUser
        req.userID = rootUser._id

        next()

    } catch (err) {

        res.status(401).send("Unauthorized: No token provided")
        console.log(err)
    }
}


module.exports = authenticate