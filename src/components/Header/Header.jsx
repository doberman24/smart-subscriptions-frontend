import logo from '@/assets/img/logo.svg';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '@/redux/user';

const Header = () => {

  const dispatch = useDispatch();
  const {user, loading} = useSelector(state => state.user);
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  if (loading || !user.name) {
    return null;
  }

  return (
    <div className={styles.header}>
        <Link to='/dashboard'><img src={logo} height='50px' alt="logo" /></Link>
        <h2>Привет, <span className={styles.name}>{user.name}</span>!</h2>
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