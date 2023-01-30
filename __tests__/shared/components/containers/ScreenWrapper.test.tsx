import {ScreenWrapper} from '@/shared/components';
import {TEST_IDS} from '@/shared/constants/testIds';
import {render} from '@testing-library/react-native';
import {TextStyle, View} from 'react-native';

describe('ScreenWrapper Component', () => {
  it('Should render a ScreenWrapper', () => {
    render(<ScreenWrapper />);
  });

  it('Container should have custom style', async () => {
    const style: TextStyle = {
      backgroundColor: 'red',
    };

    const {findByTestId} = render(<ScreenWrapper style={style} />);

    const element = await findByTestId(TEST_IDS.SCREEN_WRAPPER);

    expect(element).toHaveStyle(style);
  });

  it('Container should show children', async () => {
    const viewTestId = 'fakeTestId';

    const {findByTestId} = render(
      <ScreenWrapper>
        <View testID={viewTestId} />
      </ScreenWrapper>,
    );

    const element = await findByTestId(viewTestId);

    expect(element).toBeVisible();
  });
});
