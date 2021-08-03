import {useDispatch} from 'react-redux';
import {setIsLogged} from '@store/configs';

const useSetUserLogged = () => {
  const dispatch = useDispatch();

  const setUserLogged = (logged: boolean) => {
    dispatch(setIsLogged(logged));
  };

  return setUserLogged;
};

export default useSetUserLogged;
