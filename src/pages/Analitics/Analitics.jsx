import { useEffect, useState } from 'react';
import styles from './Analitics.module.css'
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import loadingStyles from '@/components/ui/Loading.module.css';
import Graph from '@/components/ui/Diagramm/Graph';
import Diagramm from '@/components/ui/Diagramm/Diagramm';
import AnaliticsCard from '@/components/CardSubscription/AnaliticsCard';
import { categoryOptions, sortDateRangeAnaliticsOptions } from '@/constants/options';
import { useDispatch, useSelector } from 'react-redux';
import { getAnalytics, getAnalyticsSubscription } from '@/redux/analytics';
import { useNavigate } from 'react-router-dom';
import TopDataModal from '@/components/ModalContent/TopDataModal';
import { useModals } from '@/components/ModalContent/useModals';


const Analitics = () => {

  const [typeDiagram, setTypeDiagram] = useState('category');
  const [typeDiagrammData, setTypeDiagrammData] = useState('');
  const isModal = useSelector(state => state.showModal);
  const {showClickModal} = useModals({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading, summaryData, message, error, details} = useSelector(state => state.analitycsData);
  const {token} = useSelector(state => state.token);

  useEffect(() => {
      if (error?.status) {
        showClickModal('');
        navigate('/login', {state: {fromApp: true}});
      }
    }, [error, dispatch]);

  useEffect(() => {
    dispatch(getAnalytics({token, filter: null}));
    if (summaryData.filters?.category === 'all') {
      setTypeDiagrammData('all');
    } else {
      setTypeDiagrammData('');
    }
  }, [summaryData.filters?.category, dispatch])


  if (loading || !summaryData.topSubscriptions) {
    return <div className={loadingStyles.loading}>Загрузка...</div>
  }

  const handleFilterChange = (label) => {
    dispatch(getAnalytics({token, filter: {...summaryData.filters, ...label}}));
  }

  let diagrammData = [];
  if (typeDiagram === 'category') {
    diagrammData = typeDiagrammData === 'all' ? summaryData.diagramm?.categoryBreakdown : summaryData.diagramm?.oneCategorySybscriptions;
  } else {
    diagrammData = summaryData.diagramm?.activeBreakdown;
  }

  const onDetailsShowModal = (top, id) => {
    showClickModal('isTopModal');
    dispatch(getAnalyticsSubscription({token, id}));
  }

  return (
    <div className={styles.analiticsPage}>
      {isModal.isTopModal && <TopDataModal message={details.details} typeInfo={'info'}/>}
      <div className={styles.headerBlock}>
        <h1>Аналитика</h1>
        <div className={styles.filtersBlock}>
          <Dropdown 
            list={sortDateRangeAnaliticsOptions} 
            value={sortDateRangeAnaliticsOptions.find(item => item.label === summaryData.filters.period)}
            onChange={({label}) => handleFilterChange({period: label})}
          />
          <Dropdown 
            list={[
                {label: 'all', value: 'Все'}, 
                ...categoryOptions,
              ]} 
            value={summaryData.filters.category === 'all' ? {label: 'all', value: 'Все'} : categoryOptions.find(item => item.label === summaryData.filters.category)}
            onChange={({label}) => handleFilterChange({category: label})}
          />
        </div>
      </div>
      <div className={styles.expensesBlock}>
        <div className={styles.expenses}>
          <h3>Общие расходы<br /><span className={styles.mainExpenses}>{summaryData.overview.totalPayments} ₽</span></h3>
        </div>
        <div className={styles.expenses}>
          <h3>Активные подписки<br /><span className={styles.mainExpenses}>{summaryData.overview.activeSub}</span></h3>
        </div>
        <div className={styles.expenses}>
          <h3>Средний расход за месяц<br /><span className={styles.mainExpenses}>{summaryData.overview.averageMonth} ₽</span></h3>
        </div>
      </div>
      <div className={styles.graphsBlock}>
        <div className={styles.timeGraph}>
          <h2>Динамика расходов</h2>
          <div className={styles.graph}>
            <Graph spendingOverTime={summaryData.spendingOverTime} />
          </div>
        </div>
        <div className={styles.timeGraph}>
          <h2>Распределение по категориям</h2>
          <div className={styles.diagramm}>
            <div className={styles.tabs}>
              <div 
                onClick={() => setTypeDiagram('category')} 
                className={`${styles.tab} ${typeDiagram === 'category' ? styles.active : styles.inactive}`}
              >
                {typeDiagrammData ? 'Категории' : 'Подписки'}
              </div>
              <div 
                onClick={() => setTypeDiagram('active')} 
                className={`${styles.tab} ${typeDiagram === 'active' ? styles.active : styles.inactive}`}
              >
                Статус активности
              </div>
            </div>
            <Diagramm diagrammData={diagrammData} typeDiagram={typeDiagram}/>
          </div>
        </div>
      </div>
      <div className={styles.cardsBlock}>
        <h2>Top 5 самых дорогих подписок</h2>
        {summaryData.topSubscriptions.map(card => (
          <AnaliticsCard 
            key={card.id} 
            cardSub={card} 
            onDetailsShowModal={(id) => onDetailsShowModal('top', id)}
          />
        ))}
      </div>
      <div className={styles.cardsBlock}>
        <h2>Повторяющияся расходы</h2>
        {summaryData.recurringPayments.map(card => (
          <AnaliticsCard 
            key={card.id} 
            cardSub={card} 
            onDetailsShowModal={(id) => onDetailsShowModal('recur', id)}
          />
        ))}
      </div>
      <div className={styles.cardsBlock}>
        <h2>Рекомендации</h2>
        <div className={styles.recommendations}>
          {summaryData.recommendations.map(({id, header, message, type}) => (
            <div className={styles.recommendate} key={id}>
              <div className={`${styles.flag} ${styles[type]}`}></div>
              <h5 className={styles.recommHead}>{header}</h5>
              <p className={styles.messageRecomm}>{message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Analitics;