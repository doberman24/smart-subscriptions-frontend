import styles from './Admin.module.css'
import ButtonElement from '@/components/ui/ButtonElement/ButtonElement';
import loadingStyles from '@/components/ui/Loading.module.css';
import AdminUserParam from '@/pages/Admin/AdminUserParam'
import SaveDataModal from '@/components/ModalContent/SaveDataModal';
import logo from '@/assets/img/logo.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '@/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { userParams } from '@/constants/adminConstants';
import { useModals } from '@/components/ModalContent/useModals';
import { toggleModal } from '@/redux/showModal';
import InfoModal from '@/components/ModalContent/InfoModal';
import ExitAccountModal from '@/components/ModalContent/ExitAccountModal';

const Admin = () => { 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isModal = useSelector(state => state.showModal);
  const {showClickModal} = useModals({});
  const [infoTypeModal, setInfoTypeModal] = useState(null);

  const {token} = useSelector(state => state.token);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [selectUserOriginal, setSelectUserOriginal] = useState(null);
  const [selectUserNew, setSelectUserNew] = useState(null);
  const [selectUserId, setSelectUserId] = useState(null);
  const [reqMessage, setReqMessage] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const {data, error, status} = await api.getAllUsers(token);
      if (data) {
        setUsers(data.users);
        setCurrentUser(data.currentUser);
      } 
      if (error) {
        navigate(`/${status || '500'}`, {replace: true});
      }
    }
    getData();
  }, [])

  const getselectUser = async (user) => {
    setSelectUserOriginal(null);
    setSelectUserNew(null);
    setReqMessage(null);
    const {data, error, status} = await api.getAllUsers(token, user._id);
    if (data) {
      setSelectUserOriginal(data.selectUser);
      setSelectUserNew(data.selectUser);
      setSelectUserId(user._id);
    }
    if (error) {
      navigate(`/${status || '500'}`, {replace: true});
    }
  }

  const onChangeInput = (e, label) => {
    setSelectUserNew(item => ({...item, [label]: e.target.value}))
  }

  const onChangeDropdown = (value, label) => {
    setSelectUserNew(item => ({...item, [label]: value}))
  }

  const onSaveChange = async () => {
    setReqMessage(null);
    const modifiedUserData = Object.entries(selectUserNew).reduce((item, [key, value]) => {
      if (value !== selectUserOriginal[key]) {
        item[key] = value;
      }
      return item;
    }, {});
    const {data, message, error, status} = await api.saveUserAdminData(modifiedUserData, token, selectUserNew._id);
    if (data && message) {
      setSelectUserOriginal(data.updateDataUser);
      setSelectUserNew(data.updateDataUser);
      setReqMessage(message);
      getInfoModal();
    } else {
      setReqMessage(message);
      getInfoModal();
    }
    if (error) {
      navigate(`/${status || '500'}`, {replace: true});
    }
  };

  if (!users || !currentUser) {
    return <div className={loadingStyles.loading}>Загрузка...</div>
  }

  const getInfoModal = () => {
    setInfoTypeModal('info');
    setTimeout(() => dispatch(toggleModal({ isInfoModal: true })), 115);
  }

  // console.log(currentUser);
  
  return (
    <div className={styles.adminPage}>
      {isModal.isSaveModal && <SaveDataModal onSaveChange={onSaveChange} />}
      {isModal.isInfoModal && <InfoModal message={reqMessage} typeInfo={infoTypeModal}/>}
      {isModal.isExitModal && <ExitAccountModal />}
      <div className={styles.headerBlock}>
        <h1>Администратор: <b className={styles.adminLogin}>{currentUser.user.login}</b></h1>
        <img src={logo} height='60px' alt="logo" />
      </div>
      <div className={styles.mainBlock}>
        <div className={styles.dataBlock}>
          <div className={styles.usersBlock}>
            <h2>Пользователи</h2>
            <ul className={styles.userList}>
              {users.map(user => 
                <li className={`${styles.user} ${selectUserId === user._id ? styles.selectUser : ''}`} key={user._id} onClick={() => getselectUser(user)}>
                  {user.login}
                </li>
              )}
            </ul>
          </div>
          <div className={styles.valuesBlock}>
            <h2>Данные пользователя</h2>
            <ul className={styles.valuesList}>
              {
                userParams.map(({label, value}) => {
                  return (
                    <li className={styles.userValue} key={label}>
                      <h6 className={styles.nameValue}>{value}</h6>
                        <AdminUserParam 
                          label={label} 
                          selectUserValue={selectUserNew ? selectUserNew[label] : ''}
                          onChangeInput={onChangeInput} 
                          onChangeDropdown={onChangeDropdown}
                        />
                    </li>
                  )
                })
              }
            </ul>
            <div className={styles.buttonBlock}>
              <ButtonElement onClick={() => showClickModal('isSaveModal')} className={'addButton'} disabled={!selectUserId}>Сохранить</ButtonElement>
            </div>
          </div>
            <ButtonElement onClick={() => showClickModal('isExitModal')} className={'exitButton'}>Выйти</ButtonElement>
        </div>
      </div>
    </div>
  )
}

export default Admin;