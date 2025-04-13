import logo from '@/assets/img/logo.svg';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Api from '@/api/api';


const Header = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    const api = new Api();
    const loadUsers = async () => {
      const data = await api.getUserData();
      setUser(data.user.name);
    }
    loadUsers();
  }, [])


  return (
    <div className={styles.header}>
        <Link to='/dashboard'><img src={logo} height='50px' alt="logo" /></Link>
        <h2>Привет, <span className={styles.name}>{user}</span>!</h2>
        <nav className={styles.nav}>
          <Link className={styles.icon} to='/dashboard'>
            <div className={styles.dashboard}></div>
            <p>Дашборд</p>
          </Link>
          <Link className={styles.icon} to='/subscriptions'>
            <div className={styles.subscriptions}></div>
            <p>Подписки</p>
          </Link>
          <Link className={styles.icon} to='/analitics'>
            <div className={styles.analitics}></div>
            <p>Аналитика</p>
          </Link>
          <Link className={styles.icon} to='/login'>
            <div className={styles.login}></div>
            <p>Войти</p>
          </Link>
          <Link className={styles.icon} to='/settings'>
            <div className={styles.settings}></div>
            <p>Настройки</p>
          </Link>
        </nav>
    </div>
  )
}

export default Header