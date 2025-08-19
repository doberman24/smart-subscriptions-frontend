import styles from './LendingFooter.module.css';
import logo from '@/assets/img/logo.svg';

const LendingFooter = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.footer}>
        <div className={styles.content}>
            <img src={logo} height="40px" alt="logo" />
            <p>© 2024 SmartSubscription. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default LendingFooter;
