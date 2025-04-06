import styles from './LendingFooter.module.css';
import logo from '@/assets/img/logo.svg';
import vk from '@/assets/icons/vk.svg';
import telegram from '@/assets/icons/telegram.svg';
import { Link } from 'react-router-dom';

const LendingFooter = () => {
  return (
    <div className={styles.footer}>
        <div className={styles.content}>
            <img src={logo} height="40px" alt="logo" />
            <div className={styles.socials}>
                <Link to='/#'><img src={vk} height="30px" alt="vk" /></Link>
                <Link to='/#'><img src={telegram} height="30px" alt="telegram" /></Link>
            </div>
            <p>© 2024 SmartSubscription. All rights reserved.</p>
        </div>
    </div>
  )
}

export default LendingFooter;
