import {combineReducers} from 'redux';

import account from './account/reducers';
import configs from './configs';
import categories from './categories';
import tasks from './tasks';

export default combineReducers({
  account,
  configs,
  categories,
  tasks,
});
