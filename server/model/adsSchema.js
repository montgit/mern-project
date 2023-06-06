
const mongoose = require('mongoose')

const adsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    name: {
        type: String,
        required: [true, "Please enter product name"]
    },
    category: {
        type: String,
        required: [true, "Please enter product category"]
    },
    price: {
        type: Number,
        required: [true, "Please enter product price"]
    },
    isFree: {
        type: Boolean,
        required: [true, "Are you sharing this product?"]
    },
    condition: {
        type: String,
        required: [true, "Please enter product condition"]
    },
    image: {
        data: Buffer,
        contentType: String,
        // required: true
    },
    location: {
        type: String,
        required: [true, "Please enter product location"]
    },
    description: {
        type: String,
        required: [true, "Please enter product description"]
    },
    advertiser_info: {
        type: String,
        required: [true, "Please enter product advertiser_info"]
    },
    contact_info: {
        type: String,
        required: [true, "Please enter product contact_info"]
    }
}, {timestamps: true} )


// Collection creation
const Ads = mongoose.model('Ad', adsSchema)

module.exports = Ads