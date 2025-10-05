import styles from './VerifyEmail.module.css';
import logo from '@/assets/img/logo.svg';
import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import api from '@/api/api';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import loadingStyles from '@/components/ui/Loading.module.css';

const VerifyEmail = () => {

    const [searchParams] = useSearchParams();
    const [verify, setVerivy] = useState(null);
    const [errorRes, setErrorRes] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const mailToken = searchParams.get('mailToken');
        const verifyToken = async() => {
            try {
                const check = await api.verifyEmailUser(mailToken);
                setVerivy(check);
                const timer = setTimeout(() => navigate('/login', {replace: true}), 5000);
                return () => clearTimeout(timer);
            } catch (error) {
                console.log(error);
                setErrorRes(error.response?.data?.error);
                error.status === 500 && navigate('/500', {replace: true});
                error.status === 400 && navigate('/400', {replace: true});
            }
        }
        verifyToken();
    }, []);

    if (!(verify || errorRes)) {
        return <div className={loadingStyles.loading}>Загрузка...</div>
    }

    return (errorRes === 'jwt expired' || errorRes === 'repeated varify' ?
        <div className={`${styles.verifyPage} ${styles.noVerify}`}>
            <div className={styles.mainContainer}>
                <img src={logo} height='60px' alt="logo" />
                <div className={styles.outCheck}>
                    <div className={styles.check}>𐄂</div>
                </div>
                <h1>Ссылка недействительна</h1>
                <h3>Похоже, что ссылка устарела или уже была использована.</h3>
                <div className={styles.buttonBlock}>
                    <ButtonElement 
                        onClick={() => navigate('/login', {replace: true})} className={'addButton'}
                    >
                        Войти или запросить новую ссылку
                    </ButtonElement>
                </div>
                <p>Если вы считаете, что это ошибка, попробуйте войти заново.</p>
            </div>
        </div>
        :
        <div className={styles.verifyPage}>
            <div className={styles.mainContainer}>
                <img src={logo} height='60px' alt="logo" />
                <div className={styles.outCheck}>
                    <div className={styles.check}>✓</div>
                </div>
                <h1>E-mail подтверждён!</h1>
                <h3>Теперь вы можете войти в свой аккаунт.</h3>
                <div className={styles.buttonBlock}>
                    <ButtonElement onClick={() => navigate('/login', {replace: true})} className={'addButton'}>Войти</ButtonElement>
                </div>
                <p>Вы будете автоматически перенаправлены через 5 секунд.</p>
            </div>
        </div>
    )
}

export default VerifyEmail;