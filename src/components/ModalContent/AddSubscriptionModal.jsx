import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import styles from './ModalContent.module.css';
import { useDispatch } from 'react-redux';
import { toggleModal } from '@/redux/showModal';
import Modal from '@/components/ui/Modal/Modal';
import { useCloseModal } from './useCloseModal';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import { recurrenceOptions, categoryOptions, paidStatusOptions, activityStatusOptions } from '@/constants/options';

const AddSubscriptionModal = ({onCreateSubscription, onChangeSubscription, data = null}) => {
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    name: '',
    amount: '',
    nextPaymentDate: '',
    recurrence: '',
    category: '',
    activityStatus: true,
    paidStatus: true,
  })

  useEffect(() => {
    if(data) {
      const paymentDate = new Date(data.nextPaymentDate).toISOString().slice(0, 10);
      setFormValue({...data, nextPaymentDate: paymentDate});
    }
  }, [])

  const {vision, close} = useCloseModal();
  const closeModal = () => {
    close(() => dispatch(toggleModal(false)));
  }

  const addSubscription = async (e, formValue) => {
    e.preventDefault();

    data ? await onChangeSubscription(formValue) : await onCreateSubscription(formValue);
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
          <h3>{`${data ? 'Внесение изменений в подписку' : 'Создание подписки'}`}</h3>
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
              required={true}
          />
          </label>  
          <div className={styles.dropdownLabel}>
            <h6>Категория</h6>
              <Dropdown 
                list={categoryOptions}
                value={categoryOptions.find(({label}) => label === formValue.category) || categoryOptions[0]} 
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
              required={true}
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
              required={true}
          />
          </label>  
          <div className={styles.dropdownLabel}>
            <h6>Периодичность</h6>
            <Dropdown 
              list={recurrenceOptions}
              value={recurrenceOptions.find(({label}) => label === formValue.recurrence) || recurrenceOptions[1]} 
              onChange={({label}) => setFormValue(item => ({...item, recurrence: label}))} 
            />
          </div>
          <div className={styles.dropdownLabel}>
            <h6>Статус оплаты</h6>
            <Dropdown 
              list={paidStatusOptions}
              value={paidStatusOptions.find(({label}) => label === formValue.paidStatus) || paidStatusOptions[0]} 
              onChange={({label}) => setFormValue(item => ({...item, paidStatus: label}))} 
              placeholder={'Выберите статус'}
            />
          </div>
          <div className={styles.dropdownLabel}>
            <h6>Статус подписки</h6>
            <Dropdown 
              list={activityStatusOptions}
              value={activityStatusOptions.find(({label}) => label === formValue.activityStatus) || activityStatusOptions[0]} 
              onChange={({label}) => setFormValue(item => ({...item, activityStatus: label}))} 
              placeholder={'Выберите статус'}
            />
          </div>
          <div className={styles.buttonsBlock}>
            <ButtonElement type={'button'} onClick={closeModal} className={'exitButton modalButton'}>Отмена</ButtonElement>
            <ButtonElement className={'addButton modalButton'}>{`${data ? 'Сохранить' : 'Добавить'}`}</ButtonElement>
          </div>
        </form>
      </div>
    </Modal>
  )
};

export default AddSubscriptionModal;