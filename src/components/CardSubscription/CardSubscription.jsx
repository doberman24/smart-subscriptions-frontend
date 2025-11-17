import SubscriptionIcon from '@/components/ui/SubscriptionIcon'
import styles from './CardSubscription.module.css'
import ButtonElement from '@/components/ui/ButtonElement/ButtonElement'
import { useRef, useState } from 'react';
import { categoryOptions } from '@/constants/options';

const CardSubscription = ({cardSub, page, onDeleteShowModal, onChangeShowModal}) => {

    const {id, name, amount, nextPaymentDate, recurrence, paidStatus, paidDate, category, activityStatus} = cardSub;

    const titleHeader = useRef(null);
    const [clickOnCard, setClickOnCard] = useState('');

    let nextBillingDate = new Date (nextPaymentDate);
    const formatBillingDate = page === 'dashboard' ? 
        nextBillingDate.toLocaleDateString('ru-RU', {day: 'numeric', month: 'short'}) :
        nextBillingDate.toLocaleDateString('ru-RU');

    nextBillingDate = nextBillingDate.toISOString().split('T')[0];
    const lastBillingDate = paidDate.split('T')[0];

    const categoryCard = categoryOptions.find(item => item.label === category);

    const checkPayStatus = (lastBilling, nextBilling, paidStatus, activityStatus) => {
        const currentDate = new Date().toISOString().split('T')[0];
        if (!activityStatus) return {statusPayColor: 'notActive', statusPay: 'Не определено', statusSubscription: 'Не активно'};
        if (currentDate > nextBilling) return {statusPayColor: 'statusOverdue', statusPay: 'Не оплачено', statusSubscription: 'Активно'};
        if ((nextBilling === currentDate) && !paidStatus) return {statusPayColor: 'statusPending', statusPay: 'Ожидает оплаты', statusSubscription: 'Активно'};
        if (currentDate < nextBilling || (currentDate >= lastBilling && paidStatus)) return {statusPayColor: 'statusPaid', statusPay: 'Оплачено', statusSubscription: 'Активно'};
        return {statusPayColor: '', statusPay: 'Не определено'};
    }

    const {statusPayColor, statusPay, statusSubscription} = checkPayStatus(lastBillingDate, nextBillingDate, paidStatus, activityStatus);

    const deleteCard = (e, idCard) => {
        e.stopPropagation();
        onDeleteShowModal(idCard);
    }

    const changeCard = (e, idCard) => {
        e.stopPropagation();
        onChangeShowModal(idCard);
    }

    return (
        <div className={`${styles.card} ${page === 'subscriptions' ? styles.subscriptions : styles.dashboard} ${clickOnCard && styles.clickCard} 
            ${styles[statusPayColor]}`}
            onMouseDown={() => setClickOnCard('clickCard')}
            onMouseUp={() => setClickOnCard('')}
            onClick={() => onChangeShowModal(id)}
        >
            <div className={styles.statusCard} style={{visibility: !activityStatus && 'hidden'}}>{statusPay}</div>
            <div className={`${styles.statusSubscription} ${activityStatus ? styles.activeStatus : styles.disactiveStatus}`}>{statusSubscription}</div>
            <div className={styles.icon}><SubscriptionIcon name={name} size={40} /></div>
            <h3 className={styles.titleSub} ref={titleHeader}>{name}</h3>
            <div className={styles.category}>{categoryCard.value}</div>
            <div className={styles.pay}>
                <h4 className={styles.amount}>{amount}₽ / мес</h4>
                <h4 className={styles.date}>{activityStatus ? `до ${formatBillingDate}` : 'В архиве'}</h4>
            </div>
            <div className={styles.buttonsBlock}>
                <ButtonElement onMouseDown={(e) => changeCard(e, id)} className={'buttonsCard purpleButton addButton'}>Изменить</ButtonElement>
                <ButtonElement onMouseDown={(e) => deleteCard(e, id)} className={'buttonsCard purpleButton delButtonCard'}>Удалить</ButtonElement>
            </div>
        </div>
    )
}

export default CardSubscription