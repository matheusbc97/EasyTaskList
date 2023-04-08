import React from 'react';
import {NavigateButton} from '@/modules/shared/components';
import {render, fireEvent} from '@testing-library/react-native';
import {TEST_IDS} from '@/modules/shared/constants/testIds';

jest.mock('@/shared/hooks/data/useAppTheme');

describe('NavigateButton Component', () => {
  it('Should render a button', () => {
    render(
      <NavigateButton title="Testing" iconName="pencil" onPress={() => {}} />,
    );
  });

  it('Should press a button', async () => {
    const onPress = jest.fn();
    const {findByTestId} = render(
      <NavigateButton title="Testing" iconName="pencil" onPress={onPress} />,
    );

    const element = await findByTestId(TEST_IDS.BUTTON_BASE);
    fireEvent.press(element);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('Should have a title', async () => {
    const title = 'testing';

    const {findByTestId} = render(
      <NavigateButton title={title} iconName="pencil" onPress={() => {}} />,
    );

    const element = await findByTestId('NavigateButton-title');

    expect(element).toHaveTextContent(title);
  });

  it('Should render a FontAwesome5', async () => {
    const {findByTestId} = render(
      <NavigateButton
        title="testing"
        type="FontAwesome5"
        iconName="pencil"
        onPress={() => {}}
      />,
    );

    const element = await findByTestId('FontAwesomeIcon5');

    expect(element).toBeVisible();
  });
});
