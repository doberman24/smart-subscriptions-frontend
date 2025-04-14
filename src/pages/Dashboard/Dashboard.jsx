import { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import CardSubscription from '@/components/CardSubscription/CardSubscription';
import Diagramm from '@/components/ui/Diagramm/Diagramm';
import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubscriptions } from '@/redux/subscriptions';

const Dashboard = () => {
  const [typeDiagram, setTypeDiagram] = useState('category');

  const dispatch = useDispatch();
  const {subscriptions, analytics, loading} = useSelector(state => state.subscriptions);
  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  if (loading || !subscriptions.summary) {
    return <div>Загрузка...</div>
  }

  const paymentDate = new Date(subscriptions.summary.nextPayment.date);
  const nextPayment = paymentDate.toLocaleDateString('ru-RU', {day: 'numeric', month: 'numeric'});

  const cardSub = subscriptions.latest;
  const diagrammData = typeDiagram === 'category' ? analytics.byCategory : analytics.topSpending;

  return (
    <div className={styles.dashboardPage}>
      <div className={styles.mainStatistics}>
        <div className={styles.statistic}>
          <h3>У вас есть<br /><span className={styles.mainData}>{subscriptions.summary.activeCount}</span><br /><span className={styles.marker}>активных</span> подписок</h3>
        </div>
        <div className={styles.statistic}>
          <h3><span className={styles.mainData}>{subscriptions.summary.monthlySpending}₽<br /></span> было <span className={styles.marker}>потрачено</span> в этом месяце</h3>
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
          <div className={styles.diagramm}>
            <div className={styles.sortBy}>
              <div onClick={() => setTypeDiagram('category')} className={`${styles.tabs} ${styles.tab} ${typeDiagram === 'category' ? styles.active : ''}`}>Категории</div>
              <div onClick={() => setTypeDiagram('top')} className={`${styles.tabs} ${styles.tab} ${typeDiagram === 'top' ? styles.active : ''}`}>Максимальная цена</div>
            </div>
            <Diagramm diagrammData={diagrammData} typeDiagram={typeDiagram}/>
          </div>
        </div>
        <ButtonElement className={'addButton purpleButton'}>🞣 Добавить подписку</ButtonElement>
      </div>
    </div>
  )
}

export default Dashboard;