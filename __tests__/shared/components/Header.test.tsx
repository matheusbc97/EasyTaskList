import {fireEvent, render} from '@testing-library/react-native';

import {Header} from '@/shared/components';
import {TEST_IDS} from '@/shared/constants/testIds';

jest.mock('@/shared/hooks/data/useAppTheme');

const mockedGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      goBack: mockedGoBack,
    }),
  };
});

describe('Header Component', () => {
  it('Should render an Header', () => {
    render(<Header title="Testing" />);
  });

  it('Should show PrimaryHeader', async () => {
    const {findByTestId} = render(<Header title="Testing" />);

    const element = await findByTestId(TEST_IDS.PRIMARY_HEADER_CONTAINER);

    expect(element).toBeVisible();
  });

  it('Should show SecondaryHeader', async () => {
    const {findByTestId} = render(<Header title="Testing" type="secondary" />);

    const element = await findByTestId(TEST_IDS.SECONDARY_HEADER_CONTAINER);

    expect(element).toBeVisible();
  });

  it('Should fire PrimaryHeader navigation go back method', async () => {
    const {findByTestId} = render(<Header title="Testing" />);

    const primaryHeaderBackButton = await findByTestId(
      TEST_IDS.PRIMARY_HEADER_BACK_BUTTON,
    );

    fireEvent.press(primaryHeaderBackButton);

    expect(mockedGoBack).toHaveBeenCalledTimes(1);
  });

  it('Should fire SecondaryHeader navigation go back method', async () => {
    const {findByTestId} = render(<Header title="Testing" type="secondary" />);

    const secondaryHeaderBackButton = await findByTestId(
      TEST_IDS.SECONDARY_HEADER_BACK_BUTTON,
    );

    fireEvent.press(secondaryHeaderBackButton);

    expect(mockedGoBack).toHaveBeenCalledTimes(2);
  });

  it('Should show text "Testing" on Primary Header', async () => {
    const text = 'Testing';

    const {findByTestId} = render(<Header title={text} />);

    const element = await findByTestId(TEST_IDS.TEXT_BASE);

    expect(element).toHaveTextContent(text);
  });

  it('Should show text "Testing" on Secondary Header', async () => {
    const text = 'Testing';

    const {findByTestId} = render(<Header title={text} type="secondary" />);

    const element = await findByTestId(TEST_IDS.TEXT_BASE);

    expect(element).toHaveTextContent(text);
  });
});
