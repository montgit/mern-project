import { Link } from 'react-router-dom'
import style from './Admin.module.scss'

const Admin = () => {
  return (
    <div className={style.section}>
    
      <div className={style.adminOptions}>
        <h2>Hi, Admin!</h2>
        <Link to="/" className={style.option}>Home</Link>
        <Link to="/myprofile" className={style.option}>My Profile</Link>
        <Link to="/ad" className={style.option}>Post a product Ad</Link>
        <Link to="/ads" className={style.option}>My Ads</Link>
      </div>
    </div>
  )
}

export default Admin