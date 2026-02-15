import { useEffect, useState } from 'react';
import styles from './CalendarField.module.css';
import MonthField from '@/components/Calendar/MonthField/MonthField';
import { useDate } from '@/components/utilites/useDate';

const CalendarField = ({dateData, onShowCalendarModal, onShowInfo}) => {
  const {notifications, sortSubscriptions} = dateData;
  const [formatData, setFormatData] = useState([]);
  const {getSplitDate, getFormatData} = useDate();

  const now = getSplitDate(new Date());

  useEffect(() => {
    if (sortSubscriptions) {
      setFormatData(getFormatData(sortSubscriptions));
    }
  }, [sortSubscriptions]);

  return (
    <div className={styles.calendar}>
      <div className={styles.month}>
        <MonthField 
          now={now}
          year={now.nowYear} 
          month={now.nowMonth} 
          numMonth={now.nowNumMonth}
          dateData={{notifications, formatData}}
          headerYear={true}
          onShowCalendarModal={onShowCalendarModal}
          onShowInfo={onShowInfo}
        />    
      </div>
    </div>
  )
}

export default CalendarField;
