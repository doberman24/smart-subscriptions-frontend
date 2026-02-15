import styles from './CalendarModal.module.css';
import Modal from '@/components/ui/Modal/Modal';
import { toggleModal } from '@/redux/showModal';
import { useCloseModal } from '@/components/ModalContent/useCloseModal';
import { MdInfoOutline } from 'react-icons/md';
import MonthField from '@/components/Calendar/MonthField/MonthField';
import { useEffect, useState } from 'react';
import { useDate } from '@/components/utilites/useDate';
import { useDispatch } from 'react-redux';

const CalendarModal = ({dateData, onShowInfo}) => {
  const dispatch = useDispatch();
  const {getSplitDate, getFormatData} = useDate();
  const now = getSplitDate(new Date());
  const [changeYear, setChangeYear] = useState(now.nowYear);

  const {notifications, sortSubscriptions} = dateData;
  const [formatData, setFormatData] = useState([]);

  const monthList = Array.from({length: 12}, (_, i) => new Date(now.nowYear, i).toLocaleString('ru-RU', {month: 'long'}));
  
  useEffect(() => {
    if (sortSubscriptions) {
      setFormatData(getFormatData(sortSubscriptions));
    }
  }, [sortSubscriptions]);

  const {vision, close} = useCloseModal();
  const closeModal = () => {
      close(() => dispatch(toggleModal(false)));
  }

  const incrementYear = () => {
    setChangeYear(prev => Math.min(prev + 1, 2100));
  }
  const decrementYear = () => {
    setChangeYear(prev => Math.max(prev - 1, 2000));
  }

  return (
    <Modal vision={vision} closeModal={closeModal}>
      <div className={styles.contentBlock}>
        <div className={styles.headModal}>
          <MdInfoOutline className={`${styles.iconInfo} ${styles.icon}`} />
          <div className={styles.yearHeader}>
            <button tabIndex='-1' onClick={() => decrementYear()}>{'<'}</button>
            <h3>{changeYear} год</h3>
            <button tabIndex='-1' onClick={() => incrementYear()}>{'>'}</button>
          </div>
        </div>
        <div className={styles.yearContainer}>
          {monthList.map((month, index) => 
            <div key={month} className={styles.monthList}>
              <MonthField 
                now={now} 
                year={changeYear} 
                month={month} 
                numMonth={index} 
                dateData={{notifications, formatData}}
                onShowInfo={onShowInfo}
              />    
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
};

export default CalendarModal;