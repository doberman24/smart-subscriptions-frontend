import styles from './Footer.module.css';
import logo from '@/assets/img/logo.svg';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaTelegramPlane } from 'react-icons/fa';
import { FaAt } from 'react-icons/fa6';
import { toggleModal } from '@/redux/showModal';
import InfoModal from '@/components/ModalContent/InfoModal';


const Footer = () => {

  const isModal = useSelector(state => state.showModal);
  const dispatch = useDispatch();
  const message = ( 
    <>
      Все вопросы и предложения направляйте на<br /><b>subs-supp@yandex.ru</b>
    </>
  );

  const {loading} = useSelector(state => state.user);
  if (loading) {
      return null;
  }

  return (
    <div className={styles.footerContainer}>
      {isModal.isInfoModal && <InfoModal message={message} typeInfo={'info'}/>}
      <div className={styles.footer}>
        <div className={styles.content}>
            <img src={logo} height="40px" alt="logo" />
            <div className={styles.socials}>
              <button onClick={() => dispatch(toggleModal({'isInfoModal': true}))}><FaAt /></button>
              {/* <button ><FaTelegramPlane /></button> */}
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
