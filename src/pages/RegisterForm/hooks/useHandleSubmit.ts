import useRegisterUser from '@/hooks/useRegisterUser';

import {FormDetails} from '../types';

interface Params {
  onRegisteredUser: () => void;
}

const useHandleSubmit = ({onRegisteredUser}: Params) => {
  const registerUser = useRegisterUser();

  const handleSubmit = async (form: FormDetails) => {
    const {email, newPassword: password} = form;

    await registerUser({
      email,
      password,
    });

    onRegisteredUser();
  };

  return handleSubmit;
};

export default useHandleSubmit;
