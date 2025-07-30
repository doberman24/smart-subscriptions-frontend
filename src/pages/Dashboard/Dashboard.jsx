import { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import loadingStyles from '@/components/ui/Loading.module.css';
import CardSubscription from '@/components/CardSubscription/CardSubscription';
import Diagramm from '@/components/ui/Diagramm/Diagramm';
import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import { useDispatch, useSelector } from 'react-redux';
import { getSummaryInfo, resetDataDashboard } from '@/redux/summaryInfo';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const [typeDiagram, setTypeDiagram] = useState('category');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {summaryData, loading, error} = useSelector(state => state.summaryInfo);
  const {token} = useSelector(state => state.token);
 
  
  useEffect(() => {
      if (error?.status) {
        dispatch(resetDataDashboard());
        navigate('/login', {state: {fromApp: true}});
      }
    }, [error, dispatch]);
  
  useEffect(() => {
    dispatch(getSummaryInfo(token));
  }, [dispatch])

  if (loading || !summaryData.topLatestSubscriptions) {
    return <div className={loadingStyles.loading}>Загрузка...</div>
  }

  const paymentDate = new Date(summaryData.overview.nextPayment);
  const nextPayment = paymentDate.toLocaleDateString('ru-RU', {day: 'numeric', month: 'numeric'});

  const diagrammData = typeDiagram === 'category' ? summaryData.categoryBreakdown : summaryData.activeBreakdown;

  return (
    <div className={styles.dashboardPage}>
      <h1>Дашборд</h1>
      <div className={styles.mainStatistics}>
        <div className={styles.statistic}>
          <h3>У вас есть<br /><span className={styles.mainData}>{summaryData.overview.activeSub}</span><br /><span className={styles.marker}>активных</span> подписок</h3>
        </div>
        <div className={styles.statistic}>
          <h3><span className={styles.mainData}>{summaryData.overview.monthlySpending}₽<br /></span> было <span className={styles.marker}>потрачено</span> в этом месяце</h3>
        </div>
        <div className={styles.statistic}>
          <h3>Следующий <span className={styles.marker}>платеж<br /></span> <span className={styles.mainData}>{nextPayment}</span></h3>
        </div>
      </div>
      <div className={styles.subscriptionsBlock}>
        <div className={styles.lastSubscriptions}>
          <h2>Ваши подписки</h2>
          {summaryData.topLatestSubscriptions.map((card) => (
            <CardSubscription key={card.id} cardSub={card} page={'dashboard'} />
          ))}
        </div>
        <div className={styles.diagrammBlock}>
          <h2>График расходов</h2>
          <div className={styles.diagramm}>
            <div className={styles.sortBy}>
              <div onClick={() => setTypeDiagram('category')} className={`${styles.tabs} ${styles.tab} ${typeDiagram === 'category' ? styles.active : ''}`}>Категории</div>
              <div onClick={() => setTypeDiagram('active')} className={`${styles.tabs} ${styles.tab} ${typeDiagram === 'active' ? styles.active : ''}`}>Статус активности</div>
            </div>
            <Diagramm diagrammData={diagrammData} typeDiagram={typeDiagram}/>
          </div>
        </div>
      </div>
      <div>
        <ButtonElement className={'addButton purpleButton'}>🞣 Добавить подписку</ButtonElement>
      </div>
    </div>
  )
}

export default Dashboard;