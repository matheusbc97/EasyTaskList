import {
  act,
  fireEvent,
  render,
  renderHook,
} from '@testing-library/react-native';
import {TEST_IDS} from '@/shared/constants/testIds';
import {ViewStyle} from 'react-native';
import EnhancedInput from '@/shared/components/inputs/EnhancedInput';
import {useForm} from 'react-hook-form';

jest.mock('@/shared/hooks/data/useAppTheme');

describe('EnhancedInput Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render an EnhancedInput', () => {
    const defaultValues = {
      test: 'test',
    };

    const {result} = renderHook(() =>
      useForm({
        defaultValues,
      }),
    );

    render(
      <EnhancedInput
        name="teste"
        control={result.current.control}
        label="Testing"
      />,
    );
  });

  it('Should render an EnhancedInput with a mask', async () => {
    const textDefaultValue = 'test';

    const defaultValues = {
      test: textDefaultValue,
    };

    const {result} = renderHook(() =>
      useForm({
        defaultValues,
      }),
    );

    const fakeMask = (value: string) => `${value}-masked`;

    const {findByTestId} = render(
      <EnhancedInput
        name="test"
        control={result.current.control}
        label="Testing"
        mask={fakeMask}
      />,
    );

    const element = await findByTestId(TEST_IDS.TEXT_INPUT_BASE);

    const newText = 'test2';

    act(() => {
      fireEvent.changeText(element, newText);
    });

    expect(element.props.value).toBe(fakeMask(newText));
  });

  it('Value should be default value', async () => {
    const formKey = 'test';

    const defaultValues = {
      [formKey]: 'testing',
    };

    const {result} = renderHook(() =>
      useForm({
        defaultValues,
      }),
    );

    const {findByTestId} = render(
      <EnhancedInput
        name="test"
        control={result.current.control}
        label="Testing"
      />,
    );

    const value = result.current.getValues(formKey);

    expect(value).toBe(defaultValues.test);

    const element = await findByTestId(TEST_IDS.TEXT_INPUT_BASE);

    expect(element.props.value).toBe(defaultValues.test);
  });

  it('Container should have custom style', async () => {
    const containerStyle: ViewStyle = {
      backgroundColor: 'red',
    };

    const {result} = renderHook(() => useForm());

    const {findByTestId} = render(
      <EnhancedInput
        name="test"
        control={result.current.control}
        containerStyle={containerStyle}
        label="Testing"
      />,
    );

    const element = await findByTestId(TEST_IDS.ENHANCED_INPUT_CONTAINER);

    expect(element).toHaveStyle(containerStyle);
  });

  it('Should show error', async () => {
    const formKey = 'test';

    const defaultValues = {
      [formKey]: '',
    };

    const {result} = renderHook(() =>
      useForm({
        defaultValues,
      }),
    );

    const {findByTestId} = render(
      <EnhancedInput
        name="test"
        control={result.current.control}
        label="Testing"
      />,
    );

    act(() => {
      result.current.setError(formKey, {
        type: 'required',
        message: 'This is required',
      });
    });

    const element = await findByTestId(TEST_IDS.ENHANCED_INPUT_ERROR);

    expect(element).toBeVisible();
  });
});
