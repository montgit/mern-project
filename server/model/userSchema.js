
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    // name: {
    //     type: String,
    //     required: true
    // },

    email: {
        type: String,
        required: true
    },

    // phone: {
    //     type: Number,
    //     required: true
    // },

    // work: {
    //     type: String,
    //     required: true
    // },

    password: {
        type: String,
        required: true
    },

    cpassword: {
        type: String,
        required: true
    },

    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})


// We're hashing the Password
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
    }
    next()
    console.log("Inside Password hashing")
})


// We're generating Token
userSchema.methods.generateAuthToken = async function() {

    try {
        let tokenIs = jwt.sign({ _id: this._id}, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token: tokenIs})
        await this.save()
        return tokenIs

    } catch(err) {
        console.log(err)
    }
}


// Collection creation
const Users = mongoose.model('User', userSchema)

module.exports = Users
