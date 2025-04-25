import { useEffect, useState } from 'react';
import styles from './Analitics.module.css'
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import api from '@/api/api';
import loadingStyles from '@/components/ui/Loading.module.css';
import Graph from '@/components/ui/Diagramm/Graph';
import Diagramm from '@/components/ui/Diagramm/Diagramm';
import AnaliticsCard from '@/components/CardSubscription/AnaliticsCard';


const Analitics = () => {

  const [analiticData, setAnaliticData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const data = await api.getAnaliticsData();
      setAnaliticData(data);
    };
    getData();
  }, [])

  if (!analiticData) {
    return <div className={loadingStyles.loading}>Загрузка...</div>
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

  const rangeDate = ['Последние 30 дней', '3 месяца', '6 месяцев', 'Год', 'Все'];
  const category = categoryBreakdown.map(item => item.category);

  return (
    <div className={styles.analiticsPage}>
      <div className={styles.headerBlock}>
        <h1>Аналитика</h1>
        <div className={styles.filtersBlock}>
          <Dropdown list={rangeDate} defaultSelect={filters.selectedPeriod}/>
          <Dropdown list={category} defaultSelect={filters.subscriptionType} addDefault={true}/>
        </div>
      </div>
      <div className={styles.expensesBlock}>
        <div className={styles.expenses}>
          <h3>Общие расходы<br /><span className={styles.mainExpenses}>{overview.totalSpent} ₽</span></h3>
        </div>
        <div className={styles.expenses}>
          <h3>Активные подписки<br /><span className={styles.mainExpenses}>{overview.activeSubscriptions}</span></h3>
        </div>
        <div className={styles.expenses}>
          <h3>Средний расход за месяц<br /><span className={styles.mainExpenses}>{overview.averageMonthly} ₽</span></h3>
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
        {topSubscriptions.map(card => (
          <AnaliticsCard key={card.id} cardSub={card} />
        ))}
      </div>
      <div className={styles.cardsBlock}>
        <h2>Повторяющияся расходы</h2>
        {recurringPayments.map(card => (
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