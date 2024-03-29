import {ChooseCategoryColorModal} from '@/modules/shared/components';
import {fireEvent, render} from '@testing-library/react-native';
import {TEST_IDS} from '@/modules/shared/constants/testIds';
import categoryColors from '@/assets/categoryColors';

jest.mock('@/shared/hooks/data/useAppTheme');
jest.mock('@/shared/hooks/useTranslation');

describe('ChooseCategoryColorModal Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render an ChooseCategoryColorModal', () => {
    render(
      <ChooseCategoryColorModal
        isVisible={true}
        onBackButtonPress={() => {}}
        onColorPress={() => {}}
      />,
    );
  });

  it('Should be visible', async () => {
    const {findByTestId} = render(
      <ChooseCategoryColorModal
        isVisible={true}
        onBackButtonPress={() => {}}
        onColorPress={() => {}}
      />,
    );

    const element = await findByTestId(
      TEST_IDS.CHOOSE_CATEGORY_COLOR_MODAL_CONTAINER,
    );

    expect(element).toBeVisible();
  });

  it('Should not be visible', () => {
    const {queryByTestId} = render(
      <ChooseCategoryColorModal
        isVisible={false}
        onBackButtonPress={() => {}}
        onColorPress={() => {}}
      />,
    );

    const element = queryByTestId(
      TEST_IDS.CHOOSE_CATEGORY_COLOR_MODAL_CONTAINER,
    );

    expect(element).toBe(null);
  });

  it('Should fire onBackButtonPress', async () => {
    const onBackButtonPress = jest.fn();

    const {findByTestId} = render(
      <ChooseCategoryColorModal
        isVisible={true}
        onBackButtonPress={onBackButtonPress}
        onColorPress={() => {}}
      />,
    );

    const element = await findByTestId(
      TEST_IDS.CHOOSE_CATEGORY_COLOR_MODAL_CANCEL_BUTTON,
    );

    fireEvent.press(element);
    fireEvent(element, 'backButtonPress');

    expect(onBackButtonPress).toHaveBeenCalledTimes(2);
  });

  it('Should fire onColorPress', async () => {
    const onColorPress = jest.fn();

    const {findByTestId} = render(
      <ChooseCategoryColorModal
        isVisible={true}
        onBackButtonPress={() => {}}
        onColorPress={onColorPress}
      />,
    );

    const promises = categoryColors.map(async (_, index) => {
      const element = await findByTestId(
        TEST_IDS.CATEGORY_COLOR_BOX_BUTTON(index),
      );

      fireEvent.press(element);
      expect(onColorPress).toHaveBeenCalledWith(index);
    });

    await Promise.all(promises);
  });
});
