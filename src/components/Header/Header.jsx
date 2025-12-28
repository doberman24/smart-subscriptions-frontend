import logo from '@/assets/img/logo.svg';
import styles from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/redux/user';

const Header = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector(state => state.user.userData);
  const {loading} = useSelector(state => state.user);
  const {token} = useSelector(state => state.token);
  const {namePage} = useSelector(state => state.pages);

  useEffect(() => {
    const localTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const savedTz = localStorage.getItem('tz');

    dispatch(getUser({token, localTz: localTz !== savedTz && localTz}));
    localStorage.setItem('tz', localTz);
  }, [token, dispatch]);

  useEffect(() => {
    if(user && !user.emailVerified) navigate('/login', {state: {fromApp: true}});
  }, [user]);

  if (loading || !user) {
    return null;
  }

  return (
    <div className={styles.headerContainer}>
      <div className={styles.header}>
        <Link className={styles.mainLogo} to='/dashboard'><img src={logo} height='40px' alt="logo" /></Link>
        <h2>Привет, <span className={styles.name}>{user.name}</span>!</h2>
        <nav className={styles.nav}>
          <Link className={`${styles.icon} ${namePage === 'dashboard' ? styles.activePage : ''}`} to='/dashboard'>
            <div className={styles.dashboard}></div>
            <p>Дашборд</p>
          </Link>
          <Link className={`${styles.icon} ${namePage === 'subscriptions' ? styles.activePage : ''}`} to='/subscriptions'>
            <div className={styles.subscriptions}></div>
            <p>Подписки</p>
          </Link>
          <Link className={`${styles.icon} ${namePage === 'analytics' ? styles.activePage : ''}`} to='/analitics'>
            <div className={styles.analitics}></div>
            <p>Аналитика</p>
          </Link>
          <Link className={`${styles.icon} ${namePage === 'settings' ? styles.activePage : ''}`} to='/settings'>
            <div className={styles.settings}></div>
            <p>Настройки</p>
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default Header