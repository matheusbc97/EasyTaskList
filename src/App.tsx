import React from 'react';
import AppNavigator from './navigation';
import {Provider} from 'react-redux';

import './translations';

import store from './store';
import {FullScreenLoader, Toast} from './shared/components';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from 'react-query';

import ErrorBoundary from './ErrorBoundary';

const queryClient = new QueryClient();

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <AppNavigator />
            <FullScreenLoader />
            <Toast />
          </QueryClientProvider>
        </SafeAreaProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
