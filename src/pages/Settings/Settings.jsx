import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '@/redux/user';
import styles from './Settings.module.css';
import loadingStyles from '@/components/ui/Loading.module.css';
import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import ToggleSwitch from '@/components/ui/toggleSwitch/ToggleSwitch';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const {
    user, 
    notifications, 
    security, 
  } = useSelector(state => state.user.userData);
 
  const {loading, error} = useSelector(state => state.user);
  const {token} = useSelector(state => state.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [toggleCheck, setToggleCheck] = useState(null);
  const [userData, setUserData] = useState(null);
  const timeNotify = ['10:00', '12:00', '15:00', '18:00', '20:00'];
  const dayAfter = [1, 2, 3, 4, 5, 6, 7];

  useEffect(() => {
    dispatch(getUser(token));

  }, [token, dispatch]);

  useEffect(() => {
    if (error) navigate('/login');
    if (user) {
      setToggleCheck(notifications);
      setUserData(user);
    }
  }, [user, notifications, error]);

  if (loading || !userData) {
    return <div className={loadingStyles.loading}>Загрузка...</div>
  }

  const lastPassDate = security.lastPasswordChange ? new Date(security.lastPasswordChange).toLocaleTimeString('ru-RU', {day: 'numeric', month: 'long', year: 'numeric'}) : 'Не менялся';
  // console.log(security.lastPasswordChange);

  const saveChange = () => {
    console.log(userData, toggleCheck);
  };

  return (
    <div className={styles.settingsPage}>
      <h1>Настройки</h1>
      <div className={styles.userProfile}>
        <h2>Личные данные</h2>
        <div className={styles.userPhoto}></div>
        <label className={styles.userLogin}>
          Логин: 
          <input type="text" name="login" value={userData.login} readOnly />
        </label>
        <label className={styles.userName}>
          Имя: 
          <input 
            type="text" 
            name="name" 
            value={userData.name} 
            onChange={(e) => setUserData(item => ({...item, name: e.target.value}))} 
            placeholder='Введите имя'
          />
        </label>
        <label className={styles.userEmail}>
          Email:
          <input 
            type="email" 
            name='email' 
            value={userData.email} 
            onChange={(e) => setUserData(item => ({...item, email: e.target.value}))} 
            placeholder='Введите email' 
          />
        </label>
      </div>
      <div className={styles.notifyBlock}>
        <h2>Уведомления</h2>
        <div className={styles.toggles}>
          <div className={styles.mainToggle}>
            <ToggleSwitch 
              label={'Получать напоминания'} 
              onChange={() => setToggleCheck(item => ({...item, reminders: !item.reminders}))} 
              checked={toggleCheck.reminders}
            />
          </div>
        </div>
        <div className={`${styles.notify} ${toggleCheck.reminders ? '' : styles.disabled}`}>
          <div className={styles.toggleNotify}>
            <div className={styles.emailToggle} >
              <ToggleSwitch 
                label={'На email'} 
                checked={toggleCheck.emailReminders} 
                onChange={() => setToggleCheck(item => ({...item, emailReminders: !item.emailReminders}))} 
              />
            </div>
            <div className={styles.smsToggle}>
              <ToggleSwitch 
                label={'По SMS'} 
                checked={toggleCheck.smsReminders} 
                onChange={() => setToggleCheck(item => ({...item, smsReminders: !item.smsReminders}))} 
              />
            </div>
          </div>
          <div className={styles.selectParams}>
            <span>
              <h6>Время напоминания</h6>
              <Dropdown list={timeNotify} defaultSelect={toggleCheck.preferredHour} /> 
            </span>
            <span>
              <h6>За сколько дней до списания</h6>
              <Dropdown list={dayAfter} defaultSelect={toggleCheck.reminderDaysBefore} />
            </span>
          </div>
        </div>
      </div>
      <div className={styles.securityBlock}>
        <h2>Безопасность</h2>
        <div className={styles.passChange}>
          <ButtonElement className={'settingsButton'}>Сменить пароль</ButtonElement>
          <p className={styles.lastDate}>Последняя смена пароля<br />{lastPassDate}</p>
        </div>
      </div>
      <div className={styles.saveButton}>
        <ButtonElement onClick={saveChange} className={'addButton'}>Сохранить настройки</ButtonElement>
      </div>
    </div>
  )
}

export default Settings;