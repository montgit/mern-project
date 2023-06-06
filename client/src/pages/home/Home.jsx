import axios from "axios";
import style from "./Home.module.scss";
import { useEffect, useState } from "react";
import { Buffer } from "buffer";
// import Card from "../../components/card/Card";
import { useNavigate } from "react-router-dom";
import Loader from '../../components/loader/Loader'

const Home = () => {
  const [ads, setAds] = useState([]);
  const [loader, setLoader] = useState(false)

  const navigate = useNavigate();

  const handleNavigate = (ad) => {
    navigate("/products", { state: ad });
  };

  useEffect(() => {
    setLoader(true)
    axios
      .get("/allAds")
      .then((ress) => {
        // setLoader(true)
        // console.log(ress.data)                  // this is giving continuous ARRAY data of the documents from Atlas
        setAds(ress.data);
        setLoader(false)
      })
      .catch((err) => {
        setLoader(false)
        console.log(err);
      });
  }, []);

  return (
    <div className={style.section}>
      { loader && <Loader />}
      <div className={style.item}>
        {ads.map((ad, i) => {
          const base64String = Buffer.from(ad.image.data.data).toString(
            "base64"
          );
          return (
            // <Card key={i}>
            //   <div className={style.adContent}>
            //     <img
            //       // className={style.image}
            //       src={`data:image/jpeg;base64,${base64String}`}
            //       alt="adImg"
            //       width="300"
            //       height="300"
            //     />
            //     <div key={ad._id + 1}> Name: {ad.name} </div>
            //     {/* <div key={ad._id + 2}>Category: {ad.category}</div> */}
            //     <div key={ad._id + 3}>Price: Rs {ad.price}</div>
            //     {/* <div key={ad._id + 4}>Is Free: {ad.isFree ? 'Yes' : 'No'}</div> */}
            //     <div key={ad._id + 5}>Condition: {ad.condition}</div>
            //     {/* <div key={ad._id + 6}>Location: {ad.location}</div> */}
            //     {/* <div key={ad._id + 7}>Description: {ad.description}</div> */}
            //     {/* <div key={ad._id + 8}>Advertiser: {ad.advertiser_info}</div> */}
            //     <div key={ad._id + 9}>Contact: {ad.contact_info}</div>
            //     <br />
            //     <button className={style.btn}>Edit Ad</button>
            //     <button className={style.btn}>Delete Ad</button>
            //     <p
            //       className={style.showMore}
            //       onClick={() => {
            //         handleNavigate(ad);
            //       }}
            //     >
            //       {" "}
            //       Show More . . .
            //     </p>
            //   </div>

            // </Card>
            <div>
              <div className={style.card}>
                {/* <div class="badge">Hot</div> */}
                {/* <div className={style.tumb}>
                  <img
                    // className={style.image}
                    src={`data:image/jpeg;base64,${base64String}`}
                    alt="adImg"
                    width="300"
                    height="300"
                  />
                </div> */}
                <div className={style.imageBox}>
                  <img
                    // className={style.image}
                    src={`data:image/jpeg;base64,${base64String}`}
                    alt="adImg"
                    width="300"
                    height="300"
                  />
                </div>
                <div className={style.details}>
                  {/* <span className="product-catagory">Women,bag</span> */}
                  <h4>
                    <p
                      onClick={() => {
                        handleNavigate(ad);
                      }}
                    >
                      {ad.name}
                    </p>
                  </h4>
                  <p>Description: {ad.description}</p>
                  <p>Is Free: {ad.isFree ? "Yes" : "No"}</p>
                  <p>Condition: {ad.condition}</p>
                  <p>Contact: {ad.contact_info}</p>
                  <div className={style.bottomDetails}>
                    <div className={style.price}>
                      {/* <small>$96.00</small> */}
                      &#8377; {ad.price}
                    </div>
                    <div className={style.links}>
                      <p
                        onClick={() => {
                          handleNavigate(ad);
                        }}
                      >
                        show more ...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
