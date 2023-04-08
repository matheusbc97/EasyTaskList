import React from 'react';
import {TextButton} from '@/modules/shared/components';
import {render, fireEvent} from '@testing-library/react-native';
import {TEST_IDS} from '@/modules/shared/constants/testIds';

jest.mock('@/shared/hooks/data/useAppTheme');

describe('TextButton Component', () => {
  it('Should render a TextButton', () => {
    render(<TextButton text="testing" />);
  });

  it('Should press a button', async () => {
    const onPress = jest.fn();
    const {findByTestId} = render(
      <TextButton text="testing" onPress={onPress} />,
    );

    const element = await findByTestId(TEST_IDS.BUTTON_BASE);
    fireEvent.press(element);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('Should receive the style prop', async () => {
    const onPress = jest.fn();

    const style = {backgroundColor: 'red'};

    const {findByTestId} = render(
      <TextButton text="testing" onPress={onPress} style={style} />,
    );

    const element = await findByTestId(TEST_IDS.BUTTON_BASE);

    expect(element).toHaveStyle(style);
  });

  it('Should render an icon', async () => {
    const {findByTestId} = render(
      <TextButton text="testing" iconName="plus" />,
    );

    const element = await findByTestId('TextButtonIcon');

    expect(element).toBeVisible();
  });
});
