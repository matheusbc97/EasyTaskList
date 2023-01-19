import React from 'react';
import {FloatingActionButton} from '@/shared/components';
import {render, fireEvent} from '@testing-library/react-native';

jest.mock('@/shared/hooks/data/useAppTheme');

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
