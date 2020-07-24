import React, {useEffect} from 'react';
import AppNavigator from './navigation';
import {Provider} from 'react-redux';
import store from './store';
import LoadingHandler from './library/components/LoadingHandler';
import Toast from './library/components/Toast';
import auth from '@react-native-firebase/auth';

const App = () => {
  useEffect(() => {
    auth().createUserWithEmailAndPassword('matheus@teste.com', '123456');
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
