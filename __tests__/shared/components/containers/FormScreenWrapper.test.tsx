import {FormScreenWrapper} from '@/modules/shared/components';
import {TEST_IDS} from '@/modules/shared/constants/testIds';
import {render, waitFor} from '@testing-library/react-native';
import {TextStyle, View} from 'react-native';

jest.mock('@/shared/hooks/data/useAppTheme');

describe('FormScreenWrapper Component', () => {
  it('Should render a FormScreenWrapper', () => {
    render(<FormScreenWrapper />);
  });

  it('Container should have custom content style', async () => {
    const style: TextStyle = {
      backgroundColor: 'red',
    };

    const {findByTestId} = render(<FormScreenWrapper contentStyle={style} />);

    const element = await findByTestId(TEST_IDS.FORM_CONTAINER);

    expect(element).toHaveStyle(style);
  });

  it('Should items on center', async () => {
    const {findByTestId} = render(<FormScreenWrapper alignCenter />);

    const element = await findByTestId(TEST_IDS.FORM_CONTAINER);

    expect(element).toHaveStyle({
      alignItems: 'center',
    });
  });

  it('Container should show children', async () => {
    const viewTestId = 'fakeTestId';

    const {findByTestId} = render(
      <FormScreenWrapper>
        <View testID={viewTestId} />
      </FormScreenWrapper>,
    );

    const element = await findByTestId(viewTestId);

    await waitFor(() => expect(element).toBeVisible());
  });
});
