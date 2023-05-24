// Child component 

import { useContext, useEffect, useState } from 'react';
import style from './Ads.module.scss'
import Card from '../../components/card/Card'
import axios from 'axios';
import { Buffer } from 'buffer';
import EditModal from './EditModal';
import { userContext } from '../../App'
// import { useNavigate } from 'react-router-dom';


const Ads = () => {

  const [ads, setAds] = useState([]);
  // const [showModal, setShowModal] = useState(false);        // we've to conditioanlly show the Modal, hence this useState won't be used
  const [selectedAd, setSelectedAd] = useState(null);

  const {state, dispatch} = useContext(userContext)

  // const navigateToAds = useNavigate()

    // Retrieving Ad post data from Atlas

    useEffect(() => {
      axios.get('/ads')
        .then((ress) => {
          // console.log(ress.data)                  // this is giving continuous ARRAY data of the documents from Atlas
          dispatch({type: "USER", payload: true})
          setAds(ress.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }, [])

  const handleCloseModal = () => {
    setSelectedAd(null)
  }

  const handleEditClick = (adID) => {
    setSelectedAd(adID)
  }

  const handleDeleteClick = async (adID) => {

    try {
      await axios.delete(`http://localhost:5000/ad/delete/${adID}`)
      alert('Ad Deleted Successfully!')
        // navigateToAds('/ads')
      window.location.reload()
    }
    catch (err) {
      console.log(err)
    }
  
  }
  

  // NOTE: You can't use the below code because here we again doing "res.json()" to get the data in correct format which we ALREADY have done in "ads.js" router.get("/ads") portion!
  // useEffect(() => {
  //   const fetchData = async() => {
  //     try {
  //       const res = await axios.get('http://localhost:5000/ads');
  //       // experimenting with this - if throw error then will follow then catch
  //       const ads = await res.json();
  //       setAds(ads);
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   fetchData();
  // }, []);

  const Modal = (AD) => {

    // const [showModal, setShowModal] = useState(false);           // Don't define this here, will give error

    useEffect(() => {
      document.body.style.overflowY = 'hidden';
    
      return () => {
        document.body.style.overflowY = 'scroll';
      }
    }, [])
  
    return (
      <>
        <div className={style.modal_wrapper} onClick={handleCloseModal}></div>
          <div className={style.modal_container}>
            <p>Here user can edit the Ad</p>
            <EditModal ad={AD}/>
            {/* {console.log(AD.AD._id)} */}
            <button onClick={handleCloseModal} className={style.modal_btn}>Cancel</button>
          </div>
        
      </>
    )
  }



return (
  <div className={style.section}>
    <div className={style.item}>
      {ads.map((ad, i) => {
        const base64String = Buffer.from(ad.image.data.data).toString('base64');
        return (
          <Card key={i}>
            <div className={style.adContent}>
              <img src={`data:image/jpeg;base64,${base64String}`} alt="adImg" width="300" />
              <div key={ad._id + 1}> Name: {ad.name} </div>
              <div key={ad._id + 2}>Category: {ad.category}</div>
              <div key={ad._id + 3}>Price: Rs {ad.price}</div>
              <div key={ad._id + 4}>Is Free: {ad.isFree ? 'Yes' : 'No'}</div>
              <div key={ad._id + 5}>Condition: {ad.condition}</div>
              <div key={ad._id + 6}>Location: {ad.location}</div>
              <div key={ad._id + 7}>Description: {ad.description}</div>
              <div key={ad._id + 8}>Advertiser: {ad.advertiser_info}</div>
              <div key={ad._id + 9}>Contact: {ad.contact_info}</div>
              <br />
              <button onClick={() => handleEditClick(ad._id)} >Edit Ad</button>
              <button onClick={() => handleDeleteClick(ad._id)} >Delete Ad</button>
              { selectedAd === ad._id && < Modal AD={ad}/>}
              {/* {console.log(ad)} */}
            </div>
          </Card>
        );
      })}
    </div>
  </div>
);

}

export default Ads