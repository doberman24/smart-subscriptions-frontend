import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import styles from './ModalContent.module.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleModal } from '@/redux/showModal';
import { resetData } from '@/redux/user';
import Modal from '@/components/ui/Modal/Modal';

const ExitAccountModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const exitUser = () => {
    dispatch(resetData());
    dispatch(toggleModal({isExitModal: false}));
    navigate('/login', {state: {fromApp: true}}); 
    };

    return (
        <Modal>
            <div className={styles.contentBlock}>
                <h3>Выход из аккаунта</h3>
                <p className={styles.content}>Вы уверены, что хотите выйти?</p>
                <div className={styles.buttonsBlock}>
                    <ButtonElement onClick={() => dispatch(toggleModal({isExitModal: false}))} className={'exitButton modalButton'}>Отмена</ButtonElement>
                    <ButtonElement onClick={exitUser} className={'addButton modalButton'}>Выйти</ButtonElement>
                </div>
            </div>
        </Modal>
    )
};

export default ExitAccountModal;