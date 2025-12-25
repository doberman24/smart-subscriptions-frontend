import styles from './Subscriptions.module.css';
import loadingStyles from '@/components/ui/Loading.module.css';
import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import { FaSearch } from 'react-icons/fa';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import CardSubscription from '@/components/CardSubscription/CardSubscription';
import HandleSubscriptionModal from '@/components/ModalContent/HandleSubscriptionModal';
import { categoryOptions, sortSubscriptionsOptions } from '@/constants/options';
import { getSubscriptions } from '@/redux/subscriptions';
import InfoModal from '@/components/ModalContent/InfoModal';
import DeleteSubscriptionModal from '@/components/ModalContent/DeleteSubscriptionModal';
import { useNavigate } from 'react-router-dom';
import { useHandleSubscription } from '@/components/utilites/useCreateSubscription';
import { useModals } from '@/components/ModalContent/useModals';
import { useDeleteSubscription } from '@/components/utilites/useDeleteSubscription';

const Subscriptions = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {subscriptionsList, loading, message, error} = useSelector(state => state.subscriptions);
  const isModal = useSelector(state => state.showModal);
  const {token} = useSelector(state => state.token);
  const {user} = useSelector(state => state.user.userData);

  const [idCard, setIdCard] = useState(null);
  const [findName, setFindName] = useState('');
  const [sortCategory, setSortCategory] = useState({label: 'all', value: 'Все'});
  const [sortCoast, setSortCoast] = useState(sortSubscriptionsOptions[0]);
  const [sortPrice, setSortPrice] = useState({from: '', to: ''});
  const [sortSubscriptions, setSortSubscriptions] = useState(subscriptionsList);

  const [infoTypeModal, setInfoTypeModal] = useState('');
  const {onHandleSub} = useHandleSubscription({setInfoTypeModal});
  const {onDelSub} = useDeleteSubscription({setInfoTypeModal});
  const {onDeleteShowModal, onChangeShowModal, showAddModal} = useModals({setIdCard});

  useEffect(() => {
    dispatch(getSubscriptions(token));
  }, [token, dispatch, location]);


  useEffect(() => {
    if (error?.status) {
      navigate('/login', {state: {fromApp: true}});
    }
    if (user && user.role === 'admin') navigate('/smart-admin', {replace: true});
  }, [user, error, dispatch]);

  useEffect(() => {
    if (!subscriptionsList) return;
    let filtered = [...subscriptionsList];
    filtered = filtered.filter(item => item.name.toLowerCase().includes(findName.toLowerCase()));
    if (sortCategory.label !== 'all') {
      filtered = filtered.filter(item => item.category.toLowerCase().includes(sortCategory.label));
    }
    if (sortCoast.label !== 'no') {
      sortCoast.label === 'cost' && filtered.sort((a, b) => a.amount - b.amount);
      sortCoast.label === 'nextPaymentDay' && filtered.sort((a, b) => new Date(a.nextPaymentDate) - new Date(b.nextPaymentDate));
    }
    if (sortPrice.from || sortPrice.to) {
      filtered = filtered.filter(item => sortPrice.to ? item.amount >= sortPrice.from && item.amount <= sortPrice.to : item.amount >= sortPrice.from);
    }
    setSortSubscriptions(filtered);
  }, [findName, sortCategory, sortCoast, sortPrice, subscriptionsList]);

  if(loading || !subscriptionsList || !user) {
    return <div className={loadingStyles.loading}>Загрузка...</div> 
  }

  const hanleSubscription = async (formData, action) => {
    await onHandleSub(token, formData, action);
  }

  const onDeleteSubscription = async () => {
    await onDelSub(token, idCard);
  }

  return (
    <div className={styles.subscriptionsPage}>
      {isModal.handleSubscriptionModal && 
        <HandleSubscriptionModal 
          onHandleSub={hanleSubscription} 
          data={idCard && subscriptionsList.find(item => item.id === idCard)}
      />}
      {isModal.isInfoModal && <InfoModal message={message} typeInfo={infoTypeModal}/>}
      {isModal.isDeleteSubscriptionModal && <DeleteSubscriptionModal onDeleteSubscription={onDeleteSubscription}/>}
      <div className={styles.headerBlock}>
      <h1>Мои подписки</h1>
        <ButtonElement onClick={showAddModal} className={'addButton purpleButton'}><span className={styles.plus}>+</span> Добавить подписку</ButtonElement>
      </div>
      <div className={styles.filtersBlock}>
        <div className={styles.itemBlock}>
          <h6>Искать:</h6>
          <span className={`${styles.inputFilter} ${styles.searchFilter}`}>
            <FaSearch />
            <input type="text" value={findName} onChange={(e) => setFindName(e.target.value)} placeholder='Название подписки'/>
          </span>
        </div>
        <div className={styles.itemBlock}>
          <h6>Выбрать категорию:</h6>
          <span className={styles.categoryFilter}>
            <Dropdown
              list={[
                {label: 'all', value: 'Все'}, 
                ...categoryOptions.filter(({label}) => subscriptionsList.some(item => item.category === label))
              ]}
              value={sortCategory}
              onChange={(label) => setSortCategory(label)}
            />
          </span>
        </div>
        <div className={styles.itemBlock}>
          <h6>Сортировать по:</h6>
          <span className={styles.sortFilter}>
            <Dropdown
              list={sortSubscriptionsOptions} 
              value={sortCoast} 
              onChange={(label) => setSortCoast(label)}
            />
          </span>
        </div>
        <div className={styles.itemBlock}>
          <h6>Цена:</h6>
          <span className={`${styles.inputFilter} ${styles.rangeFilter}`}>
            <label>от:
              <input name='from' type='number' min='0' value={sortPrice.from} onChange={(e) => setSortPrice(item => ({...item, from: e.target.value}))} />
              ₽
            </label>
            <label>до: 
              <input name='to' type='number' min='0' value={sortPrice.to} onChange={(e) => setSortPrice(item => ({...item, to: e.target.value}))} />
              ₽
            </label>
          </span>
        </div>
      </div>
      <div className={styles.cardsBlock}>
        {sortSubscriptions.map(card => (
          <CardSubscription 
            key={card.id} 
            cardSub={card} 
            page={'subscriptions'} 
            onDeleteShowModal={onDeleteShowModal}
            onChangeShowModal={onChangeShowModal}
          />
        ))}
      </div>
    </div>
  )
}

export default Subscriptions;