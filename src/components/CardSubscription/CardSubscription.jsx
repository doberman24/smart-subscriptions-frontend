import SubscriptionIcon from '@/components/ui/SubscriptionIcon'
import styles from './CardSubscription.module.css'
import ButtonElement from '@/components/ui/ButtonElement/ButtonElement'

const CardSubscription = ({cardSub}) => {
    const {title, amount, billingDate, lastPaymentDate, isPaid, category, status} = cardSub;

    let nextBillingDate = new Date (billingDate);
    const formatBillingDate = nextBillingDate.toLocaleDateString('ru-RU', {day: 'numeric', month: 'short'});
    let lastBillingDate = new Date (lastPaymentDate);
    
    nextBillingDate = nextBillingDate.toISOString().split('T')[0];
    lastBillingDate = lastBillingDate.toISOString().split('T')[0];

    
    const checkPayStatus = (lastBilling, nextBilling, isPaid, status) => {
        const currentDate = new Date().toISOString().split('T')[0];
        if (status !== 'active') return {color: '', statusCard: 'Не активно'};
        if (currentDate > nextBilling) return { color: '#fde2e2', statusCard: 'Активно'};
        if (nextBilling === currentDate && !isPaid) return {color: '#fff9db', statusCard: 'Активно'};
        if (currentDate < nextBilling && currentDate >= lastBilling && isPaid) return {color: '#e3f9e5', statusCard: 'Активно'};
    }


    const {color, statusCard} = checkPayStatus(lastBillingDate, nextBillingDate, isPaid, status);

    return (
        <div className={styles.card} 
            style={{backgroundColor: color}}
        >
            <div className={styles.icon}><SubscriptionIcon name={title} size={60} /></div>
            <div className={styles.titleBlock}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.category}>{category}</div>
            </div>
            <div className={styles.pay}>
                <h4 className={styles.amount}>{amount}₽</h4>
                <h4 className={styles.date}>до {formatBillingDate}</h4>
            </div>
            <div className={styles.statusIcon}></div>
            <div className={`${styles.statusSubscription} ${status == 'active' ? styles.activeStatus : styles.disactiveStatus}`}>{statusCard}</div>
            <div className={styles.buttonsBlock}>
                    <ButtonElement className={'buttonsCard purpleButton'}>Изменить</ButtonElement>
                    <ButtonElement className={'buttonsCard pinkButton'}>Удалить</ButtonElement>
            </div>
        </div>
    )
}

export default CardSubscription