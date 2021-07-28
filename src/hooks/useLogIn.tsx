import {useDispatch} from 'react-redux';

import {authenticateUser} from '@store/account/user';

const useLogIn = () => {
  const dispatch = useDispatch();

  const logIn = async (email: string, password: string) => {
    const response = await dispatch(
      authenticateUser({
        email,
        password,
      }),
    );

    const payload = response.payload as any;

    return payload.isLogged;
  };

  return {
    logIn,
  };
};

export default useLogIn;
