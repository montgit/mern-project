// Fully functional User Registration page!

import styles from './Auth.module.scss'
import registerImg from "../../assets/register.png"
import { Link, useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card'
import { useState } from 'react'

// Toastify imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// // Firebase integration
// import { createUserWithEmailAndPassword } from 'firebase/auth'
// import { auth } from '../../firebase/config'
// import Loader from '../../components/loader/Loader'

const Register = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cpassword, setCpassword] = useState("")
  // const [loader, setLoader] = useState(false)

  const navigateToLogin = useNavigate()


  const handleRegister = async (f) => {
    f.preventDefault()

    if ( password !== cpassword ) {
      toast.error("Password do not match!")
    } else if ( email === "" || password === "" || cpassword === "") {
      toast.error("Please enter details")
    } else {

      const resPonse = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email, password, cpassword
      })
      })
  
      const data = await resPonse.json()
  
      if (data.status === 422 || !data) {
        window.alert("Registration denied!")
        console.log("Registration denied!")
      } else {
        window.alert("Registration successful!")
        console.log("Registration successful!")
  
        navigateToLogin("/login")
      }

      setEmail("")
      setPassword("")
      setCpassword("")
    }

    
  }
  

  return (
    <div className={styles.mainAuth}>
    <ToastContainer />
      {/* { loader && <Loader />} */}
      <section className={` ${styles.auth}`}>
        
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>
            <form method="POST">
              {/* <div> */}
              {/* <label htmlFor="email">
              <i className="zmdi zmdi-account"></i>
              </label> */}
              <input type="text" placeholder='Email' required
              value={email}
              onChange={(e) => setEmail(e.target.value)} autoComplete='on'/>
              {/* </div> */}

              <input type="password" placeholder='Password' required 
              value={password}
              onChange={(e) => setPassword(e.target.value)} autoComplete='on'/>

              <input type="password" placeholder='Confirm Password' required
              value={cpassword}
              onChange={(e) => setCpassword(e.target.value)} autoComplete='on'/>

              <button className='--btn --btn-primary --btn-block' onClick={handleRegister}>Register</button>

            </form>
            <span className={styles.register}>
              <p>Already Registered?</p>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </Card>

        <div className={styles.img}>
          <img src={registerImg} alt="login" width="400"/>
        </div>
        
      </section>
    </div>
  )
}

export default Register