import React, { useEffect, useState } from 'react';
import style from './EditModal.module.scss'
// import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function EditModal(props) {
    const [name, setName] = useState(props.ad?.name || '');
    const [category, setCategory] = useState(props.ad?.category || '');
    const [price, setPrice] = useState(props.ad?.price || '');
    const [isFree, setIsFree] = useState(props.ad?.isFree || false);
    const [condition, setCondition] = useState(props.ad?.condition || '');
    const [adImage, setAdImage] = useState('');
    const [location, setLocation] = useState(props.ad?.location || '');
    const [description, setDescription] = useState(props.ad?.description || '');
    const [advertiser_info, setAdvertiserInfo] = useState(props.ad?.advertiser_info || '');
    const [contact_info, setContactInfo] = useState(props.ad?.contact_info || '');
    const isFreeValue = Boolean(isFree);

    const navigateToAds = useNavigate()

    // const [name, setName] = useState(AD?.name || '');
    // const [category, setCategory] = useState(AD?.category || '');
    // const [price, setPrice] = useState(AD?.price || '');
    // const [isFree, setIsFree] = useState(AD?.isFree || false);
    // const [condition, setCondition] = useState(AD?.condition || '');
    // const [adImage, setAdImage] = useState('');
    // const [location, setLocation] = useState(AD?.location || '');
    // const [description, setDescription] = useState(AD?.description || '');
    // const [advertiser_info, setAdvertiserInfo] = useState(AD?.advertiser_info || '');
    // const [contact_info, setContactInfo] = useState(AD?.contact_info || '');
    // const isFreeValue = Boolean(isFree);
    
    useEffect(() => {
        setName(props.ad?.name || '');
        setCategory(props.ad?.category || '');
        setPrice(props.ad?.price || '');
        setIsFree(props.ad?.isFree || false);
        setCondition(props.ad?.condition || '');
        setLocation(props.ad?.location || '');
        setDescription(props.ad?.description || '');
        setAdvertiserInfo(props.ad?.advertiser_info || '');
        setContactInfo(props.ad?.contact_info || '');
      }, [props.ad]);

  const handleSubmit = async(event) => {
    event.preventDefault();
    
    // if (!name || !category || !price || !condition || !adImage || !location || !description || !advertiser_info || !contact_info) {
    //     toast.error("Please enter all details!")
    // }

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

      await fetch(`http://localhost:5000/ad/edit/${props.ad.AD._id}`, {
        method: 'PUT',
        // body: formData
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, category, price, isFree, condition, adImage, location, description, advertiser_info, contact_info }),

        
      });

      // navigateToAds('/ads')
  };
//   console.log(AD.AD._id)
  console.log(props.ad.AD._id)

  return (
    <div className={style.form}>
      <form action={`http://localhost:5000/ad/edit/${props.ad.AD._id}`} method="POST" encType="multipart/form-data">
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Category:
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        </label>
        <label>
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
        </label>
        <label>
          Is Free:
          <input type="checkbox" checked={isFree} onChange={(e) => setIsFree(e.target.checked)} />
        </label>
        <label>
          Condition:
          <input type="text" value={condition} onChange={(e) => setCondition(e.target.value)} />
        </label>
        <p>
              <label htmlFor="img">Select image:</label>
              <input type="file" id="img" name="adPic"
              onChange={(e) => setAdImage(e.target.files[0])}
              />
        </p>
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Advertiser Info:
          <input
            type="text"
            value={advertiser_info}
            onChange={(e) => setAdvertiserInfo(e.target.value)}
          />
        </label>
        <label>
          Contact Info:
          <input type="text" value={contact_info} onChange={(e) => setContactInfo(e.target.value)} />
        </label>
        <button type="submit" onClick={handleSubmit}>Save</button>
        <button type="button" >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditModal
