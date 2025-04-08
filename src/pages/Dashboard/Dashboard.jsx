import { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import Api from '@/api/api';
import CardSubscription from '@/components/CardSubscription/CardSubscription';

const Dashboard = () => {
  const [subscriptions, setSubscriptions] = useState({});
  const [nextPayment, setNextPayment] = useState('');
  const [cardSub, setCardSub] = useState([])

  useEffect(() => {
    const api = new Api();
    const loadSubscriptions = async () => {
      const {subscriptions} = await api.getUserData();
      
      setSubscriptions(subscriptions.summary);
      const paymentDate = new Date(subscriptions.summary.nextPayment.date);
      
      setNextPayment(paymentDate.toLocaleDateString('ru-RU', {day: 'numeric', month: 'numeric'}));

      setCardSub(subscriptions.latest);
    }

    loadSubscriptions();
  }, []);

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.mainStatistics}>
        <div className={styles.statistic}>
          <h3>У вас есть<br /><span className={styles.mainData}>{subscriptions.activeCount}</span><br /><span className={styles.marker}>активных</span> подписок</h3>
        </div>
        <div className={styles.statistic}>
          <h3><span className={styles.mainData}>{subscriptions.monthlySpending}₽<br /></span> было <span className={styles.marker}>потрачено</span> в этом месяце</h3>
        </div>
        <div className={styles.statistic}>
          <h3>Следующий <span className={styles.marker}>платеж<br /></span> <span className={styles.mainData}>{nextPayment}</span></h3>
        </div>
      </div>
      <div className={styles.subscriptionsBlock}>
        <div className={styles.lastSubscriptions}>
          <h2>Ваши подписки</h2>
          {cardSub.map((card) => (
            <CardSubscription key={card.id} cardSub={card} />
          ))}
        </div>
        <div className={styles.diagrammBlock}>
          <h2>График расходов</h2>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;