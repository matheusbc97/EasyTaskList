import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {setAppTheme as setAppThemeAction} from '@/store/configs';
import {AppTheme} from '@/modules/shared/models';

const useSetAppTheme = () => {
  const dispatch = useDispatch();

  const changeAppTheme = useCallback(
    (theme: AppTheme) => {
      dispatch(setAppThemeAction(theme));
    },
    [dispatch],
  );

  return changeAppTheme;
};

export default useSetAppTheme;
