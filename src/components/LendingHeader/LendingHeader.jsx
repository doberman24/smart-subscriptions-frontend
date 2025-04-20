import logo from '@/assets/img/logo.svg';
import styles from './LendingHeader.module.css';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <img src={logo} height='40px' alt="logo" />
        <nav className={styles.nav}>
          <Link className={styles.login} to='/login'>Войти</Link>
          <Link className={styles.register} to='/login'>Регистрация</Link>
        </nav>
      </div>
    </div>
  )
}

export default Header