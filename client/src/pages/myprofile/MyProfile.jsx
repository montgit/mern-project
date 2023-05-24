import { Link } from 'react-router-dom'
import style from './MyProfile.module.scss'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../../App'
// import axios from 'axios';

const MyProfile = () => {

  const {state, dispatch} = useContext(userContext)

  const navigateToLogin = useNavigate()

  useEffect(() => {

    // callMyProfilePage()
    const callMyProfilePage = async () => {
      try {
        const resPonse = await fetch('/myprofile',
        {
          method: 'GET',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials: "include"
        })
  
        const data = await resPonse.json()
        console.log(data)

        dispatch({type: "USER", payload: true})
  
        if(!resPonse.status === 200) {
          const erroR = new Error(resPonse.error)
          throw erroR
        }
  
      } catch (err) {
        console.log(err)
  
        navigateToLogin('/login')
      }
    }

    callMyProfilePage()

  })


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