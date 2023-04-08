import React from 'react';
import {BackButton} from '@/modules/shared/components';

import {render, fireEvent} from '@testing-library/react-native';
import {TEST_IDS} from '@/modules/shared/constants/testIds';

const mockedGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      goBack: mockedGoBack,
    }),
  };
});

jest.mock('@/shared/hooks/data/useAppTheme');
jest.mock('@/shared/hooks/useTranslation');

describe('BackButton Component', () => {
  it('Should render a button', () => {
    render(<BackButton />);
  });

  it('Should call press onPress function', async () => {
    const onPress = jest.fn();
    const {findByTestId} = render(<BackButton onPress={onPress} />);

    const element = await findByTestId(TEST_IDS.BUTTON_BASE);
    fireEvent.press(element);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('Should call goBack function', async () => {
    mockedGoBack.mockReset();
    const {findByTestId} = render(<BackButton />);

    const element = await findByTestId(TEST_IDS.BUTTON_BASE);
    fireEvent.press(element);

    expect(mockedGoBack).toHaveBeenCalledTimes(1);
  });

  it('Should show label', async () => {
    const {findByTestId} = render(<BackButton />);

    await findByTestId('back-button-label');
  });

  it('Should not show label', () => {
    const {queryByTestId} = render(<BackButton showLabel={false} />);

    const element = queryByTestId('back-button-label');

    expect(element).toBeNull();
  });
});
