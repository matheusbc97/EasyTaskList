import React from 'react';
import {FloatingActionButton} from '@/modules/shared/components';
import {render, fireEvent} from '@testing-library/react-native';
import {TEST_IDS} from '@/modules/shared/constants/testIds';

jest.mock('@/shared/hooks/data/useAppTheme');

describe('FloatingActionButton Component', () => {
  it('Should render a button', () => {
    render(<FloatingActionButton onPress={() => {}} />);
  });

  it('Should press a button', async () => {
    const onPress = jest.fn();
    const {findByTestId} = render(<FloatingActionButton onPress={onPress} />);

    const element = await findByTestId(TEST_IDS.BUTTON_BASE);
    fireEvent.press(element);

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
