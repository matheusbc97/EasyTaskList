import {fireEvent, render} from '@testing-library/react-native';
import {TEST_IDS} from '@/modules/shared/constants/testIds';
import CategoryColorBoxButton from '@/modules/shared/components/modals/ChooseCategoryColorModal/components/CategoryColorBoxButton';
import categoryColors from '@/assets/categoryColors';

describe('CategoryColorBoxButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render an CategoryColorBoxButton', () => {
    const {color1, color2} = categoryColors[0];
    render(
      <CategoryColorBoxButton
        onColorPress={() => {}}
        color1={color1}
        color2={color2}
      />,
    );
  });

  it('Should fire press event', async () => {
    const {color1, color2} = categoryColors[0];

    const onColorPress = jest.fn();

    const {findByTestId} = render(
      <CategoryColorBoxButton
        onColorPress={onColorPress}
        color1={color1}
        color2={color2}
      />,
    );

    const element = await findByTestId(TEST_IDS.BUTTON_BASE);

    fireEvent.press(element);

    expect(onColorPress).toHaveBeenCalledTimes(1);
  });
});
