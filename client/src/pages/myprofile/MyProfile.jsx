import { Link } from 'react-router-dom'
import style from './MyProfile.module.scss'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import axios from 'axios';

const MyProfile = () => {

  const navigateToLogin = useNavigate()

  useEffect(() => {

    // callMyProfilePage()
    const callMyProfilePage = async () => {
      try {
        const resPonse = await fetch('http://localhost:5000/myprofile') 
        // {
        //   method: 'GET',
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json"
        //   },
        //   credentials: "include"
        // })
  
        const data = await resPonse.json()
        console.log(data)
  
        if(!resPonse.status === 200) {
          const erroR = new Error(resPonse.error)
          throw erroR
        }
  
      } catch (err) {
        console.log(err)
  
        // navigateToLogin('/login')
      }
    }

    callMyProfilePage()

  }, [navigateToLogin])


  return (
    <div className={style.section}>
        <h2>Hi, Admin!</h2>
      <div className={style.adminOptions}>
        
        {/* <Link to="/" className={style.option}>Home</Link>
        <Link to="/myprofile" className={style.option}>My Profile</Link> */}
        <Link to="/ad" className={style.option}>Post a product Ad</Link>
        <Link to="/ads" className={style.option}>My Ads</Link>
      </div>
    </div>
  )
}

export default MyProfile