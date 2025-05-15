import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import styles from './ModalContent.module.css';
import { useDispatch } from 'react-redux';
import { toggleModal } from '@/redux/showModal';
import Modal from '@/components/ui/Modal/Modal';
import { useCloseModal } from './useCloseModal';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useState } from 'react';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import { recurrenceOptions, categoryOptions, paidStatusOptions, statusOptions } from '@/constants/options';

const AddSubscriptionModal = () => {
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    titleSub: '',
    amount: '',
    billingDate: '',
    recurrence: '',
    category: '',
    status: '',
    isPaid: '',
  })

  const {vision, close} = useCloseModal();
  const closeModal = () => {
    close(() => dispatch(toggleModal(false)));
  }

  const addSubscription = (e, formValue) => {
    e.preventDefault();
    console.log(formValue);
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
              name='titleSub'
              type='text'
              value={formValue.titleSub} 
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
              name='billingDate' 
              type='date'
              value={formValue.billingDate} 
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
              onChange={({label}) => setFormValue(item => ({...item, isPaid: label}))} 
              placeholder={'Выберите статус'}
            />
          </div>
          <div className={styles.dropdownLabel}>
            <h6>Статус подписки</h6>
            <Dropdown 
              list={statusOptions}
              value={statusOptions[0]} 
              onChange={({label}) => setFormValue(item => ({...item, status: label}))} 
              placeholder={'Выберите статус'}
            />
          </div>
          <div className={styles.buttonsBlock}>
            <ButtonElement type={'button'} onClick={closeModal} className={'exitButton modalButton'}>Отмена</ButtonElement>
            <ButtonElement className={'addButton modalButton'}>Сменить пароль</ButtonElement>
          </div>
        </form>
      </div>
    </Modal>
  )
};

export default AddSubscriptionModal;