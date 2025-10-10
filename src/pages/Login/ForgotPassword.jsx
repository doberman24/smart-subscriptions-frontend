import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import styles from './Login.module.css'
import logo from '@/assets/img/logo.svg';
import { useEffect, useState } from 'react';
import { Helmet } from '@vuer-ai/react-helmet-async';
import { FaEye } from 'react-icons/fa';
import { FaEyeLowVision } from 'react-icons/fa6';
import { useNavigate, useSearchParams } from 'react-router-dom';
import loadingStyles from '@/components/ui/Loading.module.css';
import api from '@/api/api';
import VerifyEmail from '../VerifyEmail/VerifyEmail';

const ForgotPassword = () => {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [passVision, setPassVision] = useState(false);
  const [passConfirmVision, setPassConfirmVision] = useState(false);
  const [verify, setVerivy] = useState(null);
  const [errorRes, setErrorRes] = useState(null);
  const [result, setResult] = useState(null);
  const [formValue, setFormValue] = useState({
    password: '',
    confirmPass: '',
  })

  useEffect(() => {
    const mailToken = searchParams.get('mailToken');
    const verifyToken = async() => {
      const check = await api.checkTokenForgotPass(mailToken);
      setResult(check);
    }
    verifyToken();
  }, []);

  useEffect(() => {
    if (result) {
      setVerivy(result.data);
      setErrorRes(result.error);
      result.status === 500 && navigate('/500', {replace: true});
      result.status === 400 && navigate('/400', {replace: true});
    }  
  }, [result])

  if (!(verify || errorRes)) {
      return <div className={loadingStyles.loading}>Загрузка...</div>
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const check = await api.resetPassword(formValue, searchParams.get('mailToken'));
    setResult(check);
  }

  const handleChange = (e) => {
    setFormValue({
      ...formValue, 
      [e.target.name]: e.target.value
    });
  }

  // console.log(verify, errorRes);
  return (errorRes?.error === 'token expired' || errorRes?.error === 'repeated varify' || verify?.message === 'success' ?
    <VerifyEmail errors={errorRes?.error} messages={verify?.message} />
    :
    <div className={`${styles.loginPage} ${styles.forgotPass}`}>
      <form className={styles.mainForm} onSubmit={handleSubmit}>
        <img src={logo} height='60px' alt='logo' />
        <h1 className={styles.login}>Сброс пароля</h1>
        <p>Введите новый пароль для вашего аккаунта и подтвердите его, чтобы завершить процесс восстановления.</p>
        <label className={styles.passLabel}>
          Пароль
          <div className={styles.pass}>
            <input 
              name='password' 
              type={passVision ? 'text' : 'password'} 
              value={formValue.password} 
              onChange={handleChange} 
              placeholder='Введите новый пароль'
              required={true}
            />
            <div className={styles.eyes}>
              {passVision && <FaEye onClick={() => setPassVision(false)} style={{cursor: 'pointer'}} />}
              {!passVision && <FaEyeLowVision onClick={() => setPassVision(true)} style={{cursor: 'pointer'}} />}
            </div>
          </div>
        </label>
        <label className={`${styles.confirmPass} ${styles.activeField}`}>
          Подтвердите пароль
          <div className={styles.pass}>
            <input 
              name='confirmPass' 
              type={passConfirmVision ? 'text' : 'password'}  
              value={formValue.confirmPass} 
              onChange={handleChange} 
              placeholder='Введите пароль ещё раз'
              required={true}
            />
            <div className={styles.eyes}>
              {passConfirmVision && <FaEye onClick={() => setPassConfirmVision(false)} style={{cursor: 'pointer'}} />}
              {!passConfirmVision && <FaEyeLowVision onClick={() => setPassConfirmVision(true)} style={{cursor: 'pointer'}} />}
            </div>
          </div>
        </label>
        <label className={styles.button}>
          <ButtonElement className={'addButton'}>Сменить пароль</ButtonElement>
        </label>
      </form>
    </div>
  )
}

export default ForgotPassword;