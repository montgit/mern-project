import React from "react";
import style from "./Product.module.scss";
import { Buffer } from "buffer";
import { useLocation } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import { useNavigate } from "react-router-dom";

const Product = () => {
  let location = useLocation();
  const base64String = Buffer.from(location.state.image.data).toString(
    "base64"
  );
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };
  return (
    <main>
      <div className={style.card}>
        <div className={style.card__title}>
          <div className={style.icon}>
            <p
              onClick={() => {
                handleNavigate();
              }}
            >
              <i className="fa fa-arrow-left"></i>
            </p>
          </div>
          <h3>View Products</h3>
        </div>
        <div className={style.card__body}>
          <div className={style.half}>
            <div className={style.featured_text}>
              <h1>{location.state.name}</h1>
              <p className={style.sub}>{location.state.category}</p>
              <p className={style.price}>&#8377;{location.state.price}</p>
            </div>
            <div className={style.image}>
              <img
                src={`data:image/jpeg;base64,${base64String}`}
                alt="adImg"
                width="300"
              />
            </div>
          </div>
          <div className={style.half}>
            <div className={style.description}>
              <p>Is Free: {location.state.isFree ? "Yes" : "No"}</p>
              <p>Condition: {location.state.condition}</p>
              <p>Location: {location.state.location}</p>
              <p>Description: {location.state.description}</p>
              <p>Contact: {location.state.contact_info}</p>
            </div>
            <span className={style.stock}><i class="fa fa-pen"></i> In stock</span>
            <div className={style.reviews}>
            <ul className={style.stars}>
              <li className={style.fa}><i class="fa fa-star"></i></li>
              <li className={style.fa}><i class="fa fa-star"></i></li>
              <li className={style.fa}><i class="fa fa-star"></i></li>
              <li className={style.fa}><i class="fa fa-star"></i></li>
              <li className={style.fa}><i class="fa fa-star-o"></i></li>
            </ul>
            <span>(64 reviews)</span>
          </div>
          </div>
        </div>
        <div className={style.card__footer}>
          <div className={style.recommend}>
            <p>Advertised by</p>
            <h3>{location.state.advertiser_info}</h3>
          </div>
          <div className={style.action}>
            <button type="button">Buy Now</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Product;
