import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import styles from './Login.module.css'
import logo from '@/assets/img/logo.svg';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '@/api/api';
import { useDispatch } from 'react-redux';
import { getToken } from '@/redux/getToken';
import Modal from '@/components/ui/Modal/Modal';

const Login = () => {
  const location = useLocation();
  const tab = location.state?.tab;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(tab);
  const [formValue, setFormValue] = useState({
    login: '',
    email: '',
    password: '',
    confirmPass: '',
  })

  useEffect(() => {
    if (location.state?.fromApp){
      dispatch(getToken(null));
    }
  },[]);

  const clickTab = (currentTab) => {
    setActiveTab(currentTab);
    setFormValue({login: '', email: '', password: '', confirmPass: ''});
  }

  const handleSubmit = async (e, activeTab) => {
    e.preventDefault();
    dispatch(getToken(null));
    const data = await api.authorization(formValue, activeTab);
    // console.log(data);
    if (data) {
      dispatch(getToken(data.token));
      navigate('/settings', {replace: true});
    }
  }

  const handleChange = (e) => {
    setFormValue({
      ...formValue, 
      [e.target.name]: e.target.value
    });
  }

  return (
    <div className={styles.loginPage}>
      <Link to='/'><img src={logo} height='60px' alt='logo' /></Link>
      <h1 className={styles.login}>Добро пожаловать!</h1>
      <form className={styles.mainForm} onSubmit={(e) => handleSubmit(e, activeTab)}>
        <div className={styles.tabs}>
          <div onClick={() => clickTab('login')} className={`${styles.tab} ${activeTab === 'login' ? styles.active : styles.inactive}`}>Вход</div>
          <div onClick={() => clickTab('reg')} className={`${styles.tab} ${activeTab === 'reg' ? styles.active : styles.inactive}`}>Регистрация</div>
        </div>
        <label className={`${styles.loginLabel} ${activeTab === 'reg' && styles.activeField}`}>
          Логин
          <input 
            name='login' 
            type="text" 
            value={formValue.login} 
            onChange={handleChange} 
            placeholder='Введите логин'
            required={activeTab === 'reg'}
          />
        </label>
        <label className={styles.emailLabel}>
          {activeTab === 'reg' ? 'Email' : 'Логин/Email'}
          <input 
            name='email' 
            type={activeTab === 'reg' ? 'email' : 'text'} 
            value={formValue.email} 
            onChange={handleChange} 
            placeholder={activeTab === 'reg' ? 'Введите email' : 'Введите логин или email'}
            required={true}
          />
        </label>
        <label className={styles.passLabel}>
          Пароль
          <input 
            name='password' 
            type="password" 
            value={formValue.password} 
            onChange={handleChange} 
            placeholder='Введите пароль'
            required={true}
          />
        </label>
        <label className={`${styles.confirmPass} ${activeTab === 'reg' && styles.activeField}`}>
          Подтвердите пароль
          <input 
            name='confirmPass' 
            type="password" 
            value={formValue.confirmPass} 
            onChange={handleChange} 
            placeholder='Введите пароль для подтверждения'
            required={activeTab === 'reg'}
          />
        </label>
        <label className={styles.button}>
          <ButtonElement className={'addButton'}>{activeTab === 'reg' ? 'Зарегистрироваться' : 'Войти'}</ButtonElement>
        </label>
      </form>
    </div>
  )
}

export default Login;