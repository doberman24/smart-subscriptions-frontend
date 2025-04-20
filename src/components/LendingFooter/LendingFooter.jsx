import styles from './LendingFooter.module.css';
import logo from '@/assets/img/logo.svg';
import { Link } from 'react-router-dom';
import { FaTelegramPlane, FaVk } from 'react-icons/fa';

const LendingFooter = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footer}>
        <div className={styles.content}>
            <img src={logo} height="40px" alt="logo" />
            <div className={styles.socials}>
                <Link to='/#'><FaVk /></Link>
                <Link to='/#'><FaTelegramPlane /></Link>
            </div>
            <p>© 2024 SmartSubscription. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default LendingFooter;
