import DeleteUserModal from '@/components/ModalContent/DeleteUserModal';
import styles from './Modal.module.css';


const Modal = ({children}) => {
  return (
    <div className={styles.modalBlock}>
        <div className={styles.modal}>
            <h3>{children}</h3>
            <DeleteUserModal>
                Вы уверены, что хотите удалить аккаунт? Это действие необратимо.
            </DeleteUserModal>
        </div>
    </div>
  )
};

export default Modal;