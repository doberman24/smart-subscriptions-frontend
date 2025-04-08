import SubscriptionIcon from '@/components/ui/SubscriptionIcon'
import styles from './CardSubscription.module.css'

const CardSubscription = ({cardSub}) => {
    const {title, amount, billingDate, category, status} = cardSub;

    const date = new Date (billingDate).toLocaleDateString('ru-RU', {day: 'numeric', month: 'short'});

    return (
        <div className={styles.card}>
            <div className={styles.icon}><SubscriptionIcon name={title} size={60} /></div>
            <div className={styles.titleBlock}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.category}>{category}</div>
            </div>
            <div className={styles.pay}>
                <h4 className={styles.amount}>{amount}₽</h4>
                <h4 className={styles.date}>{date}</h4>
            </div>
        </div>
    )
}

export default CardSubscription