
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
// import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { userContext } from '../../App'

// Toastify imports
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        sellit<span>Now</span>.
      </h2>
    </Link>
  </div>
);

// const cart = (
//   <span className={styles.cart}>
//     <Link to="/cart">
//       Cart <FaShoppingCart size={21} />
//       <p>0</p>
//     </Link>
//   </span>
// );

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const {state, dispatch} = useContext(userContext)

  const RenderMenu = () => {

    if (state) {
      return (
        <>         
              <a href="/myprofile" style={{color: "#ff7722"}}>
                <FaUserCircle size={16} /> Hi, {displayName}!
              </a>
                      
              <NavLink to="/myprofile" className={activeLink}>
                My Profile
              </NavLink>
            
              <NavLink to="/" className={activeLink}>
                My Orders
              </NavLink>
       
              <NavLink to="/logout" >
                Logout
              </NavLink>
        </>
      )
    }
    else {
      return (
        <>
          <NavLink to="/login" className={activeLink}>
                Login
              </NavLink>

            
              <NavLink to="/register" className={activeLink}>
                Register
              </NavLink>

              <NavLink to="/contact" className={activeLink}>
                Contact
              </NavLink>


        </>
      )
    }
  }


  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    axios.get('/myprofile')
      .then((ress) => {
        // console.log(ress.data)                  // this is giving continuous ARRAY data of the documents from Atlas
        
        // console.log(ress.data.email.slice(0, ress.data.email.indexOf('@')));
        // const name = ress.data.email.slice(0, ress.data.email.indexOf('@'));
        setDisplayName(ress.data.email.slice(0, ress.data.email.indexOf('@')))
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])


  return (
    <header>
      {/* <ToastContainer /> */}
      <div className={styles.header}>
        {logo}

        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }
        >
          <div
            onClick={hideMenu}
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            }
          ></div>

          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>
            {/* <li>
              <NavLink to="/" className={activeLink}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>
                Contact
              </NavLink>
            </li> */}
          </ul>

          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              
              <RenderMenu />
          
            </span>
            {/* {cart} */}
          </div>
        </nav>

        <div className={styles["menu-icon"]}>
          {/* {cart} */}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
