import styles from './Modal.module.css';
import ReactDOM from 'react-dom';
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { toggleModal } from '@/redux/showModal';

const Modal = ({children, vision, closeModal}) => {

  const refModal = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;  //ширина скроллбара
    document.body.style.overflow = 'hidden';                    //спрятать скроллбар и отключить прокрутку страницы
    if (scrollbarWidth) {
      document.body.style.paddingRight = `${scrollbarWidth}px`; //компенсировать ширину скроллбара
    }
    const appRoot = document.getElementById('root');
    appRoot.setAttribute('inert', '');                          //запрет фокуса и кликов внутри #root

    const handleClickOut = (e) => {
      if (refModal.current && !refModal.current.contains(e.target))
        closeModal();
        // dispatch(toggleModal({isDeleteModal: false}));
    }
    document.addEventListener('mousedown', handleClickOut);

    return () => {                                              //модалка закрывается и
      document.body.style.overflow = 'auto';                    //восстанавливает скроллбар
      if (scrollbarWidth) {                                     //и ширину страницы
        document.body.style.paddingRight = '0';
      }
      appRoot.removeAttribute('inert');                         //возвращает интерактивность страницы
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