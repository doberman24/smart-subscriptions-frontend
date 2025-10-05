import LendingHeader from '@/components/LendingHeader/LendingHeader';
import LendingFooter from '@/components/LendingFooter/LendingFooter';
import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import styles from './Landing.module.css';
import graph from '@/assets/icons/graph.svg';
import notification from '@/assets/icons/notification.svg';
import diagramm from '@/assets/icons/diagramm.svg';
import demo from '@/assets/img/demo.gif';
import Feedback from '@/components/Feedback/Feedback';
import { useNavigate } from 'react-router-dom';
import  { reviews } from '@/constants/reviews';
import { useDispatch } from 'react-redux';
import { getToken } from '@/redux/getToken';
import { Helmet } from '@vuer-ai/react-helmet-async';

const Landing = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();


  const getDemo = async () => {
    const userData = {login: 'demo_user', password: '3Vcf#z2qY^YtEn_'};
    const data = await dispatch(getToken({formValue: userData, activeTab: 'login'}));
    if (getToken.fulfilled.match(data)) {
      navigate('/dashboard', {replace: true});
    }
    if (getToken.rejected.match(data)) {
      navigate('/login', {state: {fromApp: true}});
    }
  }

  return (
    <>
      <Helmet>
        <title>Smart Subscriptions - Управление подписками (beta)</title>
        <meta name='description' content='Следи за платежами и аналитикой подписок в одном месте' />
      </Helmet>

      <div>
        <LendingHeader />
        <div className={styles.landingPage}>
          <div className={styles.mainBlock}>
            <h1 className={styles.mainHeader}>Умные подписки</h1>
            <div  className={styles.slogan}>
              <h3>Вы уверены, что пользуетесь всеми подписками, за которые ежемесячно платите?</h3>
              <div className={styles.separator}></div>
              <h3>Соберите их в одном месте, контролируйте расходы и получайте напоминания о предстоящих платежах.</h3>
            </div>
            <div className={styles.mainButton}>
              <ButtonElement onClick={getDemo} className={'mainButton pinkButton'}>Попробовать без регистрации</ButtonElement>
            </div>
          </div>

          <ul className={styles.privillege}>
            <li className={styles.singlePrivillege}>
              <img src={graph} height='48px' alt="graph" />
              <span>Отслеживайте все Ваши подписки и расходы</span>
            </li>
            <li className={styles.singlePrivillege}>
              <img src={notification} height='48px' alt="notification" />
              <span>Получайте напоминания о предстоящих платежах</span>
            </li>
            <li className={styles.singlePrivillege}>
              <img src={diagramm} height='48px' alt="diagramm" />
              <span>Анализируйте, на что уходят деньги</span>
            </li>
          </ul>

          <div className={styles.example}>
            <img src={demo} width='1000px' alt="demo" />
          </div>

          <div className={styles.feedbackBlock}>
            <h4>Отзывы пользователей</h4>
            <ul className={styles.feedback}>
              {reviews.map(({id, userName, feedback}) => (
                <Feedback userName={userName} feedback={feedback} key={id} />
              ))}
            </ul>
          </div>
        </div>
        <LendingFooter />
      </div>
    </>
  )
}

export default Landing;