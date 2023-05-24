import axios from 'axios';
import style from './Home.module.scss'
import { useEffect, useState } from 'react';
import { Buffer } from 'buffer';
import Card from '../../components/card/Card';

const Home = () => {

  const [ads, setAds] = useState([]);

  useEffect(() => {
    axios.get('/allAds')
      .then((ress) => {
        // console.log(ress.data)                  // this is giving continuous ARRAY data of the documents from Atlas
        setAds(ress.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

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
              <button className={style.btn}>Edit Ad</button>
              <button className={style.btn}>Delete Ad</button>
            </div>
          </Card>
        );
      })}
    </div>
  </div>
  )
}

export default Home