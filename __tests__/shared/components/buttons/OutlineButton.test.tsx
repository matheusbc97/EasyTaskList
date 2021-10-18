import React from 'react';
import {OutlineButton} from '@/shared/components';
import {render, fireEvent} from '@testing-library/react-native';

jest.mock('@/hooks/useAppTheme', () => {
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

describe('OutlineButton Component', () => {
  it('Should render a OutlineButton', () => {
    render(<OutlineButton iconName="pen" text="teste" />);
  });

  it('Should press a OutlineButton', async () => {
    const onPress = jest.fn();
    const {findByTestId} = render(
      <OutlineButton iconName="pen" text="teste" onPress={onPress} />,
    );

    const element = await findByTestId('button-base');
    fireEvent.press(element);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('Should receive the style prop', async () => {
    const onPress = jest.fn();

    const style = {backgroundColor: 'red'};

    const {findByTestId} = render(
      <OutlineButton
        iconName="pen"
        text="teste"
        onPress={onPress}
        style={style}
      />,
    );

    const element = await findByTestId('button-base');

    expect(JSON.stringify(element.props.style)).toContain(
      JSON.stringify(style),
    );
  });

  it('Should have a text', async () => {
    const title = 'testing';

    const {findByTestId} = render(
      <OutlineButton text={title} iconName="pen" onPress={() => {}} />,
    );

    const element = await findByTestId('OutlineButton-text');

    expect(element.children[0]).toBe(title);
  });
});
