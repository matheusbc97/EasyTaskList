import {useSelector} from 'react-redux';

import {selectAppTheme} from '@store/configs';

const useAppTheme = () => {
  const appTheme = useSelector(selectAppTheme);

  return appTheme;
};

export default useAppTheme;
