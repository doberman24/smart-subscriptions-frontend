import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import styles from './Login.module.css'
import logo from '@/assets/img/logo.svg';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Login = () => {
  const location = useLocation();
  const tab = location.state?.tab;

  const [activeTab, setActiveTab] = useState(tab);

  const handleSubmit = (e, activeTab) => {
    e.preventDefault();
    console.log(activeTab);
  }

  return (
    <div className={styles.loginPage}>
      <Link to='/'><img src={logo} height='60px' alt='logo' /></Link>
      <h1 className={styles.login}>Добро пожаловать!</h1>
      <form className={styles.mainForm} onSubmit={(e) => handleSubmit(e, activeTab)}>
        <div className={styles.tabs}>
          <div onClick={() => setActiveTab('login')} className={`${styles.tab} ${activeTab === 'login' ? styles.active : styles.inactive}`}>Вход</div>
          <div onClick={() => setActiveTab('reg')} className={`${styles.tab} ${activeTab === 'reg' ? styles.active : styles.inactive}`}>Регистрация</div>
        </div>
        <label className={styles.emailLabel}>
          Логин/Email
          <input type="text" placeholder='Введите логин или email'/>
        </label>
        <label className={styles.passLabel}>
          Пароль
          <input type="password" placeholder='Введите пароль'/>
        </label>
        <label className={`${styles.confirmPass} ${activeTab === 'reg' && styles.activeConfirmPass}`}>
          Подтвердите пароль
          <input type="password" placeholder='Введите пароль для подтверждения'/>
        </label>
        <label className={styles.button}>
          <ButtonElement className={'addButton'}>{activeTab === 'login' ? 'Войти' : 'Зарегистрироваться'}</ButtonElement>
        </label>
      </form>
    </div>
  )
}

export default Login;