import styles from './MonthField.module.css';
import { useState } from 'react';

const MonthField = ({
  now, 
  year, 
  month, 
  numMonth, 
  dateData, 
  headerYear = false, 
  onShowCalendarModal = () => {},
  onShowInfo
}) => {
  
  const {notifications, formatData} = dateData;

  const numberDays = new Date(year, numMonth + 1, 0).getDate();
  const days = Array.from({length: numberDays}, (_, i) => i + 1);
  
  const prepareWeekMesh = (days) => {
    const weekMesh = {'пн': [], 'вт': [], 'ср': [], 'чт': [], 'пт': [], 'сб': [], 'вс': [],};
    const weekdaysNames = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];
    const dayIndexMap = [6, 0, 1, 2, 3, 4, 5];
    
    days.forEach(day => {
      const date = new Date(year, numMonth, day)
      const weekDayIndex = dayIndexMap[date.getDay()];
      const weekday = weekdaysNames[weekDayIndex];
      weekMesh[weekday].push(day);
    })
    const firstDay = new Date(year, numMonth, 1).getDay();
    const firstDayShift = firstDay === 0 ? 6 : firstDay - 1;

    weekdaysNames.forEach((weekday, index) => {
      if (index < firstDayShift) weekMesh[weekday] = ['', ...weekMesh[weekday]];
    });
    return weekMesh;
  }

  const dayList = prepareWeekMesh(days);
  

  const extractDateParts = (date) => ({
    payDay: date.nextPaymentDate.nowDate,
    payMonth: date.nextPaymentDate.nowNumMonth,
    payYear: date.nextPaymentDate.nowYear,
  });

  const isDateMatch = (data, currentDate, numMonth, year) => {
    return( 
      (data.nowDate === currentDate) && 
      (data.nowNumMonth === numMonth) && 
      (data.nowYear === year) 
    );
  }

  const pay = (currentDate) => {
    const events = formatData.reduce((acc, event) => {
      const eventParams = {};
      if (isDateMatch(event.nextPaymentDate, currentDate, numMonth, year)) {
        eventParams.name = event.name;
        eventParams.amount = event.amount;
      }
      const history = event.paidHistory.find(historyEvent => (isDateMatch(historyEvent.datePayment, currentDate, numMonth, year)));
      if (history) {
        if (!eventParams.name) eventParams.name = event.name;
        eventParams.historyPayment = history.amountPayment;
      }
      
      if (Object.keys(eventParams).length > 0) {
        acc.push(eventParams);
      }

      return acc;
    }, [])
    return events;
  }

  const addStyleClass = (key, day) => {
    const classList = [];
    if (day) classList.push(styles.validDate);
    if (key === 'сб' || key === 'вс') classList.push(styles.weekend);
    if (day && day === now.nowDate && numMonth === now.nowNumMonth) {
      year === now.nowYear ? classList.push(styles.today) : classList.push(styles.todayOutline)
    } 

    formatData.forEach(item => {

      const {payDay, payMonth, payYear} = extractDateParts(item);
      const daysBefore = notifications.reminders ? now.nowDate + notifications.reminderDaysBefore : now.nowDate;
      const isPay = payDay > daysBefore || payMonth > now.nowNumMonth || payYear > now.nowYear;

      if (isDateMatch(item.nextPaymentDate, day, numMonth, year)) {
        isPay && item.paidStatus ? checkDublicate(classList, styles.paidDate) : 
          (payDay >= now.nowDate && payDay <= daysBefore) ? 
          checkDublicate(classList, styles.waitingPay) : checkDublicate(classList, styles.expired);
      }
      item.paidHistory.forEach(paid => {
        if ((isDateMatch(paid.datePayment, day, numMonth, year))) {
          checkDublicate(classList, styles.history);
        }
      });
    });

    return classList.join(' ');
  }

  const checkDublicate = (list, checkValue) => {
    if (list.every(item => !item.includes(checkValue.split('_')[1]))) { 
      list.push(checkValue);
    }
    return list;
  }

  return (
    <div className={styles.monthContainer}>
      <div className={`${styles.headerMonth} ${headerYear ? styles.headerPointer : ''}`} onClick={onShowCalendarModal}>
        <h2>{month}</h2>
        {headerYear && <h2>{year} год</h2>}
      </div>
      <div className={styles.monthBlock}>
        {Object.entries(dayList).map(([key, value]) => 
          <div className={styles.weekBlock} key={key}>
            <h4 className={key === 'сб' || key === 'вс' ? styles.headWeekend : ''}>{key}</h4>
            <ul>
              {value.map((item, index) =>
                <li 
                  onClick={(e) => onShowInfo(true, pay(item), e)} 
                  onMouseOut={() => onShowInfo(false)}
                  className={addStyleClass(key, item)} 
                  key={index}
                >
                  {item}
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default MonthField;
