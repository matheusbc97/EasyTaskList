import {FormContainer} from '@/shared/components';
import {TEST_IDS} from '@/shared/constants/testIds';
import {render} from '@testing-library/react-native';
import {TextStyle, View} from 'react-native';

describe('FormContainer Component', () => {
  it('Should render a FormContainer', () => {
    render(<FormContainer />);
  });

  it('Container should have custom style', async () => {
    const style: TextStyle = {
      backgroundColor: 'red',
    };

    const {findByTestId} = render(<FormContainer style={style} />);

    const element = await findByTestId(TEST_IDS.FORM_CONTAINER);

    expect(element).toHaveStyle(style);
  });

  it('Container should have space-between', async () => {
    const {findByTestId} = render(<FormContainer spaceBetween />);

    const element = await findByTestId(TEST_IDS.FORM_CONTAINER);

    expect(element).toHaveStyle({
      justifyContent: 'space-between',
    });
  });

  it('Container should have custom height', async () => {
    const height = 100;

    const {findByTestId} = render(<FormContainer height={height} />);

    const element = await findByTestId(TEST_IDS.FORM_CONTAINER);

    expect(element).toHaveStyle({
      height,
    });
  });

  it('Container should show children', async () => {
    const viewTestId = 'fakeTestId';

    const {findByTestId} = render(
      <FormContainer>
        <View testID={viewTestId} />
      </FormContainer>,
    );

    const element = await findByTestId(viewTestId);

    expect(element).toBeVisible();
  });
});
