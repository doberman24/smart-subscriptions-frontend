import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import styles from './ModalContent.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '@/redux/showModal';
import Modal from '@/components/ui/Modal/Modal';
import { useCloseModal } from './useCloseModal';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useState } from 'react';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import { recurrenceOptions, categoryOptions, paidStatusOptions, activityStatusOptions } from '@/constants/options';
import api from '@/api/api';

const AddSubscriptionModal = ({onCreateSubscriptions}) => {
  const dispatch = useDispatch();
  const {token} = useSelector(state => state.token);

  const [formValue, setFormValue] = useState({
    name: '',
    amount: '',
    nextPaymentDate: '',
    recurrence: '',
    category: '',
    activityStatus: false,
    paidStatus: false,
  })

  const {vision, close} = useCloseModal();
  const closeModal = () => {
    close(() => dispatch(toggleModal(false)));
  }

  const addSubscription = async (e, formValue) => {
    e.preventDefault();
    await onCreateSubscriptions(formValue);
    close(() => dispatch(toggleModal(false)));
  }

  const handleChange = (e) => {
    setFormValue({
      ...formValue, 
      [e.target.name]: e.target.value
    });
  }

  return (
    <Modal vision={vision} closeModal={closeModal}>
      <div className={styles.contentBlock}>
        <div className={styles.headModal}>
          <AiOutlineQuestionCircle className={`${styles.iconQuestion} ${styles.icon}`} />
          <h3>Создание подписки</h3>
        </div>
        <form className={styles.formBlock} onSubmit={(e) => addSubscription(e, formValue)}>
          <label>
          Название
          <input 
              name='name'
              type='text'
              value={formValue.name} 
              onChange={handleChange} 
              placeholder='Например, Netflix'
              // required={true}
          />
          </label>  
          <div className={styles.dropdownLabel}>
            <h6>Категория</h6>
              <Dropdown 
                list={categoryOptions}
                value={categoryOptions[0]} 
                onChange={({label}) => setFormValue(item => ({...item, category: label}))} 
                placeholder={'Выберите категорию'}
              />
          </div>
          <label>
          Стоимость в рублях
          <input 
              name='amount' 
              type='number' 
              value={formValue.amount} 
              onChange={handleChange} 
              placeholder='Введите сумму'
              // required={true}
          />
          </label>  
          <label className={styles.dateLabel}>
          Дата оплаты
          <input 
              name='nextPaymentDate' 
              type='date'
              value={formValue.nextPaymentDate} 
              onChange={handleChange} 
              placeholder='Введите дату'
              // required={true}
          />
          </label>  
          <div className={styles.dropdownLabel}>
            <h6>Периодичность</h6>
            <Dropdown 
              list={recurrenceOptions}
              value={recurrenceOptions[1]} 
              onChange={({label}) => setFormValue(item => ({...item, recurrence: label}))} 
            />
          </div>
          <div className={styles.dropdownLabel}>
            <h6>Статус оплаты</h6>
            <Dropdown 
              list={paidStatusOptions}
              value={paidStatusOptions[0]} 
              onChange={({label}) => setFormValue(item => ({...item, paidStatus: label}))} 
              placeholder={'Выберите статус'}
            />
          </div>
          <div className={styles.dropdownLabel}>
            <h6>Статус подписки</h6>
            <Dropdown 
              list={activityStatusOptions}
              value={activityStatusOptions[0]} 
              onChange={({label}) => setFormValue(item => ({...item, activityStatus: label}))} 
              placeholder={'Выберите статус'}
            />
          </div>
          <div className={styles.buttonsBlock}>
            <ButtonElement type={'button'} onClick={closeModal} className={'exitButton modalButton'}>Отмена</ButtonElement>
            <ButtonElement className={'addButton modalButton'}>Добавить</ButtonElement>
          </div>
        </form>
      </div>
    </Modal>
  )
};

export default AddSubscriptionModal;