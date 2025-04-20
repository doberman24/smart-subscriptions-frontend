import SubscriptionIcon from '@/components/ui/SubscriptionIcon'
import styles from './CardSubscription.module.css'
import ButtonElement from '@/components/ui/ButtonElement/ButtonElement'
import { useEffect, useRef, useState } from 'react';

const CardSubscription = ({cardSub, page}) => {
    const {titleSub, amount, billingDate, recurrence, isPaid, category, status} = cardSub;

    const titleHeader = useRef(null);
    const [clickOnCard, setClickOnCard] = useState('');

    let nextBillingDate = new Date (billingDate);
    const formatBillingDate = page === 'dashboard' ? 
        nextBillingDate.toLocaleDateString('ru-RU', {day: 'numeric', month: 'short'}) :
        nextBillingDate.toLocaleDateString('ru-RU');
    let lastBillingDate = new Date (nextBillingDate)
    lastBillingDate.setMonth(nextBillingDate.getMonth() - 1);
    
    nextBillingDate = nextBillingDate.toISOString().split('T')[0];
    lastBillingDate = lastBillingDate.toISOString().split('T')[0];

    const checkPayStatus = (lastBilling, nextBilling, isPaid, status) => {
        const currentDate = new Date().toISOString().split('T')[0];
        if (status !== 'active') return {statusPayColor: 'notActive', statusPay: 'Не определено', statusSubscription: 'Не активно'};
        if (currentDate > nextBilling) return {statusPayColor: 'statusOverdue', statusPay: 'Не оплачено', statusSubscription: 'Активно'};
        if (nextBilling === currentDate && !isPaid) return {statusPayColor: 'statusPending', statusPay: 'Ожидает оплаты', statusSubscription: 'Активно'};
        if (currentDate < nextBilling && currentDate >= lastBilling && isPaid) return {statusPayColor: 'statusPaid', statusPay: 'Оплачено', statusSubscription: 'Активно'};
        return {statusPayColor: '', statusPay: 'Не определено'};
    }

    const {statusPayColor, statusPay, statusSubscription} = checkPayStatus(lastBillingDate, nextBillingDate, isPaid, status);

    const changeCard = (e) => {
        e.stopPropagation();
    }

    return (
        <div className={`${styles.card} ${page === 'subscriptions' ? styles.subscriptions : styles.dashboard} ${clickOnCard && styles.clickCard} 
            ${styles[statusPayColor]}`}
            onMouseDown={() => setClickOnCard('clickCard')}
            onMouseUp={() => setClickOnCard('')}
        >
            <div className={styles.statusCard} style={{visibility: status !== 'active' && 'hidden'}}>{statusPay}</div>
            <div className={`${styles.statusSubscription} ${status === 'active' ? styles.activeStatus : styles.disactiveStatus}`}>{statusSubscription}</div>
            <div className={styles.icon}><SubscriptionIcon name={titleSub} size={40} /></div>
            <h3 className={styles.titleSub} ref={titleHeader}>{titleSub}</h3>
            <div className={styles.category}>{category}</div>
            <div className={styles.pay}>
                <h4 className={styles.amount}>{amount}₽ / мес</h4>
                <h4 className={styles.date}>{status === 'active' ? `до ${formatBillingDate}` : 'В архиве'}</h4>
            </div>
            <div className={styles.buttonsBlock}>
                    <ButtonElement onMouseDown={changeCard} className={'buttonsCard purpleButton addButton'}>Изменить</ButtonElement>
                    <ButtonElement onMouseDown={changeCard} className={'buttonsCard purpleButton delButtonCard'}>Удалить</ButtonElement>
            </div>
        </div>
    )
}

export default CardSubscription