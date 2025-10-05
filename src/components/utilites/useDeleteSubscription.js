import { deleteSubscription } from '@/redux/subscriptions'
import { useDispatch } from 'react-redux';
import { toggleModal } from '@/redux/showModal';

export const useDeleteSubscription = ({ setInfoTypeModal }) => {
  const dispatch = useDispatch();

  const onDelSub = async (token, idCard) => {
    
    const result = await dispatch(deleteSubscription({token, idCard}));

    if (deleteSubscription.fulfilled.match(result)) {
      if (setInfoTypeModal) setInfoTypeModal('info');
      if (typeof window !== "undefined") {
        setTimeout(() => dispatch(toggleModal({ isInfoModal: true })), 115);
      }
    }
    return result;
  };

  return { onDelSub };
}
