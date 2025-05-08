import styles from './Modal.module.css';
import ReactDOM from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '@/redux/showModal';

const Modal = ({children, vision, closeModal}) => {

  const refModal = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbarWidth) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    const appRoot = document.getElementById('root');
    appRoot.setAttribute('inert', '');

    const handleClickOut = (e) => {
      if (refModal.current && !refModal.current.contains(e.target))
        closeModal();
        // dispatch(toggleModal({isDeleteModal: false}));
    }
    document.addEventListener('mousedown', handleClickOut);

    return () => {
      document.body.style.overflow = 'auto';
      if (scrollbarWidth) {
        document.body.style.paddingRight = '0';
      }
      appRoot.removeAttribute('inert');
      document.removeEventListener('mousedown', handleClickOut);
    }
  }, []);

  return ReactDOM.createPortal(
    <div 
      className={`${styles.modalBlock} ${vision ? styles.visionModal: ''}`}
    >
      <div className={styles.modal} ref={refModal}>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;