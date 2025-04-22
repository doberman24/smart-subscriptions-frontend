import { useEffect, useState } from 'react';
import styles from './Analitics.module.css'
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import api from '@/api/api';
import loadingStyles from '@/components/ui/Loading.module.css';

const Analitics = () => {

  const [analiticData, setAnaliticData] = useState({});

  useEffect(() => {
    const getData = async () => {
      const data = await api.getAnaliticsData();
      setAnaliticData(data);
    };
    getData();
  }, [])
  if (!analiticData.topSubscriptions) {
    return <div className={loadingStyles.loading}>Загрузка...</div>
  }
  console.log(analiticData);

  const rangeDate = ['Все', 'Последние 30 дней', '3 месяца', '6 месяцев', 'Год'];

  return (
    <div className={styles.analiticsPage}>
      <div className={styles.headerBlock}>
        <h1>Аналитика</h1>
        <div className={styles.filtersBlock}>
          <Dropdown list={rangeDate} type={'dates'} />
        </div>
      </div>
    </div>
  )
}

export default Analitics;