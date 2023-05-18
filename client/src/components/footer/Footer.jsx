import styles from './Footer.module.scss'

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <footer className={styles.bodyy}>
      <div className={styles.footer}>
          &copy; {year} All Rights Reserved
      </div>
      
    </footer>
  )
}

export default Footer