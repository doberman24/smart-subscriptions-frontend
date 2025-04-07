import LendingHeader from '@/components/LendingHeader/LendingHeader';
import LendingFooter from '@/components/LendingFooter/LendingFooter';
import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import styles from './Landing.module.css';
import graph from '@/assets/icons/graph.svg';
import notification from '@/assets/icons/notification.svg';
import diagramm from '@/assets/icons/diagramm.svg';
import plug from '@/assets/img/plug.png';
import Feedback from '@/components/Feedback/Feedback';
import Api from '@/api/api';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const api = new Api();
    const loadUsers = async () => {
      const data = await api.getUsersData();
      setUsers(data);
    }
    loadUsers();
  }, []);

  return (
    
    <div className={styles.landingPage}>
      <LendingHeader />

      <div className={styles.mainBlock}>
        <h1 className={styles.mainHeader}>Умные подписки</h1>
        <div  className={styles.slogan}>
          <h3>Пользуетесь ли Вы всеми теми подписками, которрые ежемесячно оплачиваете?</h3>
          <div className={styles.separator}></div>
          <h3>Управляйте всеми своими подписками в одном месте. Получайте напоминания о предстоящих платежах.</h3>
        </div>
        <div className={styles.mainButton}>
          <Link to='/dashboard'>
            <ButtonElement>Начать бесплатно</ButtonElement>
          </Link>
        </div>
      </div>

      <ul className={styles.privillege}>
        <li className={styles.singlePrivillege}>
          <img src={graph} height='120px' alt="graph" />
          <span>Отслеживайте все Ваши подписки и расходы</span>
        </li>
        <li className={styles.singlePrivillege}>
          <img src={notification} height='120px' alt="notification" />
          <span>Получайте напоминания о предстоящих платежах</span>
        </li>
        <li className={styles.singlePrivillege}>
          <img src={diagramm} height='120px' alt="diagramm" />
          <span>Анализируйте, на что уходят деньги</span>
        </li>
      </ul>

      <div className={styles.example}>
        <img src={plug} height='500px' width='900px' alt="example" />
      </div>

      <div className={styles.feedbackBlock}>
        <h4>Отзывы пользователей</h4>
        <ul className={styles.feedback}>
          {users.map(({id, userName, feedback}) => (
            <Feedback userName={userName} feedback={feedback} key={id} />
          ))}
        </ul>
      </div>

      <LendingFooter />
    </div>
  )
}

export default Landing;