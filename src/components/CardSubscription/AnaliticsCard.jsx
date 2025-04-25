import styles from './CardSubscription.module.css';
import SubscriptionIcon from '@/components/ui/SubscriptionIcon';
import ButtonElement from '@/components/ui/ButtonElement/ButtonElement'
import { useRef, useState } from 'react';

const AnaliticsCard = ({cardSub}) => {

  let {titleSub, amount, category, interval, nextPayment} = cardSub;
  if (nextPayment) {
    nextPayment = new Date(nextPayment).toLocaleDateString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric'});
  }

  const [clickOnCard, setClickOnCard] = useState('');
  const changeCard = (e) => {
    e.stopPropagation();
  }

  return (
    <div className={`${styles.analitics} ${styles.card} ${clickOnCard && styles.clickCard}`}
      onMouseDown={() => setClickOnCard('clickCard')}
      onMouseUp={() => setClickOnCard('')}
    >
      <div className={styles.icon}><SubscriptionIcon name={titleSub} size={40} /></div>
      <h3 className={styles.titleSub}>{titleSub}</h3>
      {category ? <div className={styles.category}>{category}</div> : <div className={styles.interval}>{interval}</div>}
        {amount ? 
          <h4 className={styles.amount}>{amount}₽ / мес</h4> : 
          <h4 className={styles.date}><span>Следующий платеж:</span><br />{nextPayment}</h4>
        }
      <div className={styles.buttonsBlock}>
          <ButtonElement onMouseDown={changeCard} className={'buttonsCard purpleButton addButton'}>Подробнее</ButtonElement>
      </div>
    </div>
  )
};

export default AnaliticsCard;