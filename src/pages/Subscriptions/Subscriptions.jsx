import styles from './Subscriptions.module.css';
import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';

const Subscriptions = () => {
  
  return (
    <div className={styles.subscriptionsPage}>
      <div className={styles.headerBlock}>
      <h1>Мои подписки</h1>
        <ButtonElement className={'addButton purpleButton'}>🞣 Добавить подписку</ButtonElement>
      </div>
    </div>
  )
}

export default Subscriptions;