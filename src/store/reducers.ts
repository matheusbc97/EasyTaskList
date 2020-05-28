import {combineReducers} from 'redux';

import account from './account/reducers';
import configs from './configs';

export default combineReducers({
  account,
  configs,
});
