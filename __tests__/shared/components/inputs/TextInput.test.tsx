import {TextInput} from '@/modules/shared/components';
import {fireEvent, render} from '@testing-library/react-native';
import {TEST_IDS} from '@/modules/shared/constants/testIds';
import {ViewStyle} from 'react-native';

jest.mock('@/shared/hooks/data/useAppTheme');

describe('TextInput Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render an TextInput', () => {
    render(<TextInput label="Testing" />);
  });

  it('Should fire blur event', async () => {
    const onBlur = jest.fn();
    const {findByTestId} = render(
      <TextInput label="Testing" onBlur={onBlur} />,
    );

    const element = await findByTestId(TEST_IDS.TEXT_INPUT_BASE);

    fireEvent(element, 'blur');
    expect(onBlur).toBeCalledTimes(1);
  });

  it('Should fire focus event', async () => {
    const onFocus = jest.fn();
    const {findByTestId} = render(
      <TextInput label="Testing" onFocus={onFocus} />,
    );

    const element = await findByTestId(TEST_IDS.TEXT_INPUT_BASE);

    fireEvent(element, 'focus');
    expect(onFocus).toBeCalledTimes(1);
  });

  it('Should have label "Testing"', async () => {
    const label = 'Testing';

    const {findByTestId} = render(<TextInput label={label} />);

    const element = await findByTestId(TEST_IDS.TEXT_INPUT_LABEL);

    expect(element.props.children).toBe(label);
  });

  it('Input should have custom style', async () => {
    const style: ViewStyle = {
      backgroundColor: 'red',
    };

    const {findByTestId} = render(<TextInput label="Testing" style={style} />);

    const element = await findByTestId(TEST_IDS.TEXT_INPUT_BASE);

    expect(element).toHaveStyle(style);
  });

  it('Should show icon', async () => {
    const {findByTestId} = render(<TextInput button label="Testing" />);

    const element = await findByTestId(TEST_IDS.TEXT_INPUT_ICON);

    expect(element).toBeVisible();
  });

  it('Should fire change event', async () => {
    const onChangeText = jest.fn();
    const {findByTestId} = render(
      <TextInput label="Testing" onChangeText={onChangeText} />,
    );

    const element = await findByTestId(TEST_IDS.TEXT_INPUT_BASE);

    fireEvent.changeText(element, 'Testing');
    expect(onChangeText).toBeCalledTimes(1);
  });
});
