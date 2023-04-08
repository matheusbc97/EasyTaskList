import {Toast} from '@/modules/shared/components';
import {render, waitFor} from '@testing-library/react-native';
import {TEST_IDS} from '@/modules/shared/constants/testIds';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ToastOptions} from '@/modules/shared/components/Toast/types/ShowToastOptions';

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

describe('Toast Component', () => {
  it('Should render a Toast', () => {
    mockedUseToastOptions.mockReturnValue({
      toastOptions: {
        isVisible: true,
        text: 'test',
      },
      resetOptions: jest.fn(),
    });

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

  it('Should not show the toast', async () => {
    mockedUseToastOptions.mockReturnValue({
      toastOptions: {
        isVisible: false,
        text: 'test',
      } as ToastOptions,
      resetOptions: jest.fn(),
    });

    const {queryByTestId} = render(
      <SafeAreaProvider>
        <Toast />
      </SafeAreaProvider>,
    );

    const element = queryByTestId(TEST_IDS.TOAST);

    expect(element).toBe(null);
  });
});
