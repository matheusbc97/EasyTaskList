import React, {useEffect} from 'react';
import AppNavigator from './navigation';
import {Provider} from 'react-redux';
import store from './store';
import {LoadingHandler, Toast} from './shared/components';
import {createUserProfileDocument} from './shared/firebase';

const App = () => {
  useEffect(() => {
    createUserProfileDocument();
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
      <LoadingHandler />
      <Toast />
    </Provider>
  );
};

export default App;
