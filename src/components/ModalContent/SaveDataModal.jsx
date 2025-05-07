import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import styles from './ModalContent.module.css';
import { useDispatch } from 'react-redux';
import { updateDataUser } from '@/redux/user';
import { toggleModal } from '@/redux/showModal';
import Modal from '@/components/ui/Modal/Modal';
import api from '@/api/api';

const ExitAccountModal = ({onSaveChange}) => {

    return (
        <Modal>
            <div className={styles.contentBlock}>
                <h3>Сохранение...</h3>
                <p className={styles.content}>Применить изменения?</p>
                <div className={styles.buttonsBlock}>
                    <ButtonElement onClick={() => dispatch(toggleModal({isSaveModal: false}))} className={'exitButton modalButton'}>Отмена</ButtonElement>
                    <ButtonElement onClick={onSaveChange} className={'addButton modalButton'}>Сохранить</ButtonElement>
                </div>
            </div>
        </Modal>
    )
};

export default ExitAccountModal;