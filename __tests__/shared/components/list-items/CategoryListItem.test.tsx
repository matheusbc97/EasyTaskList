import {CategoryListItem} from '@/shared/components';
import {TEST_IDS} from '@/shared/constants/testIds';
import {Category} from '@/shared/models';
import {fireEvent, render} from '@testing-library/react-native';
import {TextStyle} from 'react-native';

jest.mock('@/shared/hooks/data/useAppTheme');

const fakeCategory: Category = {
  colorIndex: 0,
  iconIndex: 0,
  id: '1',
  name: 'category-name',
};

describe('CategoryListItem Component', () => {
  it('Should render a CategoryListItem', () => {
    render(<CategoryListItem onPress={() => {}} category={fakeCategory} />);
  });

  it('Container should have custom content style', async () => {
    const style: TextStyle = {
      backgroundColor: 'red',
    };

    const {findByTestId} = render(
      <CategoryListItem
        style={style}
        onPress={() => {}}
        category={fakeCategory}
      />,
    );

    const element = await findByTestId(TEST_IDS.BUTTON_BASE);

    expect(element).toHaveStyle(style);
  });

  it('Should have width and height of size', async () => {
    const size = 100;
    const {findByTestId} = render(
      <CategoryListItem
        size={size}
        onPress={() => {}}
        category={fakeCategory}
      />,
    );

    const element = await findByTestId(TEST_IDS.BUTTON_BASE);

    expect(element).toHaveStyle({
      height: size,
      width: size,
    });
  });

  it('Should fire onPress', async () => {
    const onPress = jest.fn();

    const {findByTestId} = render(
      <CategoryListItem onPress={onPress} category={fakeCategory} />,
    );

    const element = await findByTestId(TEST_IDS.BUTTON_BASE);

    fireEvent.press(element);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('Should show Text', async () => {
    const {findByTestId} = render(
      <CategoryListItem onPress={() => {}} category={fakeCategory} />,
    );

    const element = await findByTestId(TEST_IDS.TEXT_BASE);

    expect(element).toBeVisible();
  });

  it('Should not show Text', async () => {
    const {queryByTestId} = render(
      <CategoryListItem noName onPress={() => {}} category={fakeCategory} />,
    );

    const element = queryByTestId(TEST_IDS.TEXT_BASE);

    expect(element).toBe(null);
  });
});
