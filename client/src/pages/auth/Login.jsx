// Fully functional Login & Login with Google page!

import styles from './Auth.module.scss'
import loginImg from "../../assets/login.png"
import { Link, useNavigate } from 'react-router-dom'
import { BsGoogle } from 'react-icons/bs'
import Card from '../../components/card/Card'
import { useState } from 'react'
// import Loader from '../../components/loader/Loader'

// Toastify imports
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// // Firebase integration & Also integrating Login with Google functionality
// import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
// import { auth } from '../../firebase/config'

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigateTo = useNavigate()

  const loginUser = async (f) => {
    f.preventDefault()

    if ( !email || !password ) {
      toast.error("Please enter details")
    }
    // else {

      const resPonse = await fetch('/signin', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email, password
        })
      })
    // }
  

    // Now here the "resPonse" contains the data which are in Pending state, we can get them by:

    const data = resPonse.json()

    if(resPonse.status === 422 || !data) {
      window.alert("Invalid Credentials!")
    } else {
      window.alert("Login Successful!")

      navigateTo('/')
    }

  }
  

  // const [loader, setLoader] = useState(false)

  

  // // Login with Google
  // const provider = new GoogleAuthProvider();
  
  // const loginWithGoogle = () => {

  //   signInWithPopup(auth, provider)
  //   .then((result) => {

  //     // The signed-in user info.
  //     const user = result.user;
  //     console.log(user)
  //     toast.success("Login Successful!")

  //     navigateTo("/admin")

  //   }).catch((error) => {
      
  //     toast.error(error.message.slice(10))
  //   });
  // }

  return (
    <div className={styles.mainAuth}>
    <ToastContainer />
    {/* { loader && <Loader />} */}
    <section className={` ${styles.auth}`}>
      <div className={styles.img}>
        <img src={loginImg} alt="login" width="400"/>
      </div>

      <Card>
        <div className={styles.form}>
          <h2>Login</h2>
          <form method='POST'>
            <input type="text" placeholder='Email' required autoComplete='on'
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>

            <input type="password" placeholder='Password' required autoComplete='on'
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>

            <button className='--btn --btn-primary --btn-block' onClick={loginUser}>Login</button>

            <div className={styles.links}>
              <Link to="/reset">Reset Password</Link>
            </div>
            <p>-- or --</p>
            <button className='--btn --btn-danger --btn-block' ><BsGoogle />Login with Google</button>
          </form>
          <span className={styles.register}>
            <p>Don't have an account?</p>
            <Link to="/register">Register</Link>
          </span>
        </div>
      </Card>
      
    </section>
    </div>
  )
}

export default Login