import SubscriptionIcon from '@/components/ui/SubscriptionIcon'
import styles from './CardSubscription.module.css'
import ButtonElement from '@/components/ui/ButtonElement/ButtonElement'
import { useEffect, useRef, useState } from 'react';

const CardSubscription = ({cardSub, page}) => {
    const {titleSub, amount, billingDate, recurrence, isPaid, category, status} = cardSub;

    const titleHeader = useRef(null);

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
        if (status !== 'active') return {color: '', statusCard: 'Не активно'};
        if (currentDate > nextBilling) return { color: '#fde2e2', statusCard: 'Активно'};
        if (nextBilling === currentDate && !isPaid) return {color: '#fff9db', statusCard: 'Активно'};
        if (currentDate < nextBilling && currentDate >= lastBilling && isPaid) return {color: '#e3f9e5', statusCard: 'Активно'};
        return {color: '', statusCard: 'Не определено'};
    }

    const {color, statusCard} = checkPayStatus(lastBillingDate, nextBillingDate, isPaid, status);

    return (
        <div className={`${styles.card} ${page === 'subscriptions' ? styles.subscriptions : styles.dashboard}`} 
            style={{backgroundColor: color, filter: status !== 'active' && 'grayscale(100%)'}}
        >
            <div className={styles.icon}><SubscriptionIcon name={titleSub} size={60} /></div>
            <h3 className={styles.titleSub} ref={titleHeader}>{titleSub}</h3>
            <div className={styles.category}>{category}</div>
            <div className={styles.pay}>
                <h4 className={styles.amount}>{amount}₽ / мес</h4>
                <h4 className={styles.date} style={{visibility: status !== 'active' && 'hidden'}}>до {formatBillingDate}</h4>
            </div>
            <div className={styles.statusIcon}></div>
            <div className={`${styles.statusSubscription} ${status === 'active' ? styles.activeStatus : styles.disactiveStatus}`}>{statusCard}</div>
            <div className={styles.buttonsBlock}>
                    <ButtonElement className={'buttonsCard purpleButton'}>Изменить</ButtonElement>
                    <ButtonElement className={'buttonsCard pinkButton'}>Удалить</ButtonElement>
            </div>
        </div>
    )
}

export default CardSubscription