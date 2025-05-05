import styles from './Subscriptions.module.css';
import loadingStyles from '@/components/ui/Loading.module.css';
import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import { FaSearch } from 'react-icons/fa';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSubscriptions } from '@/redux/subscriptions';
import CardSubscription from '@/components/CardSubscription/CardSubscription';

const Subscriptions = () => {

  const dispatch = useDispatch();
  const {subscriptions, loading} = useSelector(state => state.subscriptions);

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  if(loading || !subscriptions) {
    return <div className={loadingStyles.loading}>Загрузка...</div> 
  }

  const categoryList = subscriptions.map(item => item.category);
  const sortList = ['Нет', 'Стоимость', 'Дата следующего списания', 'Дата прошлого списания'];

  return (
    <div className={styles.subscriptionsPage}>
      <div className={styles.headerBlock}>
      <h1>Мои подписки</h1>
        <ButtonElement className={'addButton purpleButton'}>🞣 Добавить подписку</ButtonElement>
      </div>
      <div className={styles.filtersBlock}>
        <div className={styles.itemBlock}>
          <h6>Искать:</h6>
          <span className={`${styles.inputFilter} ${styles.searchFilter}`}>
            <FaSearch />
            <input type="text" placeholder='Название подписки'/>
          </span>
        </div>
        <div className={styles.itemBlock}>
          <h6>Выбрать категорию:</h6>
          <span className={styles.categoryFilter}>
            <Dropdown 
              list={categoryList} 
              value={'Все'}
              addDefault={true} 
            />
          </span>
        </div>
        <div className={styles.itemBlock}>
          <h6>Сортировать по:</h6>
          <span className={styles.sortFilter}>
            <Dropdown 
              list={sortList} 
              value={sortList[0]} 
            />
          </span>
        </div>
        <div className={styles.itemBlock}>
          <h6>Цена:</h6>
          <span className={`${styles.inputFilter} ${styles.rangeFilter}`}>
            <label>от:
              <input name='from' type='number' />
              ₽
            </label>
            <label>до: 
              <input name='to' type='number' />
              ₽
            </label>
          </span>
        </div>
      </div>
      <div className={styles.cardsBlock}>
        {subscriptions.map(card => (
          <CardSubscription key={card.id} cardSub={card} page={'subscriptions'}/>
        ))}
      </div>
    </div>
  )
}

export default Subscriptions;