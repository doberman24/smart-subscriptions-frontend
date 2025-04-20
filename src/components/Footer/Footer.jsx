import styles from './Footer.module.css';
import logo from '@/assets/img/logo.svg';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaTelegramPlane, FaVk } from 'react-icons/fa';

const Footer = () => {

  const {loading} = useSelector(state => state.user);
  if (loading) {
      return null;
  }

  return (
    <div className={styles.footerContainer}>
      <div className={styles.footer}>
        <div className={styles.content}>
            <img src={logo} height="40px" alt="logo" />
            <div className={styles.socials}>
              <Link to='/#'><FaVk /></Link>
              <Link to='/#'><FaTelegramPlane /></Link>
            </div>
            <div className={styles.links}>
              <Link className={styles.link} to='/dashboard'>Дашборд</Link>
              <Link className={styles.link} to='/subscriptions'>Подписки</Link>
              <Link className={styles.link} to='/analitics'>Аналитика</Link>
              <Link className={styles.link} to='/settings'>Настройки</Link>
              <Link className={styles.link} to='/politics'>Политика конфиденциальности</Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;
