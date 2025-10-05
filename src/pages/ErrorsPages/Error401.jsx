import styles from './ErrorPage.module.css'
import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import logo from '@/assets/img/logo.svg';
import { useNavigate } from 'react-router-dom';

const Error401 = () => {

    const navigate = useNavigate();
    
    return (
        <div className={styles.errorPage}>
            <div className={styles.mainContainer}>
                <img src={logo} height='60px' alt="logo" />
                <h1>401</h1>
                <h2>Необходима авторизация</h2>
                <p>Для доступа к этой странице<br />нужно войти в систему.</p>
                <div className={styles.buttonBlock}>
                    <ButtonElement onClick={() => navigate('/login', {replace: true})} className={'addButton'}>Войти</ButtonElement>
                </div>
            </div>
        </div>
    )
}

export default Error401;