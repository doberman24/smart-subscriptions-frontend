import styles from './CardSubscription.module.css';
import SubscriptionIcon from '@/components/ui/SubscriptionIcon';
import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import { categoryOptions, recurrenceOptions } from '@/constants/options';
import { useRef, useState } from 'react';

const AnaliticsCard = ({cardSub}) => {

  let {name, amount, category, recurrence, nextPaymentDate} = cardSub;
  if (nextPaymentDate) {
    nextPaymentDate = new Date(nextPaymentDate).toLocaleDateString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric'});
  }
  
  const categoryCard = categoryOptions.find(item => item.label === category);
  const recurrenceCard = recurrenceOptions.find(item => item.label === recurrence);

  const [clickOnCard, setClickOnCard] = useState('');
  const changeCard = (e) => {
    e.stopPropagation();
  }

  return (
    <div className={`${styles.analitics} ${styles.card} ${clickOnCard && styles.clickCard}`}
      onMouseDown={() => setClickOnCard('clickCard')}
      onMouseUp={() => setClickOnCard('')}
    >
      <div className={styles.icon}>
        <SubscriptionIcon name={name} size={40} />
      </div>
      <h3 className={styles.titleSub}>{name}</h3>
      {category ? <div className={styles.category}>{categoryCard.value}</div> : <div className={styles.interval}>{recurrenceCard.value}</div>}
        {amount ? 
          <h4 className={styles.amount}>{amount}₽ / мес</h4> : 
          <h4 className={styles.date}><span>Следующий платеж:</span><br />{nextPaymentDate}</h4>
        }
      <div className={styles.buttonsBlock}>
          <ButtonElement onMouseDown={changeCard} className={'buttonsCard purpleButton addButton'}>Подробнее</ButtonElement>
      </div>
    </div>
  )
};

export default AnaliticsCard;