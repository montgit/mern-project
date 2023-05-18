// Parent component

import styles from './Ad.module.scss'
// import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card' 

// Toastify imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Ad = () => {

  const [ad, setAd] = useState({
    name: "",
    category: "", 
    price: "",
    isFree: '', 
    condition: "", 
    image: "",
    location: "", 
    description: "", 
    advertiser_info: "", 
    contact_info: ""
  })

  const [isFree, setIsFree] = useState(false)
  const [adImage, setAdImage] = useState(null)
  const isFreeValue = Boolean(isFree); // convert to boolean
  

  const navigateToMyProfile = useNavigate()

  let name, value
  const handleInputs = (e) => {
    // console.log(e)
    name = e.target.name
    value = e.target.value
    
    setAd({...ad, [name] : value})
  }

  const handleAdPost = async (f) => {
    f.preventDefault()

    const {name, category, price, condition, location, description, advertiser_info, contact_info} = ad

    // if (!name || !category || !price || !condition || !image || !location || !description || !advertiser_info || !contact_info) {
      if (!name || !category || !price || !condition || !adImage || !location || !description || !advertiser_info || !contact_info) {
      toast.error("Please enter all details!")
    } else {

      // const resPonse = await fetch("http://localhost:5000/ad", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "multipart/form-data"
      //   },
      //   body: JSON.stringify({
      //     name, category, price, isFree, condition, adImage, location, description, advertiser_info, contact_info
      // })
      // })
      const formData = new FormData();
      formData.append('name', name);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('isFree', isFreeValue);
      formData.append('condition', condition);
      formData.append('adPic', adImage);
      formData.append('location', location);
      formData.append('description', description);
      formData.append('advertiser_info', advertiser_info);
      formData.append('contact_info', contact_info);

      const resPonse = await fetch("http://localhost:5000/ad", {
        method: "POST",
        body: formData
      });


      const data = await resPonse.json()
  
      if (data.status === 422 || !data) {
        window.alert("Ad not posted!")
        console.log("Ad not posted!")
      } else {
        window.alert("Ad posted successfully!")
        console.log("Ad posted successfully!")

        // upload()
  
        navigateToMyProfile("/myprofile")
      }
    }
    
  }


  return (
    <div className={styles.mainAuth}>
    <ToastContainer />
      {/* { loader && <Loader />} */}
      <section className={` ${styles.auth}`}>
        
        <Card>
          <div className={styles.form}>
            {/* <img src={imageUrl} alt="ad" /> */}
            <h2>Product Ad</h2>

            <form action='/ad' method="POST" encType="multipart/form-data">
              
              {/* <p>
              <label>Product_Name</label> */}
              <input type="text" name='name' placeholder='Product Name' required
              value={ad.name}
              onChange={handleInputs} 
              autoComplete='off'/>
              {/* </p> */}
              {/* </div> */}

              <input type="text" name='category' placeholder='Category' required 
              value={ad.category}
              onChange={handleInputs}  
              autoComplete='off'/>

              <div className={styles.priceNfree}>
              <label>
              <input type="number" name='price' placeholder='Price' required 
              value={ad.price}
              onChange={handleInputs}  
              autoComplete='off'/>
              </label>

              <label>
              <input type="checkbox" checked={isFree} name='isFree' placeholder='' required 
              onChange={(e) => setIsFree(e.target.checked)}  
              autoComplete='off'/>
              SHARE
              </label>
              </div>

              {/* <p name="urll" value={ad.urll}>{imageUrl}</p> */}

              <input type="text" name='condition' placeholder='Condition' required
              value={ad.condition}
              onChange={handleInputs} 
              autoComplete='off'/>

              <p>
              <label htmlFor="img">Select image:</label>
              <input type="file" id="img" name="adPic"
              onChange={(e) => setAdImage(e.target.files[0])}
              />
              
              {/* <button onClick={upload}>Upload</button> */}
              {/* <input type="submit" /> */}
              {/* <label htmlFor="ad" name="urll" value={ad.urll} onChange={setUrll(imageUrl)}></label> */}
              </p>

              {/* <label htmlFor="ad" name="urll" value={imageUrl} ></label> */}

              <input type="text" name='location' placeholder='Location' required
              value={ad.location}
              onChange={handleInputs} 
              autoComplete='off'/>

              <input type="text" name='description' placeholder='Description' required
              value={ad.description}
              onChange={handleInputs} 
              autoComplete='off'/>

              <input type="text" name='advertiser_info' placeholder='Advertiser Info' required
              value={ad.advertiser_info}
              onChange={handleInputs} 
              autoComplete='off'/>

              <input type="text" name='contact_info' placeholder='Contact Info' required
              value={ad.contact_info}
              onChange={handleInputs}  
              autoComplete='off'/>

              <button className='--btn --btn-primary --btn-block' onClick={handleAdPost}>Post Ad</button>

            </form>
            {/* <span className={styles.register}>
              <p>Already Registered?</p>
              <Link to="/login">Login</Link>
            </span> */}
          </div>
        </Card>

        {/* <div className={styles.img}>
          <img src={registerImg} alt="login" width="400"/>
        </div> */}
        
      </section>

        {/* Passing the image to the Ads.jsx child component */}
        {/* <Ads image={url}/>     */}

        {/* Trying to pass the image to Ads.jsx through Context API now */}

      {/* <adImage.Provider value={imageUrl}></adImage.Provider> */}

    
    </div>
  )
}

export default Ad

// Export the Context here
// export { adImage }