import styles from './ErrorPage.module.css'
import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import logo from '@/assets/img/logo.svg';
import { useNavigate } from 'react-router-dom';

const Error403 = () => {

    const navigate = useNavigate();
    
    return (
        <div className={styles.errorPage}>
            <div className={styles.mainContainer}>
                <img src={logo} height='60px' alt="logo" />
                <h1>403</h1>
                <h2>Доступ запрещён</h2>
                <p>У вас нет прав для просмотра этой страницы.</p>
                <div className={styles.buttonBlock}>
                    <ButtonElement onClick={() => navigate('/dashboard', {replace: true})} className={'addButton'}>На главную</ButtonElement>
                </div>
            </div>
        </div>
    )
}

export default Error403;