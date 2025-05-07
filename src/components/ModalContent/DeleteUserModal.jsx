import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import styles from './ModalContent.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '@/redux/showModal';
import api from '@/api/api';
import { useNavigate } from 'react-router-dom';
import Modal from '@/components/ui/Modal/Modal';

const DeleteUserModal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {token} = useSelector(state => state.token);

    const deleteUser = async () => {
        const deletedData = await api.deleteUserData(token);
        console.log(deletedData);
        dispatch(toggleModal({isDeleteModal: false}));
        navigate('/login', {state: {fromApp: true}}); 
      }

    return (
        <Modal>
            <div className={styles.contentBlock}>
                <h3>Удаление аккаунта</h3>
                <p className={styles.content}>Вы уверены, что хотите удалить аккаунт? Это действие необратимо.</p>
                <div className={styles.buttonsBlock}>
                    <ButtonElement onClick={() => dispatch(toggleModal({isDeleteModal: false}))} className={'exitButton modalButton'}>Отмена</ButtonElement>
                    <ButtonElement onClick={deleteUser} className={'delButton modalButton'}>Удалить аккаунт</ButtonElement>
                </div>
            </div>
        </Modal>
    )
};

export default DeleteUserModal;