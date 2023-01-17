import React from 'react';
import {TextButton} from '@/shared/components';
import {render, fireEvent} from '@testing-library/react-native';

jest.mock('@/shared/hooks/useAppTheme');

describe('TextButton Component', () => {
  it('Should render a TextButton', () => {
    render(<TextButton text="testing" />);
  });

  it('Should press a button', async () => {
    const onPress = jest.fn();
    const {findByTestId} = render(
      <TextButton text="testing" onPress={onPress} />,
    );

    const element = await findByTestId('button-base');
    fireEvent.press(element);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('Should receive the style prop', async () => {
    const onPress = jest.fn();

    const style = {backgroundColor: 'red'};

    const {findByTestId} = render(
      <TextButton text="testing" onPress={onPress} style={style} />,
    );

    const element = await findByTestId('button-base');

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
