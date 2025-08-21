import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import styles from './ModalContent.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '@/redux/showModal';
import api from '@/api/api';
import { useNavigate } from 'react-router-dom';
import Modal from '@/components/ui/Modal/Modal';
import { useCloseModal } from './useCloseModal';
import { MdWarningAmber } from 'react-icons/md';

const DeleteUserModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {token} = useSelector(state => state.token);
    
    //Отдельный кастомны хук----------------------
    const {vision, close} = useCloseModal();
    const closeModal = () => {
        close(() => dispatch(toggleModal(false)));
    }
    //--------------------------------------------
        
    const deleteUser = async () => {
        const deletedData = await api.deleteUserData(token);
        if (deletedData?.message) {
            setTimeout(() => dispatch(toggleModal({isInfoModal: true})), 102);
            close(() => dispatch(toggleModal(false)));
        } else {
            dispatch(toggleModal(false))
            navigate('/login', {state: {fromApp: true}}); 
        }
    }

    return (
        <Modal vision={vision} closeModal={closeModal}> 
            <div className={styles.contentBlock}>
                <div className={styles.headModal}>
                    <MdWarningAmber className={`${styles.iconWarning} ${styles.icon}`} />
                    <h3>Удаление аккаунта</h3>
                </div>
                <p className={styles.content}>Вы уверены, что хотите удалить аккаунт? Это действие необратимо.</p>
                <div className={styles.buttonsBlock}>
                    <ButtonElement onClick={closeModal} className={'exitButton modalButton'}>Отмена</ButtonElement>
                    <ButtonElement onClick={deleteUser} className={'delButton modalButton'}>Удалить аккаунт</ButtonElement>
                </div>
            </div>
        </Modal>
    )
};

export default DeleteUserModal;