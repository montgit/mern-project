import React from 'react'
import styles from "./Error.module.scss";
import { NavLink } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className={styles.section}>
        <div className={styles.notfound}>
            <div className={styles.notfound404}>
                <h1>404</h1>
            </div>
            <h2>We are sorry, page not found!</h2>
            <NavLink to="/">Back to Homepage</NavLink>
        </div>
    </div>
  )
}

export default ErrorPage