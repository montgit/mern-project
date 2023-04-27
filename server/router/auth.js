
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require('../db/conn')
const Users = require('../model/userSchema')

router.get("/", (req, res) => {
    res.send("Hello.. I'm a bot from server - auth.js");
})


//Registration

router.post("/register", async(req, res) => {

    const {email, password, cpassword} = req.body

    if (!email || !password || !cpassword) {
        return res.status(422).json({ error: "Please fill up the rest!"})
    }

    try {
        const userExists = await Users.findOne({ email: email })

        if (userExists) {
            console.log("Email already exist :(")
            return res.status(422).json({ error: "Email already exist :("})
        } else if (password != cpassword) {
            console.log("Passwords are not matching :(")
            return res.status(422).json({ error: "Passwords are not matching :("})
        } else {
            const user = new Users({email, password, cpassword})

            const userRegister = await user.save()
        
            console.log("User registered successfully :)")
            res.status(201).json({message: "User registered successfully :)"})
        }
        
        
        // if (userRegister) {
        //     res.status(201).json({message: "User registered successfully!"})
        // } else {
        //     res.status(500).json({error: "Failed to register!"})
        // }
 

    } catch(err) {
        console.log(err)
    }
    
})


// Login 

// router.post('/signin', (req, res) => {               // The basic code to check whether user able to post it or not
//     console.log(req.body)
//     res.json({message: "Superb login!"})
// })
router.post('/signin', async(req, res) => {
    
    try {
        
        const {email, password} = req.body

        if (!email || !password) {
            return res.status(400).json({error: "Please fill required data"})
        }

        const userLogin = await Users.findOne({ email: email})

        const token = await userLogin.generateAuthToken()
        console.log(token)

        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 2592000000),
            httpOnly: true
        })
        
        if (userLogin) {
            const checkPass = await bcrypt.compare(password, userLogin.password)
            if (checkPass) {
                res.status(201).json({message: "User logged in successfully!"})
            } else {
                res.status(422).json({message: "Invalid credentials!"})
            }
        } else {
            res.status(422).json({message: "Invalid credentials!"})
        }

        // const userLogin1 = await Users.findOne({ email: email})
        // // const userLogin2 = await Users.findOne({password: password})
        // const userLogin2 = await bcrypt.compare(password, userLogin1.password)

        // if ( userLogin1 && userLogin2) {
        //     res.status(201).json({message: "User logged in successfully!"})
        //     console.log(userLogin1)
            
        // } else {
        //     res.status(422).json({message: "Invalid credentials!"})
        // }
        

    } catch(err) {
        console.log(err)
    }
    

})

// My Profile page:
// Here we're using the Middleware concept
router.get("/profile", authenticate, (req, res, next) => {
    console.log('Inside the About section')                 
    next();
    res.send("Hello.. I'm a bot from About server");
});

module.exports = router
