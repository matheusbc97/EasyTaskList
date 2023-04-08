import {useSelector} from 'react-redux';

import {selectAppTheme} from '@/store/configs';

export const useAppTheme = () => {
  const appTheme = useSelector(selectAppTheme);

  return appTheme;
};
