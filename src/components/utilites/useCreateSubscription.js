import { oneHandleSubscription} from '@/redux/subscriptions'
import { useDispatch } from 'react-redux';
import { toggleModal } from '@/redux/showModal';

export const useHandleSubscription = ({ setInfoTypeModal }) => {
  const dispatch = useDispatch();

  const onHandleSub = async (token, formData, action = undefined) => {

    const result = await dispatch(oneHandleSubscription({token, formData, action}));

    if (oneHandleSubscription.fulfilled.match(result)) {
      if (setInfoTypeModal) setInfoTypeModal('info');
      setTimeout(() => dispatch(toggleModal({isInfoModal: true})), 101);
    }
    return result;
  };

  return { onHandleSub };
}