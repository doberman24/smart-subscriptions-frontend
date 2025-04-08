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
          <Link className={styles.settings} to='/settings'>
            <div className={styles.icon}></div>
          </Link>
        </nav>
    </div>
  )
}

export default Header