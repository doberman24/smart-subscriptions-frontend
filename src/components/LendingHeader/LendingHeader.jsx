import logo from '@/assets/img/logo.svg';
import styles from './LendingHeader.module.css';
import { Link } from 'react-router-dom';


const Header = () => {
  return (
    <div className={styles.header}>
        <img src={logo} height='65px' alt="logo" />
        <nav className={styles.nav}>
          <Link className={styles.login} to='/login'>Войти</Link>
          <Link className={styles.register} to='/#'>Регистрация</Link>
        </nav>
    </div>
  )
}

export default Header