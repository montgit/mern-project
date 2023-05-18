const express = require("express");
const router = express.Router();
const fs = require('fs')
// const bodyParser = require('body-parser');
// const path = require('path')
// const adController = require('../controllers/adController')
// const app = express()
// app.use(bodyParser.json());

// multer requirements
const multer = require("multer");
// const path = require('path')

require("../db/conn");

const Ads = require('../model/adsSchema')
// const { appendFile } = require('fs')

// setting up the multer middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./AdImages");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Posting a product ad
router.post("/ad", upload.single("adPic"), (req, res) => {
  // const { name, category, price, isFree, condition, location, description, advertiser_info, contact_info } = req.body;
  const { name, category, price, isFree, condition, location, description, advertiser_info, contact_info } = req.body;
  // const { filename } = req.file;

  // try {
  if (name && category) {
    const newAd = new Ads({
      name,
      category,
      price,
      isFree,
      condition,
      image: {
        data: fs.readFileSync('AdImages/' + req.file.filename),
        contentType: "image/png",
      },
      location,
      description,
      advertiser_info,
      contact_info
    });

    // console.log(name, category, price, isFree, condition, location, description, advertiser_info, contact_info)

    newAd
      .save()
      .then((result) => {
        console.log("Image is saved")
        return res.status(201).json({ message: "Image is saved" });
      })
      .catch((err) => {
        console.log(err, "Error has occured")
        return res.status(201).json({ message: "Error has occured" });
      });

    // if (saveAd) {
    //   console.log('Ad image is saved')
    //   return res.status(201).json({ message: 'Ad created successfully!' });
    // } else {
    //   console.log('Something wrong!')
    //   return res.status(400).json({ message: 'Something wrong!' });
    // }
  } else {
    return res.status(400).json({ message: "All fields are required!" });
  }
  // catch (err) {
  //   return res.status(400).json(err);
});

router.get("/ads", async (req, res) => {
  const allAds = await Ads.find()
  res.json(allAds)
})

router.put("/ad/edit/:id", async (req, res) => {
  const { name, category, price, isFree, condition, adImage, location, description, advertiser_info, contact_info } = req.body
  const { id } = req.params
  
  const updateAd = await Ads.updateMany({ _id: id }, { $set: { name, category, price, isFree, condition, location, description, advertiser_info, contact_info } })
  console.log(id, name, category, price, isFree, condition, adImage, location, description, advertiser_info, contact_info)
  // console.log(req.body.name)
  res.json(updateAd)

})
// router.get("/ads", adController.getAds)

// router.post("/ad", upload.single('adImage'), async(req, res) => {

//     console.log('Inside posting an Ad section')

//     // next() - you're using this NEXT() function in a wrong way - we've to use this function while defining the MIDDLEWARE, not while using the MIDDLEWARE!!

//     const {name, category, price, isFree, condition, image, location, description, advertiser_info, contact_info} = req.body
//     // const {filename} = req.file

//     if (!name || !category || !price || !condition || !image || !location || !description || !advertiser_info || !contact_info) {
//     // if (!name || !category || !image ) {
//         return res.status(422).json({ error: "Please fill up the rest!"})
//     } else {
//         const ad = new Ads({name, category, price, isFree, condition, image: filename, location, description, advertiser_info, contact_info})

//         await ad.save()

//         console.log("Ad Posted Successfully :)")
//         res.status(201).json({message: "Ad Posted Successfully :)"})
//     }

// })

// Getting the data from database
// router.get('/ads', async (req, res) => {
//     try {
//       const ads = await Ads.find();
//       res.json(ads);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });

module.exports = router
