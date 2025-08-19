import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import styles from './ModalContent.module.css';
import { useDispatch } from 'react-redux';
import { toggleModal } from '@/redux/showModal';
import Modal from '@/components/ui/Modal/Modal';
import SubscriptionIcon from '@/components/ui/SubscriptionIcon';
import { useCloseModal } from './useCloseModal';
import { MdInfoOutline } from 'react-icons/md';
import { useEffect } from 'react';
import { resetDetails } from '@/redux/analytics';
import { categoryOptions, recurrenceOptions } from '@/constants/options';

const TopDataModal = ({detailsType, message, typeInfo}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    message = null;
  }, []);

  useEffect(() => {
    if(message && Object.keys(message).length > 0) {
      console.log(message.details);
    }
  }, [message]);

  const {vision, close} = useCloseModal();
  const closeModal = () => {
    setTimeout(() => dispatch(resetDetails()), 101);
    close(() => dispatch(toggleModal(false)));
  }

  const getDate = (date, type) => {
    const setDate = new Date(date);
    const options = type === 'short' ? { year: 'numeric', month: 'numeric', day: 'numeric' } : { year: 'numeric', month: 'long', day: 'numeric' };
    return setDate.toLocaleDateString('ru-RU', options);
  }

  const getHistory = (history, type) => {
    return type === 'short' ? history : [...history, {datePayment: message.details.nextPaymentDate, amountPayment: message.details.amount}];
  }

  return (
    <Modal vision={vision} closeModal={closeModal}>
      <div className={styles.detailsModal}>
        {message.details && <div className={styles.contentBlock}>
          <div className={styles.headModal}>
            {typeInfo === 'info' && <MdInfoOutline className={`${styles.iconInfo} ${styles.icon}`} />}
            <div className={styles.headSub}>
              <SubscriptionIcon name={message.details?.name} size={40} />
              <h1>{message.details?.name}</h1>
            </div>
          </div>
          <h6>
            {detailsType === 'top' ? 
              categoryOptions.find(item => item.label === message.details?.category).value : 
              recurrenceOptions.find(item => item.label === message.details?.recurrence).value
            }
          </h6>
            <h2>{detailsType === 'top' ? 'Основные показатели' : 'Ближайше списание'}</h2>
            {detailsType === 'top' ?
              <div className={styles.expensesBlock}>
                <div className={styles.expenses}>
                  <h3>Вся сумма, уплаченная за подписку<br /><span className={styles.mainExpenses}>{message.details?.paidSum} ₽</span></h3>
                </div>
                <div className={styles.expenses}>
                  <h3>Доля подписки в общей сумме<br /><span className={styles.mainExpenses}>{message.details?.percentSub}%</span></h3>
                </div>
              </div> 
              :
              <div className={styles.recurringBlock}>
                <div className={styles.nextDatePaid}>
                  {getDate(message.details.nextPaymentDate, 'full')}
                </div>
                <div className={styles.amountNext}>
                  {message.details.amount} ₽
                </div>
              </div>
            }
          <h2>{detailsType === 'top' ? 'История платежей' : 'График платежей'}</h2>
          <div className={styles.paidHistory}>
            {getHistory(message.details.history, detailsType === 'top' ? 'short' : 'full').map((item, index) => (
              <div className={detailsType === 'recur' && index === message.details.history.length ? `${styles.payment} ${styles.paymentNext}` : styles.payment} key={index}>
                <div 
                  className={`${styles.amountPaid} ${detailsType === 'top' && message.details.history.length < 2 ? '' : styles.linePaid}`}
                  style={{ borderBottom: detailsType === 'recur' && index === message.details.history.length ? '#b5b5b6 dashed 1px' : ''}}
                >
                  {item.amountPayment} ₽
                </div>
                <div className={detailsType === 'recur' && index === message.details.history.length ? styles.arrow : styles.marker}></div>
                <div className={styles.datePaid}>
                  {getDate(item.datePayment, 'short')}
                </div>
              </div>
            ))}
          </div>
          <div className={styles.buttonsBlock}>
            <ButtonElement onClick={closeModal} className={'addButton modalButton'}>OK</ButtonElement>
          </div>
        </div>}
      </div>
    </Modal>
  )
};

export default TopDataModal;