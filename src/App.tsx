import React from 'react';
import AppNavigator from './navigation';
import {Provider} from 'react-redux';
import store from './store';
import {LoadingHandler, Toast} from './shared/components';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
      <LoadingHandler />
      <Toast />
    </Provider>
  );
};

export default App;
