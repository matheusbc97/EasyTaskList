import {useDispatch} from 'react-redux';
import {resetAll} from '@store/configs';

const useSignOut = () => {
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(resetAll());
  };

  return logOut;
};

export default useSignOut;
