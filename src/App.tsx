import React from 'react';
import AppNavigator from './navigation';
import {Provider} from 'react-redux';

import './translations';

import store from './store';
import {FullScreenLoader, Toast} from './shared/components';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppNavigator />
        <FullScreenLoader />
        <Toast />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
