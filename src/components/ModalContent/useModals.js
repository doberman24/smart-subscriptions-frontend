import { toggleModal } from '@/redux/showModal';
import { useDispatch } from 'react-redux';

export const useModals = ({ setIdCard = null}) => {
  const dispatch = useDispatch();
  
  const showAddModal = () => {
    setIdCard(null);
    showClickModal('handleSubscriptionModal')
  };

  const onDeleteShowModal = (id) => {
    setIdCard(id);
    showClickModal('isDeleteSubscriptionModal');
  }

  const onChangeShowModal = (id) => {
    setIdCard(id);
    showClickModal('handleSubscriptionModal');
  }
  
  const showClickModal = (actionModal) => {
    dispatch(toggleModal({[actionModal]: true}));
  }
  
  return { onDeleteShowModal, onChangeShowModal, showAddModal, showClickModal };
}