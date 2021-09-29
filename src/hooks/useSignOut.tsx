import {useDispatch} from 'react-redux';
import {resetUser} from '@/store/account/user';

const useSignOut = () => {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(resetUser());
  };

  return logOut;
};

export default useSignOut;
