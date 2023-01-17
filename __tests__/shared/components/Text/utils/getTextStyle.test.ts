import {useAppThemeReturnMock} from '@/shared/hooks/__mocks__/useAppTheme';
import {getTextStyle} from '@/shared/components/Text/utils/getTextStyle';

jest.mock('@/shared/hooks/useAppTheme');

describe('Text getTextStyle Util', () => {
  it('Should return textAlign: center', () => {
    const styles = getTextStyle({
      centerText: true,
      primaryColor: false,
      secondaryColor: false,
      theme: useAppThemeReturnMock,
    });

    expect(styles.textAlign).toBe('center');
  });

  it('Should return secondary color', () => {
    const styles = getTextStyle({
      centerText: false,
      primaryColor: false,
      secondaryColor: true,
      theme: useAppThemeReturnMock,
    });

    expect(styles.color).toBe(useAppThemeReturnMock.secondaryColor);
  });
});
