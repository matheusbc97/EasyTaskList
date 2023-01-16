import React from 'react';
import {NavigateButton} from '@/shared/components';
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

describe('NavigateButton Component', () => {
  it('Should render a button', () => {
    render(
      <NavigateButton title="Teste" iconName="pencil" onPress={() => {}} />,
    );
  });

  it('Should press a button', async () => {
    const onPress = jest.fn();
    const {findByTestId} = render(
      <NavigateButton title="Teste" iconName="pencil" onPress={onPress} />,
    );

    const element = await findByTestId('button-base');
    fireEvent.press(element);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('Should have a title', async () => {
    const title = 'testing';

    const {findByTestId} = render(
      <NavigateButton title={title} iconName="pencil" onPress={() => {}} />,
    );

    const element = await findByTestId('NavigateButton-title');

    expect(element.children[0]).toBe(title);
  });
});
