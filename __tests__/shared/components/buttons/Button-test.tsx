import React from 'react';
import {Button} from '@/shared/components';
import {render, fireEvent} from '@testing-library/react-native';

describe('Button Component', () => {
  it('Should render a button', () => {
    render(<Button />);
  });

  it('Should press a button', async () => {
    const onPress = jest.fn();
    const {findByTestId} = render(<Button onPress={onPress} />);

    const element = await findByTestId('button-base');
    fireEvent.press(element);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('Should not press a disabled button', async () => {
    const onPress = jest.fn();
    const {findByTestId} = render(<Button onPress={onPress} disabled />);

    const element = await findByTestId('button-base');
    fireEvent.press(element);

    expect(onPress).toHaveBeenCalledTimes(0);
  });

  it('Should receive the style prop', async () => {
    const onPress = jest.fn();

    const style = {backgroundColor: 'red'};

    const {findByTestId} = render(<Button onPress={onPress} style={style} />);

    const element = await findByTestId('button-base');

    console.log(JSON.stringify(style));

    expect(JSON.stringify(element.props.style)).toContain(
      JSON.stringify(style),
    );
  });
});
