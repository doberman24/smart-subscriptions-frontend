import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import styles from './Login.module.css'
import logo from '@/assets/img/logo.svg';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cleanToken, getToken } from '@/redux/getToken';
import { resetDataAnalitics } from '@/redux/analytics';
import { resetDataDashboard } from '@/redux/summaryInfo';
import { resetDataSubscription } from '@/redux/subscriptions';
import { resetData } from '@/redux/user';
import InfoModal from '@/components/ModalContent/InfoModal';
import { useModals } from '@/components/ModalContent/useModals';
import { Helmet } from '@vuer-ai/react-helmet-async';
import { FaEye } from 'react-icons/fa';
import { FaEyeLowVision } from 'react-icons/fa6';
import LosePassModal from '@/components/ModalContent/LosePassModal';
import api from '@/api/api';

const Login = () => {
  const location = useLocation();
  const tab = location.state?.tab;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message } = useSelector(state => state.token);
  const isModal = useSelector(state => state.showModal);

  const [activeTab, setActiveTab] = useState(tab || 'login');
  const [formValue, setFormValue] = useState({
    email: '',
    login: '',
    password: '',
    confirmPass: '',
  })

  const [infoTypeModal, setInfoTypeModal] = useState('');
  const {showClickModal} = useModals({});
  const [passVision, setPassVision] = useState(false);
  const [passConfirmVision, setPassConfirmVision] = useState(false);
  const [modalMessage, setModalMessage] = useState('');


  useEffect(() => {
    if (location.state?.fromApp){
      dispatch(cleanToken());      
      dispatch(resetDataAnalitics());
      dispatch(resetDataDashboard());
      dispatch(resetData()); 
      dispatch(resetDataSubscription()); 
    }
  },[]);

  useEffect(() => {
    setModalMessage(message);
  }, [message]);

  const clickTab = (currentTab) => {
    setActiveTab(currentTab);
    setFormValue({email: '', login: '', password: '', confirmPass: ''});
  }

  const handleSubmit = async (e, activeTab) => {
    e.preventDefault();
    dispatch(cleanToken());
    
    const data = await dispatch(getToken({formValue, activeTab}));
    if (getToken.fulfilled.match(data)) {
      if (activeTab === 'reg') {
        navigate('/info-verify', {state: {from: 'reg'}});
      } else if (data.payload.message === 'Email Not Verified') {
        navigate('/info-verify', {state: {from: 'login'}});
      } else {
        navigate('/dashboard', {replace: true});
      }
    }
    if (getToken.rejected.match(data)) {
      showClickModal('isInfoModal');
      setInfoTypeModal('error');
    }
  }

  const handleChange = (e) => {
    setFormValue({
      ...formValue, 
      [e.target.name]: e.target.value
    });
  }

 const onResetPassword = async (formValue) => {
    const result = await api.sendRecover(formValue);
    const resultMessage = result.messageRecovery;
    const resultError = result.response?.data?.error;
    setModalMessage(resultMessage || resultError || 'Неизвестная ошибка');
    // console.log(result);
    setInfoTypeModal(resultMessage ? 'info' : 'error');
    if (typeof window !== "undefined") {
      setTimeout(() => showClickModal('isInfoModal'), 115);
    }
  }

  return (
    <>
      <Helmet>
        <meta name='robots' content='noindex,nofollow' />
        <title>Вход</title>
      </Helmet>

      <div className={styles.loginPage}>
        {isModal.isLosePass && <LosePassModal onResetPassword={onResetPassword} />}
        {isModal.isInfoModal && <InfoModal message={modalMessage} typeInfo={infoTypeModal} />}
        <Link to='/'><img src={logo} height='60px' alt='logo' /></Link>
        <h1 className={styles.login}>Добро пожаловать!</h1>
        <form className={styles.mainForm} onSubmit={(e) => handleSubmit(e, activeTab)}>
          <div className={styles.tabs}>
            <div onClick={() => clickTab('login')} className={`${styles.tab} ${activeTab === 'login' ? styles.active : styles.inactive}`}>Вход</div>
            <div onClick={() => clickTab('reg')} className={`${styles.tab} ${activeTab === 'reg' ? styles.active : styles.inactive}`}>Регистрация</div>
          </div>
          <label className={`${styles.emailLabel} ${activeTab === 'reg' && styles.activeField}`}>
            Email
            <input 
              name='email' 
              type='email' 
              value={formValue.email} 
              onChange={handleChange} 
              placeholder='Введите email'
              required={activeTab === 'reg'}
              disabled={activeTab !== 'reg'}
            />
          </label>
          <label className={styles.loginLabel}>
            Логин
            <input 
              name='login' 
              type="text" 
              value={formValue.login} 
              onChange={handleChange} 
              placeholder='Введите логин'
              required={true}
            />
          </label>
          <label className={styles.passLabel}>
            Пароль
            <div className={styles.pass}>
              <input 
                name='password' 
                type={passVision ? 'text' : 'password'} 
                value={formValue.password} 
                onChange={handleChange} 
                placeholder='Введите пароль'
                required={true}
              />
              <div className={styles.eyes}>
                {passVision && <FaEye onClick={() => setPassVision(false)} style={{cursor: 'pointer'}} />}
                {!passVision && <FaEyeLowVision onClick={() => setPassVision(true)} style={{cursor: 'pointer'}} />}
              </div>
            </div>
          </label>
          <label className={`${styles.confirmPass} ${activeTab === 'reg' && styles.activeField}`}>
            Подтвердите пароль
            <div className={styles.pass}>
              <input 
                name='confirmPass' 
                type={passConfirmVision ? 'text' : 'password'}  
                value={formValue.confirmPass} 
                onChange={handleChange} 
                placeholder='Введите пароль для подтверждения'
                required={activeTab === 'reg'}
              />
              <div className={styles.eyes}>
                {passConfirmVision && <FaEye onClick={() => setPassConfirmVision(false)} style={{cursor: 'pointer'}} />}
                {!passConfirmVision && <FaEyeLowVision onClick={() => setPassConfirmVision(true)} style={{cursor: 'pointer'}} />}
              </div>
            </div>
          </label>
          {activeTab === 'login' && <div onClick={() => showClickModal('isLosePass')} className={styles.resetPass}>Забыли пароль?</div>}
          <label className={styles.button}>
            <ButtonElement className={'addButton'}>{activeTab === 'reg' ? 'Зарегистрироваться' : 'Войти'}</ButtonElement>
          </label>
        </form>
      </div>
    </>
  )
}

export default Login;