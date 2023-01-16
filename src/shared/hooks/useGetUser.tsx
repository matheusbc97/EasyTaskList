import {useSelector} from 'react-redux';

import {selectUser} from '@/store/account/user';

const useGetUser = () => {
  const user = useSelector(selectUser);

  return user;
};

export default useGetUser;
