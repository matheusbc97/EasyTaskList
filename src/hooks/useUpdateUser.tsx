import {useDispatch} from 'react-redux';

import {updateUser as updateUserAction} from '@store/account/user';
import {AppThemeName} from '@shared/models';

interface UserUpdates {
  name?: string;
  avatar?: number;
  theme?: AppThemeName;
}

const useUpdateUser = () => {
  const dispatch = useDispatch();

  const updateUser = (userUpdates: UserUpdates) => {
    return new Promise<void>(async (resolve, reject) => {
      const payloadAction = await dispatch(
        updateUserAction({
          name: userUpdates?.name,
          avatar: userUpdates?.avatar,
          theme: userUpdates?.theme,
        }),
      );

      if (payloadAction.payload) {
        resolve();
      } else {
        reject();
      }
    });
  };

  return updateUser;
};

export default useUpdateUser;
