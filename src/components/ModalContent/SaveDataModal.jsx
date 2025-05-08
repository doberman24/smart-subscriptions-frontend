import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import styles from './ModalContent.module.css';
import { useDispatch } from 'react-redux';
import { toggleModal } from '@/redux/showModal';
import Modal from '@/components/ui/Modal/Modal';
import { useCloseModal } from './useCloseModal';

const ExitAccountModal = ({onSaveChange}) => {
    const dispatch = useDispatch();

    const {vision, close} = useCloseModal();
    const closeModal = () => {
        close(() => dispatch(toggleModal(false)));
    }

    const saveChange = () => {
        onSaveChange();
        closeModal();
    }

    return (
        <Modal vision={vision} closeModal={closeModal}>
            <div className={styles.contentBlock}>
                <h3>Сохранение...</h3>
                <p className={styles.content}>Применить изменения?</p>
                <div className={styles.buttonsBlock}>
                    <ButtonElement onClick={closeModal} className={'exitButton modalButton'}>Отмена</ButtonElement>
                    <ButtonElement onClick={() => saveChange()} className={'addButton modalButton'}>Сохранить</ButtonElement>
                </div>
            </div>
        </Modal>
    )
};

export default ExitAccountModal;