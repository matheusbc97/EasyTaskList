import useLogIn from '@/hooks/useLogIn';
import {FormDetails} from '../types';

const useHandleSubmit = (userWhithoutConfigurationsCallback: () => void) => {
  const {logIn} = useLogIn();

  const handleSubmit = async (form: FormDetails) => {
    try {
      const isLogged = await logIn(form.email, form.password);

      if (!isLogged) {
        userWhithoutConfigurationsCallback();
      }
    } catch (error) {}
  };

  return handleSubmit;
};

export default useHandleSubmit;
