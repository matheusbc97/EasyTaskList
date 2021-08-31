import {useDispatch} from 'react-redux';
import {setIsLogged} from '@store/configs';
import {resetUser} from '@store/account/user';

const useSignOut = () => {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(resetUser());
    dispatch(setIsLogged(false));
  };

  return logOut;
};

export default useSignOut;
