import {Toast} from '@/shared/components';
import {act, render, waitFor} from '@testing-library/react-native';
import {TEST_IDS} from '@/shared/constants/testIds';
import {showToast} from '@/shared/components/Toast';
import {ShowToastOptions} from '@/shared/components/Toast/types/ShowToastOptions';
import ReactTestRenderer from 'react-test-renderer';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import useToastOptions from '@/shared/components/Toast/hooks/useToastOptions';

jest.mock(
  'react-native-safe-area-context',
  () => require('react-native-safe-area-context/jest/mock').default,
);

let mockedUseToastOptions: jest.Mock;

jest.mock('@/shared/components/Toast/hooks/useToastOptions', () => {
  mockedUseToastOptions = jest.fn(() => {
    return {
      toastOptions: {
        isVisible: true,
        text: 'test',
        type: 'normal',
        buttonLabel: '55',
      },
      resetOptions: jest.fn(),
    };
  });

  return mockedUseToastOptions;
});

/*
let mockedToastEventListener: jest.Mock<any, any>;
let mockedShowToast: jest.Mock<any, any>;
let mockListenerFunction: Function;

type ToastListener = (data: ShowToastOptions) => void;

jest.mock('@/shared/components/Toast/toastEventListener', () => {
  mockedToastEventListener = jest.fn((listener: ToastListener) => {
    mockListenerFunction = listener;
    return {remove: () => {}};
  });

  mockedShowToast = jest.fn((data: ShowToastOptions) => {
    mockListenerFunction?.(data);
  });

  return {
    toastEventListener: mockedToastEventListener,
    showToast: mockedShowToast,
  };
});*/

describe('Toast Component', () => {
  it('Should render a Toast', () => {
    render(
      <SafeAreaProvider>
        <Toast />
      </SafeAreaProvider>,
    );
  });

  it('Should show the toast', async () => {
    mockedUseToastOptions.mockReturnValue({
      toastOptions: {
        isVisible: true,
        text: 'test',
        type: 'normal',
        buttonLabel: '2',
      },
      resetOptions: jest.fn(),
    });

    const {findByTestId} = render(
      <SafeAreaProvider>
        <Toast />
      </SafeAreaProvider>,
    );

    const element = await findByTestId(TEST_IDS.TOAST);

    await waitFor(() => expect(element).toBeVisible());
  });
});
