import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import styles from './ModalContent.module.css';
import { useDispatch } from 'react-redux';
import { toggleModal } from '@/redux/showModal';
import Modal from '@/components/ui/Modal/Modal';
import { useCloseModal } from './useCloseModal';
import { MdWarningAmber } from 'react-icons/md';

const DeleteSubscriptionModal = ({onDeleteSubscription}) => {
    const dispatch = useDispatch();

    const {vision, close} = useCloseModal();
    const closeModal = () => {
        close(() => dispatch(toggleModal(false)));
    }
        
    const deleteSubscription = async () => {
        onDeleteSubscription();
        dispatch(toggleModal(false));
    }

    return (
        <Modal vision={vision} closeModal={closeModal}> 
            <div className={styles.contentBlock}>
                <div className={styles.headModal}>
                    <MdWarningAmber className={`${styles.iconWarning} ${styles.icon}`} />
                    <h3>Удаление подписки</h3>
                </div>
                <p className={styles.content}>Вы уверены, что хотите удалить подписку?</p>
                <div className={styles.buttonsBlock}>
                    <ButtonElement onClick={closeModal} className={'exitButton modalButton'}>Отмена</ButtonElement>
                    <ButtonElement onClick={() => deleteSubscription()} className={'addButton modalButton'}>Удалить подписку</ButtonElement>
                </div>
            </div>
        </Modal>
    )
};

export default DeleteSubscriptionModal;