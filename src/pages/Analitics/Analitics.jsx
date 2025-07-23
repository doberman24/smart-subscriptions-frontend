import { useEffect, useState } from 'react';
import styles from './Analitics.module.css'
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import api from '@/api/api';
import loadingStyles from '@/components/ui/Loading.module.css';
import Graph from '@/components/ui/Diagramm/Graph';
import Diagramm from '@/components/ui/Diagramm/Diagramm';
import AnaliticsCard from '@/components/CardSubscription/AnaliticsCard';
import { categoryOptions, sortDateRangeAnaliticsOptions } from '@/constants/options';
import { useDispatch, useSelector } from 'react-redux';
import { getAnalytics } from '@/redux/analytics';
import { resetDataAnalitics } from '@/redux/analytics';
import { useNavigate } from 'react-router-dom';


const Analitics = () => {

  const [analiticData, setAnaliticData] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading, summaryData, message, error} = useSelector(state => state.analitycsData);
  const {token} = useSelector(state => state.token);

  useEffect(() => {
      if (error?.status) {
        dispatch(resetDataAnalitics());
        navigate('/login', {state: {fromApp: true}});
      }
    }, [error, dispatch]);

  useEffect(() => {
    const getData = async () => {
      const data = await api.getAnaliticsData();
      setAnaliticData(data);
    };
    getData();
    dispatch(getAnalytics({token, filter: null}));
  }, [dispatch])


  if (loading || !summaryData.filters || !analiticData) {
    return <div className={loadingStyles.loading}>Загрузка...</div>
  }
  // console.log(summaryData);

  const handleFilterChange = (label) => {
    dispatch(getAnalytics({token, filter: {...summaryData.filters, ...label}}));
  }

  const {
    filters, 
    overview, 
    spendingOverTime, 
    categoryBreakdown, 
    topSubscriptions, 
    recurringPayments,
    recommendations
  } = analiticData;

  // console.log(topSubscriptions);

  return (
    <div className={styles.analiticsPage}>
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
            <Graph spendingOverTime={spendingOverTime} />
          </div>
        </div>
        <div className={styles.timeGraph}>
          <h2>Распределение по категориям</h2>
          <div className={styles.diagramm}>
            <Diagramm diagrammData={categoryBreakdown} typeDiagram={'category'} />
          </div>
        </div>
      </div>
      <div className={styles.cardsBlock}>
        <h2>Top 5 самых дорогих подписок</h2>
        {summaryData.topSubscriptions.map(card => (
          <AnaliticsCard key={card.id} cardSub={card} />
        ))}
      </div>
      <div className={styles.cardsBlock}>
        <h2>Повторяющияся расходы</h2>
        {summaryData.recurringPayments.map(card => (
          <AnaliticsCard key={card.id} cardSub={card} />
        ))}
      </div>
      <div className={styles.cardsBlock}>
        <h2>Рекомендации</h2>
        <div className={styles.recommendations}>
          {recommendations.map(({id, header, message, type}) => (
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