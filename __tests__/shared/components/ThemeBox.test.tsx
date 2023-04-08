import {fireEvent, render} from '@testing-library/react-native';

import {ThemeBox} from '@/modules/shared/components';
import {TEST_IDS} from '@/modules/shared/constants/testIds';
import * as themes from '@/assets/themes';
import {AppThemeName} from '@/modules/shared/models';

describe('ThemeBox Component', () => {
  it('Should render an ThemeBox', () => {
    const themeName = Object.keys(themes)[0] as AppThemeName;

    render(<ThemeBox theme={themeName} />);
  });

  it('Should have the right colors', async () => {
    const themeName = Object.keys(themes)[0] as AppThemeName;

    const theme = themes[themeName];

    const {findByTestId} = render(<ThemeBox theme={themeName} />);

    const primaryColorView = await findByTestId(
      TEST_IDS.THEME_BOX_VIEW_PRIMARY_COLOR,
    );

    expect(primaryColorView).toHaveStyle({
      backgroundColor: theme.primaryColor,
    });

    const secondaryColorView = await findByTestId(
      TEST_IDS.THEME_BOX_VIEW_SECONDARY_COLOR,
    );

    expect(secondaryColorView).toHaveStyle({
      backgroundColor: theme.secondaryColor,
    });
  });

  it('Should fire prop onPress', async () => {
    const themeName = Object.keys(themes)[0] as AppThemeName;

    const onPress = jest.fn();

    const {findByTestId} = render(
      <ThemeBox theme={themeName} onPress={onPress} />,
    );

    const element = await findByTestId(TEST_IDS.BUTTON_BASE);

    fireEvent.press(element);

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
