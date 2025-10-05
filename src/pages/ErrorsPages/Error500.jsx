import styles from './ErrorPage.module.css'
import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import logo from '@/assets/img/logo.svg';
import { useNavigate } from 'react-router-dom';

const Error500 = () => {

    const navigate = useNavigate();
    
    return (
        <div className={styles.errorPage}>
            <div className={styles.mainContainer}>
                <img src={logo} height='60px' alt="logo" />
                <h1>500</h1>
                <h2>Ошибка сервера</h2>
                <p>На сервере произошёл сбой.<br /> Мы уже работаем над устранением.</p>
                <div className={styles.buttonBlock}>
                    <ButtonElement onClick={() => navigate('/dashboard', {replace: true})} className={'addButton'}>Вернуться на главную</ButtonElement>
                </div>
            </div>
        </div>
    )
}

export default Error500;