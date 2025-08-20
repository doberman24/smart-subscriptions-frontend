import styles from './Footer.module.css';
import logo from '@/assets/img/logo.svg';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaTelegramPlane, FaVk } from 'react-icons/fa';
import { FaAt } from 'react-icons/fa6';
import { toggleModal } from '@/redux/showModal';
import InfoModal from '@/components/ModalContent/InfoModal';
import { useState } from 'react';


const Footer = () => {
  const [mailContact, setMailContact] = useState(false);
  const isModal = useSelector(state => state.showModal);
  const dispatch = useDispatch();
  const message = ( 
    <>
      Все вопросы и предложения направляйте на<br /><b>subs-supp@yandex.ru</b>
    </>
  );

  const openModal = () => {
    setMailContact(true);
    dispatch(toggleModal({'isContactInfo': true}))
  }

  const onSupport = (value) => {
    setMailContact(value);
  }

  const {loading} = useSelector(state => state.user);
  if (loading) {
      return null;
  }

  return (
    <div className={styles.footerContainer}>
      {isModal.isContactInfo && mailContact && <InfoModal message={message} typeInfo={'info'} onSupport={onSupport}/>}
      <div className={styles.footer}>
        <div className={styles.content}>
            <img src={logo} height="40px" alt="logo" />
            <div className={styles.socials}>
              {/* <button><FaTelegramPlane /></button>
              <button><FaVk /></button>               */}
              <button onClick={openModal}><FaAt /></button>
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
