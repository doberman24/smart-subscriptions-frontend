import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import styles from './ModalContent.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '@/redux/showModal';
import api from '@/api/api';
import { useNavigate } from 'react-router-dom';

const DeleteUserModal = ({children}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {token} = useSelector(state => state.token);

    const deleteUser = async () => {
        const deletedData = await api.deleteUserData(token);
        console.log(deletedData);
        dispatch(toggleModal(false));
        navigate('/login', {state: {fromApp: true}}); 
      }

    return (
        <div className={styles.contentBlock}>
            <p className={styles.content}>{children}</p>
            <div className={styles.buttonsBlock}>
                <ButtonElement onClick={() => dispatch(toggleModal(false))} className={'exitButton modalButton'}>Отмена</ButtonElement>
                <ButtonElement onClick={deleteUser} className={'delButton modalButton'}>Удалить аккаунт</ButtonElement>
            </div>
        </div>
    )
};

export default DeleteUserModal;