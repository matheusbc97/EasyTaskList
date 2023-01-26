import React from 'react';
import {RoundedButton} from '@/shared/components';
import {render, fireEvent} from '@testing-library/react-native';
import {useAppThemeReturnMock} from '@/shared/hooks/data/__mocks__/useAppTheme';
import {TEST_IDS} from '@/shared/constants/testIds';

jest.mock('@/shared/hooks/data/useAppTheme');

describe('RoundedButton Component', () => {
  it('Should render a button', () => {
    render(<RoundedButton />);
  });

  it('Should press a button', async () => {
    const onPress = jest.fn();
    const {findByTestId} = render(<RoundedButton onPress={onPress} />);

    const element = await findByTestId(TEST_IDS.BUTTON_BASE);
    fireEvent.press(element);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('Should not press a disabled button', async () => {
    const onPress = jest.fn();
    const {findByTestId} = render(<RoundedButton onPress={onPress} disabled />);

    const element = await findByTestId(TEST_IDS.BUTTON_BASE);
    fireEvent.press(element);

    expect(onPress).toHaveBeenCalledTimes(0);
  });

  it('Should receive the style prop', async () => {
    const onPress = jest.fn();

    const style = {backgroundColor: 'red'};

    const {findByTestId} = render(
      <RoundedButton onPress={onPress} style={style} />,
    );

    const element = await findByTestId(TEST_IDS.BUTTON_BASE);

    expect(element).toHaveStyle(style);
  });

  it('Should have text', async () => {
    const text = 'testing';

    const {findByTestId} = render(<RoundedButton text={text} />);

    const element = await findByTestId('text-base');

    expect(element).toHaveTextContent(text);
  });

  it('Should invert the colors', async () => {
    const onPress = jest.fn();

    const {findByTestId, container} = render(
      <RoundedButton onPress={onPress} text="testing" inverted />,
    );

    expect(container.props.inverted).toBeTruthy();

    const buttonBaseElement = await findByTestId(TEST_IDS.BUTTON_BASE);

    expect(buttonBaseElement).toHaveStyle({
      borderColor: useAppThemeReturnMock.primaryColor,
    });

    const textBaseElement = await findByTestId('text-base');

    expect(textBaseElement).toHaveStyle({
      color: useAppThemeReturnMock.primaryColor,
    });
  });

  it('backgroundColor Should be secondary color ', async () => {
    const onPress = jest.fn();

    const {findByTestId} = render(<RoundedButton onPress={onPress} />);

    const element = await findByTestId(TEST_IDS.BUTTON_BASE);

    const style = {
      backgroundColor: useAppThemeReturnMock.secondaryColor,
    };

    const jsonStyle = JSON.stringify(style);

    expect(JSON.stringify(element.props.style)).toContain(
      jsonStyle.substring(1, jsonStyle.length - 1),
    );
  });
});
