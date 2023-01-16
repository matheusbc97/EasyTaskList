import React from 'react';
import {BackButton} from '@/shared/components';

import {render, fireEvent} from '@testing-library/react-native';

const mockedGoBack = jest.fn();
const mockedTranslate = jest.fn(() => 'teste');

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      goBack: mockedGoBack,
    }),
  };
});

jest.mock('@/shared/hooks/useAppTheme', () => {
  return () => ({
    primaryColor: '#21B9C7',
    secondaryColor: '#4ADDB5',
    textColor: '#424242',
    secondaryTextColor: '#bdbdbd',
    background: '#fafafa',
    aboveBackground: '#FFF',
    dark: false,
    name: 'BLUE_GREEN',
  });
});

jest.mock('@/shared/hooks', () => {
  return {
    useTranslation: () => ({
      translation: mockedTranslate,
    }),
  };
});

describe('BackButton Component', () => {
  it('Should render a button', () => {
    render(<BackButton />);
  });

  it('Should call press onPress function', async () => {
    const onPress = jest.fn();
    const {findByTestId} = render(<BackButton onPress={onPress} />);

    const element = await findByTestId('button-base');
    fireEvent.press(element);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('Should call goBack function', async () => {
    mockedGoBack.mockReset();
    const {findByTestId} = render(<BackButton />);

    const element = await findByTestId('button-base');
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