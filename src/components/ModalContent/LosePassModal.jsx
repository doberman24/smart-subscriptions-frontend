import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import styles from './ModalContent.module.css';
import { useDispatch } from 'react-redux';
import { toggleModal } from '@/redux/showModal';
import Modal from '@/components/ui/Modal/Modal';
import { useCloseModal } from './useCloseModal';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useState } from 'react';

const LosePassModal = ({onResetPassword}) => {
    const dispatch = useDispatch();

    const [formValue, setFormValue] = useState({login: ''});
    const [disBut, setDisBut] = useState(false);

    const {vision, close} = useCloseModal();
    const closeModal = () => {
        close(() => dispatch(toggleModal(false)));
    }


    const sendMessage = async (e, formValue) => {
        e.preventDefault();
        setDisBut(true);
        await onResetPassword(formValue);
        close(() => dispatch(toggleModal(false)));
    }

    const handleChange = (e) => {
        setFormValue({
            ...formValue, 
            [e.target.name]: e.target.value
        });
    }

    return (
        <Modal vision={vision} closeModal={closeModal}>
            <div className={styles.contentBlock}>
                <div className={styles.headModal}>
                    <AiOutlineQuestionCircle className={`${styles.iconQuestion} ${styles.icon}`} />
                    <h3>Восстановление пароля</h3>
                </div>
                <form className={styles.formBlock} onSubmit={(e) => sendMessage(e, formValue)}>
                    <p className={styles.description}>
                        Укажите логин, использованный при регистрации.
                        На адрес электронной почты, связанный с этим аккаунтом, будет отправлена ссылка для сброса пароля.
                    </p>
                    <label className={styles.loginLabel}>
                        Логин
                        <input 
                            name='login' 
                            type="text" 
                            value={formValue.login} 
                            onChange={handleChange} 
                            placeholder='Введите логин'
                            required={true}
                            disabled={disBut}
                        />
                    </label>
                    <div className={styles.buttonsBlock}>
                        <ButtonElement type={'button'} onClick={closeModal} className={'exitButton modalButton'}>Отмена</ButtonElement>
                        <ButtonElement className={'addButton modalButton'} disabled={disBut}>Отправить ссылку</ButtonElement>
                    </div>
                    <p className={styles.tip}>Если письмо не поступило, проверьте папку «Спам» или повторите попытку через несколько минут.</p>                
                </form>
            </div>
        </Modal>
    )
};

export default LosePassModal;