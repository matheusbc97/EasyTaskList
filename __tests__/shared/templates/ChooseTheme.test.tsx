import ChooseTheme from '@/modules/shared/templates/ChooseTheme';
import {fireEvent, render} from '@testing-library/react-native';
import {TEST_IDS} from '@/modules/shared/constants/testIds';
import * as themes from '@/assets/themes';
import {AppThemeName} from '@/modules/shared/models';

jest.mock('@/shared/hooks/data/useAppTheme');

describe('ChooseTheme Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render an ChooseTheme', () => {
    render(<ChooseTheme onThemePress={() => {}} />);
  });

  it('Should fire onThemePress', async () => {
    const onThemePress = jest.fn();
    const {findByTestId} = render(<ChooseTheme onThemePress={onThemePress} />);

    const promises = Object.keys(themes).map(async (key: any) => {
      const element = await findByTestId(TEST_IDS.THEME_BOX(key));

      fireEvent.press(element);

      expect(onThemePress).toHaveBeenCalledWith(themes[key as AppThemeName]);
    });

    await Promise.all(promises);
  });
});
