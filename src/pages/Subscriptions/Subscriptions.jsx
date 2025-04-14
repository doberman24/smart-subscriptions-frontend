import styles from './Subscriptions.module.css';
import loadingStyles from '@/components/ui/Loading.module.css';
import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import { FaSearch } from 'react-icons/fa';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSubscriptions } from '@/redux/subscriptions';



const Subscriptions = () => {

  const dispatch = useDispatch();
  const {subscriptions, loading} = useSelector(state => state.subscriptions);

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  if(loading || !subscriptions.length) {
    return <div className={loadingStyles.loading}>Загрузка...</div> 
  }
  const categoryList = subscriptions.map(item => item.category);

  return (
    <div className={styles.subscriptionsPage}>
      <div className={styles.headerBlock}>
      <h1>Мои подписки</h1>
        <ButtonElement className={'addButton purpleButton'}>🞣 Добавить подписку</ButtonElement>
      </div>
      <div className={styles.filtersBlock}>
        <span className={styles.searchFilter}>
          <FaSearch />
          <input type="text" placeholder='Поиск'/>
        </span>
        <span className={styles.categoryFilter}>
          <Dropdown categoryList={categoryList} />
        </span>
      </div>
    </div>
  )
}

export default Subscriptions;