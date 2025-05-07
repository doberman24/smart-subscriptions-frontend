import DeleteUserModal from '@/components/ModalContent/DeleteUserModal';
import styles from './Modal.module.css';
import ReactDOM from 'react-dom';

const Modal = ({children}) => {

  return ReactDOM.createPortal(
    <div 
      className={styles.modalBlock}
    >
      <div className={styles.modal}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;