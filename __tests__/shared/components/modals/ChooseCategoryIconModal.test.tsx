import {ChooseCategoryIconModal} from '@/modules/shared/components';
import {fireEvent, render} from '@testing-library/react-native';
import {TEST_IDS} from '@/modules/shared/constants/testIds';
import categoryIconNames from '@/assets/categoryIconNames';

jest.mock('@/shared/hooks/data/useAppTheme');

describe('ChooseCategoryIconModal Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render a ChooseCategoryIconModal', () => {
    render(
      <ChooseCategoryIconModal
        isVisible
        onBackButtonPress={() => {}}
        onIconPress={() => {}}
      />,
    );
  });

  it('Should be visible', async () => {
    const {findByTestId} = render(
      <ChooseCategoryIconModal
        isVisible
        onBackButtonPress={() => {}}
        onIconPress={() => {}}
      />,
    );

    const element = await findByTestId(
      TEST_IDS.CHOOSE_CATEGORY_ICON_MODAL_CONTAINER,
    );

    expect(element).toBeVisible();
  });

  it('Should not be visible', async () => {
    const {queryByTestId} = render(
      <ChooseCategoryIconModal
        isVisible={false}
        onBackButtonPress={() => {}}
        onIconPress={() => {}}
      />,
    );

    const element = queryByTestId(
      TEST_IDS.CHOOSE_CATEGORY_ICON_MODAL_CONTAINER,
    );

    expect(element).toBe(null);
  });

  it('Should fire back press event', async () => {
    const onBackButtonPress = jest.fn();

    const {findByTestId} = render(
      <ChooseCategoryIconModal
        isVisible
        onBackButtonPress={onBackButtonPress}
        onIconPress={() => {}}
      />,
    );

    const element = await findByTestId(
      TEST_IDS.CHOOSE_CATEGORY_ICON_MODAL_CANCEL_BUTTON,
    );

    fireEvent.press(element);
    fireEvent(element, 'backButtonPress');

    expect(onBackButtonPress).toBeCalledTimes(2);
  });

  it('Should fire onIconPress', async () => {
    const onIconPress = jest.fn();

    const {findByTestId} = render(
      <ChooseCategoryIconModal
        isVisible
        onBackButtonPress={() => {}}
        onIconPress={onIconPress}
      />,
    );

    const promises = categoryIconNames.map(async (_, index) => {
      const element = await findByTestId(
        TEST_IDS.CHOOSE_CATEGORY_ICON_MODAL_ICON_BUTTON(index),
      );

      fireEvent.press(element);
      expect(onIconPress).toHaveBeenCalledWith(index);
    });

    await Promise.all(promises);
  });
});
