import styles from './VerifyEmail.module.css';
import logo from '@/assets/img/logo.svg';
import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";


const InfoVerifyEmail = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const status = location.state?.from;
    const {resendToken} = useSelector(state => state.token);
    const [errorData, setErrorData] = useState(null);
    const [remaining, setRemaining] = useState(60);
    const [email, setEmail] = useState('');

    useEffect(() => {
        resendStatus();
    }, [resendToken]);

    useEffect(() => {
        if(!status) navigate('/login', {replace: true});
        const timer = setInterval(() => { 
            setRemaining((prev) => (prev > 1 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [remaining]);
    
    const resendStatus = async (post = false) => {
        try {
            const response =  await axios({
                method: post ? 'post' : 'get',
                url: `${import.meta.env.VITE_API_URL}/resend-status`,
                headers: {
                    'Authorization': `Bearer ${resendToken}`,
                },
            });
            setRemaining(response.data.cooldown);
            setEmail(response.data.email);
            if (!response.data) {
                setErrorData('Error');
            }
        } catch (error) {
            console.log(error);
            setErrorData(error.response.data);
        }
    }
    
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    const handleClick = async () => {
        setErrorData(null);
        await resendStatus('post');
    }

    return (
        <div className={`${styles.verifyPage} ${styles.info}`}>
            <div className={styles.mainContainer}>
                <img src={logo} height='50px' alt="logo" />
                
                <h1>{errorData ? 'Срок действия ссылки истёк' : status === 'reg' ? 'Подтвердите ваш E-mail' : 'Требуется подтверждение email'}</h1>
                <h3>
                    {errorData ? 'Чтобы получить новую ссылку, авторизуйтесь и запросите подтверждение заново.' :
                    status === 'reg' ? 
                        (<>Письмо с подтверждением отправлено на адрес <b>{ email }</b>. Перейдите по ссылке внутри письма, чтобы активировать аккаунт.</>) :
                        'Ваша почта ещё не подтверждена. Пожалуйста, перейдите по ссылке в письме или отправьте письмо повторно.'
                    }
                </h3>
                <div className={styles.buttonBlock}>
                {errorData ?
                    <ButtonElement onClick={() => navigate('/login', {replace: true})} className={'addButton'}>Войти</ButtonElement> :
                    <ButtonElement onClick={handleClick} className={'addButton'} disabled={remaining > 0}>Отправить повторно</ButtonElement>
                }
                </div>
                {!errorData && <>
                    <p>Повторная отправка будет доступна через {formatTime(remaining)}</p>
                    <p>Если письмо не приходит в течение 10 минут, проверьте папку «Спам» или правильность указанного e-mail.</p>
                </>
                }
            </div>
        </div>
    )
}

export default InfoVerifyEmail;
