import styles from './ErrorPage.module.css'
import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import logo from '@/assets/img/logo.svg';
import { useNavigate } from 'react-router-dom';

const Error400 = () => {

    const navigate = useNavigate();
    
    return (
        <div className={styles.errorPage}>
            <div className={styles.mainContainer}>
                <img src={logo} height='60px' alt="logo" />
                <h1>400</h1>
                <h2>Некорректный запрос</h2>
                <p>Запрос не может быть обработан. Попробуйте обновить страницу или вернуться на главную.</p>
                <div className={styles.buttonBlock}>
                    <ButtonElement onClick={() => navigate('/login', {replace: true})} className={'addButton'}>На главную</ButtonElement>
                </div>
            </div>
        </div>
    )
}

export default Error400;