import {
  FlatListWithFetchIndicator,
  FlatListWithFetchIndicatorProps,
} from '@/modules/shared/components';
import {act, render} from '@testing-library/react-native';
import {TEST_IDS} from '@/modules/shared/constants/testIds';
import {View} from 'react-native';

jest.mock('@/shared/hooks/data/useAppTheme');

describe('FlatListWithFetchIndicator Component', () => {
  it('Should render an FlatListWithFetchIndicator', () => {
    render(
      <FlatListWithFetchIndicator
        data={[]}
        emptyListText="No item found"
        hasError={false}
        isLoading={false}
        keyExtractor={item => item}
        renderItem={() => <View />}
      />,
    );
  });

  it('Should show Activity Indicator', async () => {
    const {findByTestId} = render(
      <FlatListWithFetchIndicator
        data={[]}
        emptyListText="No item found"
        hasError={true}
        isLoading={true}
        keyExtractor={item => item}
        renderItem={() => <View />}
      />,
    );

    const element = await findByTestId(TEST_IDS.ACTIVITY_INDICATOR_BASE);

    expect(element).toBeVisible();
  });

  it('Should show Error Message', async () => {
    const {findByTestId} = render(
      <FlatListWithFetchIndicator
        data={[]}
        emptyListText="No item found"
        hasError={true}
        isLoading={false}
        keyExtractor={item => item}
        renderItem={() => <View />}
      />,
    );

    const element = await findByTestId(TEST_IDS.ERROR_MESSAGE);

    expect(element).toBeVisible();
  });

  it('Should show RefreshControl', async () => {
    const onRefreshSpy = jest.fn();

    const props: FlatListWithFetchIndicatorProps<string> = {
      data: [],
      emptyListText: 'No item found',
      hasError: false,
      isLoading: false,
      keyExtractor: item => item,
      renderItem: () => <View />,
      onRefresh: onRefreshSpy,
    };

    const {findByTestId, rerender} = render(
      <FlatListWithFetchIndicator {...props} isLoading={true} />,
    );

    rerender(<FlatListWithFetchIndicator {...props} isLoading={false} />);

    const flatList = await findByTestId(
      TEST_IDS.FLAT_LIST_WITH_FETCH_INDICATOR_FLAT_LIST,
    );

    act(() => {
      flatList.props.refreshControl.props.onRefresh();
    });

    expect(onRefreshSpy).toHaveBeenCalledTimes(1);

    rerender(<FlatListWithFetchIndicator {...props} isLoading={true} />);

    expect(flatList.props.refreshControl.props.refreshing).toBe(true);
  });

  it('Should not show RefreshControl', async () => {
    const onRefreshSpy = jest.fn();

    const props: FlatListWithFetchIndicatorProps<string> = {
      data: [],
      emptyListText: 'No item found',
      hasError: false,
      isLoading: false,
      showActivityIndicator: false,
      keyExtractor: item => item,
      renderItem: () => <View />,
      onRefresh: onRefreshSpy,
    };

    const {findByTestId, rerender} = render(
      <FlatListWithFetchIndicator {...props} isLoading={true} />,
    );

    rerender(<FlatListWithFetchIndicator {...props} isLoading={false} />);

    const flatList = await findByTestId(
      TEST_IDS.FLAT_LIST_WITH_FETCH_INDICATOR_FLAT_LIST,
    );

    act(() => {
      flatList.props.refreshControl.props.onRefresh();
    });

    expect(onRefreshSpy).toHaveBeenCalledTimes(1);

    rerender(<FlatListWithFetchIndicator {...props} isLoading={true} />);

    expect(flatList.props.refreshControl.props.refreshing).toBe(false);
  });

  it('Should show Empty List Text', async () => {
    const emptyListText = 'No item found';

    const {findByTestId} = render(
      <FlatListWithFetchIndicator
        data={[]}
        emptyListText={emptyListText}
        hasError={false}
        isLoading={false}
        keyExtractor={item => item}
        renderItem={() => <View />}
      />,
    );

    const element = await findByTestId(TEST_IDS.TEXT_BASE);

    expect(element.props.children).toBe(emptyListText);
  });
});
