import {useDispatch} from 'react-redux';
import {registerUser as registerUserAction} from '@store/account/user';

interface Params {
  email: string;
  password: string;
}

const useRegisterUser = () => {
  const dispatch = useDispatch();

  const registerUser = async ({email, password}: Params) => {
    return new Promise<void>(async resolve => {
      const action = await dispatch(
        registerUserAction({
          email,
          password,
        }),
      );

      if (action.payload) {
        resolve();
        return;
      }
    });
  };

  return registerUser;
};

export default useRegisterUser;
