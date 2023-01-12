import {combineReducers} from 'redux';

import account from './account/reducers';
import configs from './configs';
import tasks from './tasks';
import about from './about';

export default combineReducers({
  account,
  configs,
  tasks,
  about,
});
