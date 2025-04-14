import styles from './Footer.module.css';
import logo from '@/assets/img/logo.svg';
import vk from '@/assets/icons/vk.svg';
import telegram from '@/assets/icons/telegram.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className={styles.footer}>
        <div className={styles.content}>
            <img src={logo} height="40px" alt="logo" />
            <div className={styles.socials}>
                <Link to='/#'><img src={vk} height="30px" alt="vk" /></Link>
                <Link to='/#'><img src={telegram} height="30px" alt="telegram" /></Link>
            </div>
            <div className={styles.links}>
              <Link className={styles.link} to='/dashboard'>Дашборд</Link>
              <Link className={styles.link} to='/login'>Войти</Link>
              <Link className={styles.link} to='/subscriptions'>Подписки</Link>
              <Link className={styles.link} to='/analitics'>Аналитика</Link>
              <Link className={styles.link} to='/politics'>Политика конфиденциальности</Link>
              <Link className={styles.link} to='/settings'>Настройки</Link>
            </div>
        </div>
    </div>
  )
}

export default Footer;
