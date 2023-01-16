import React from 'react';
import {FloatingActionButton} from '@/shared/components';
import {render, fireEvent} from '@testing-library/react-native';

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

describe('FloatingActionButton Component', () => {
  it('Should render a button', () => {
    render(<FloatingActionButton onPress={() => {}} />);
  });

  it('Should press a button', async () => {
    const onPress = jest.fn();
    const {findByTestId} = render(<FloatingActionButton onPress={onPress} />);

    const element = await findByTestId('button-base');
    fireEvent.press(element);

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
