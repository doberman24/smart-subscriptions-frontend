import { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import loadingStyles from '@/components/ui/Loading.module.css';
import CardSubscription from '@/components/CardSubscription/CardSubscription';
import Diagramm from '@/components/ui/Diagramm/Diagramm';
import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import { useDispatch, useSelector } from 'react-redux';
import { getSummaryInfo } from '@/redux/summaryInfo';
import { useNavigate } from 'react-router-dom';
import HandleSubscriptionModal from '@/components/ModalContent/HandleSubscriptionModal';
import DeleteSubscriptionModal from '@/components/ModalContent/DeleteSubscriptionModal';
import InfoModal from '@/components/ModalContent/InfoModal';
import { deleteSubscription } from '@/redux/subscriptions';
import { useModals } from '@/components/ModalContent/useModals';
import { useHandleSubscription } from '@/components/utilites/useCreateSubscription';

const Dashboard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {summaryData, message, loading, error} = useSelector(state => state.summaryInfo);
  const messageAction = useSelector(state => state.subscriptions);
  const {token} = useSelector(state => state.token);
  
  const [infoTypeModal, setInfoTypeModal] = useState('');
  const {onHandleSub} = useHandleSubscription({setInfoTypeModal});

  const isModal = useSelector(state => state.showModal);
  const [idCard, setIdCard] = useState(null);
  const {onDeleteShowModal, onChangeShowModal, showAddModal} = useModals({setIdCard});
 
  
  useEffect(() => {
      if (error?.status) {
        navigate('/login', {state: {fromApp: true}});
      }
    }, [error, dispatch]);
  
  useEffect(() => {
    dispatch(getSummaryInfo({token}));
  }, [dispatch])

  if (loading || !summaryData.overview) {
    return <div className={loadingStyles.loading}>Загрузка...</div>
  }

  const paymentDate = new Date(summaryData.overview.nextPayment);
  const nextPayment = paymentDate.toLocaleDateString('ru-RU', {day: 'numeric', month: 'numeric'});

  const hanleSubscription = async (formData, action) => {
    await onHandleSub(token, formData, action)
    dispatch(getSummaryInfo({token, silent: true}));
  }

  const onDeleteSubscription = async () => {
    dispatch(deleteSubscription({token, idCard}));
    dispatch(getSummaryInfo({token, silent: true}));
  }

  return (
    <div className={styles.dashboardPage}>
      {isModal.handleSubscriptionModal && 
        <HandleSubscriptionModal 
          onHandleSub={hanleSubscription} 
          data={idCard && summaryData.topLatestSubscriptions.find(item => item.id === idCard)}
      />}
      {isModal.isInfoModal && <InfoModal message={messageAction.message} typeInfo={infoTypeModal}/>}
      {isModal.isDeleteSubscriptionModal && <DeleteSubscriptionModal onDeleteSubscription={onDeleteSubscription}/>}
      <div className={styles.headerBlock}>
        <h1>Дашборд</h1>
        <h2>{new Date().toLocaleDateString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric'})}</h2>
      </div>
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
            <CardSubscription 
              key={card.id} 
              cardSub={card} 
              page={'dashboard'} 
              onDeleteShowModal={onDeleteShowModal}
              onChangeShowModal={onChangeShowModal}
            />
          ))}
        </div>
        <div className={styles.diagrammBlock}>
          <h2>График расходов</h2>
          <div className={styles.diagramm}>
            <Diagramm diagrammData={summaryData.categoryBreakdown} typeDiagram={'category'}/>
          </div>
        </div>
      </div>
      <div>
        <ButtonElement onClick={showAddModal} className={'addButton purpleButton'}>🞣 Добавить подписку</ButtonElement>
      </div>
    </div>
  )
}

export default Dashboard;