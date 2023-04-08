import {render} from '@testing-library/react-native';
import {TEST_IDS} from '@/modules/shared/constants/testIds';
import {CategoryColorBox} from '@/modules/shared/components';

describe('CategoryColorBox Component', () => {
  it('Should render an CategoryColorBox', () => {
    render(<CategoryColorBox colorIndex={0} />);
  });

  it('Should render transparent view', async () => {
    const {findByTestId} = render(<CategoryColorBox colorIndex={-1} />);

    const element = await findByTestId(
      TEST_IDS.CATEGORY_COLOR_BOX_TRANSPARENT_VIEW,
    );

    expect(element).toBeVisible();
  });

  it('Should render Linear Gradient', async () => {
    const {findByTestId} = render(<CategoryColorBox colorIndex={0} />);

    const element = await findByTestId(
      TEST_IDS.CATEGORY_COLOR_BOX_LINEAR_GRADIENT,
    );

    expect(element).toBeVisible();
  });
});
