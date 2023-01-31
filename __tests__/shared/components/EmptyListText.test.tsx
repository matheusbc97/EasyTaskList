import {EmptyListText} from '@/shared/components';
import {render} from '@testing-library/react-native';
import {TEST_IDS} from '@/shared/constants/testIds';

jest.mock('@/shared/hooks/data/useAppTheme');

describe('EmptyListText Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render an EmptyListText', () => {
    render(<EmptyListText text="Testing" />);
  });

  it('Should have text "Testing"', async () => {
    const text = 'Testing';

    const {findByTestId} = render(<EmptyListText text={text} />);

    const element = await findByTestId(TEST_IDS.TEXT_BASE);

    expect(element).toHaveTextContent(text);
  });
});
