import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import styles from './ModalContent.module.css';
import { useDispatch } from 'react-redux';
import { toggleModal } from '@/redux/showModal';
import Modal from '@/components/ui/Modal/Modal';
import { useCloseModal } from './useCloseModal';
import { MdInfoOutline } from 'react-icons/md';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const TopDataModal = ({message, typeInfo}) => {
  const dispatch = useDispatch();

  const {vision, close} = useCloseModal();
  const closeModal = () => {
      close(() => dispatch(toggleModal(false)));
  }

  return (
    <Modal vision={vision} closeModal={closeModal}>
      <div className={styles.contentBlock}>
        <div className={styles.headModal}>
          {typeInfo === 'error' && <AiOutlineCloseCircle className={`${styles.iconError} ${styles.icon}`} />}
          {typeInfo === 'info' && <MdInfoOutline className={`${styles.iconInfo} ${styles.icon}`} />}
          <h3>{ typeInfo === 'info' ? 'Информация' : 'Ошибка'}</h3>
        </div>
        <p className={styles.content}>cardId: {message?.cardId}<br/>userId: {message?.userId}</p>
        <div className={styles.buttonsBlock}>
          <ButtonElement onClick={closeModal} className={'addButton modalButton'}>OK</ButtonElement>
        </div>
      </div>
    </Modal>
  )
};

export default TopDataModal;