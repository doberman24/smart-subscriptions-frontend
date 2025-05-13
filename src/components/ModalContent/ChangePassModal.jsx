import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import styles from './ModalContent.module.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toggleModal } from '@/redux/showModal';
import { resetData } from '@/redux/user';
import Modal from '@/components/ui/Modal/Modal';
import { useCloseModal } from './useCloseModal';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useState } from 'react';

const ChangePassModal = ({onChangePassword}) => {
    const dispatch = useDispatch();

    const [formValue, setFormValue] = useState({
        password: '111',
        passwordNew: '222',
        confirmPass: '333',
    })

    const {vision, close} = useCloseModal();
    const closeModal = () => {
        close(() => dispatch(toggleModal(false)));
    }


    const changePassword = (e, formValue) => {
        e.preventDefault();
        onChangePassword(formValue);
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
                    <h3>Смена пароля</h3>
                </div>
                <form className={styles.formBlock} onSubmit={(e) => changePassword(e, formValue)}>
                    <label className={styles.passLabel}>
                        Старый пароль
                        <input 
                            name='password' 
                            type="password" 
                            value={formValue.password} 
                            onChange={handleChange} 
                            placeholder='Введите старый пароль'
                            // required={true}
                        />
                    </label>
                    <label className={styles.passLabel}>
                        Новый пароль
                        <input 
                            name='passwordNew' 
                            type="password" 
                            value={formValue.passwordNew} 
                            onChange={handleChange} 
                            placeholder='Введите новый пароль'
                            // required={true}
                        />
                    </label>
                    <label className={styles.passLabel}>
                        Подтверждение пароля
                        <input 
                            name='confirmPass' 
                            type="password" 
                            value={formValue.confirmPass} 
                            onChange={handleChange} 
                            placeholder='Подтвердите новый пароль'
                            // required={true}
                        />
                    </label>
                    <div className={styles.buttonsBlock}>
                        <ButtonElement onClick={closeModal} className={'exitButton modalButton'}>Отмена</ButtonElement>
                        <ButtonElement className={'addButton modalButton'}>Сменить пароль</ButtonElement>
                    </div>
                </form>
            </div>
        </Modal>
    )
};

export default ChangePassModal;