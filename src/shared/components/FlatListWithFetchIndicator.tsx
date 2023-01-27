import React, {useState} from 'react';
import {
  FlatList,
  RefreshControl,
  FlatListProps,
  StyleSheet,
  ScrollView,
} from 'react-native';
import ShowFallbackComponent from './fallbacks/ShowFallbackComponent';
import EmptyListText from './EmptyListText';
import ErrorMessage from './ErrorMessage';
import ActivityIndicator from './loadings/ActivityIndicator';
import {TEST_IDS} from '../constants/testIds';

export interface FlatListWithFetchIndicatorProps<T> extends FlatListProps<T> {
  isLoading: boolean;
  hasError: boolean;
  emptyListText: string;
  refreshControlEnabled?: boolean;
  showActivityIndicator?: boolean;
  onRefresh?: (() => void) | null;
  showListHeaderWhenListIsNotShown?: boolean;
  keyExtractor(item: T, index: number): string;
}

function FlatListWithFetchIndicator<T>({
  isLoading,
  data,
  hasError,
  emptyListText,
  style,
  ListHeaderComponent,
  refreshControlEnabled = true,
  showActivityIndicator = true,
  showListHeaderWhenListIsNotShown = true,
  contentContainerStyle,
  onRefresh,
  ...rest
}: FlatListWithFetchIndicatorProps<T>) {
  const [firstLoading, setFirstLoading] = useState(true);

  const handleRefresh = () => {
    if (showActivityIndicator) {
      setFirstLoading(false);
    }

    onRefresh?.();
  };

  return (
    <ShowFallbackComponent
      fallback={
        <ScrollView contentContainerStyle={styles.scrollView}>
          <>
            {showListHeaderWhenListIsNotShown && ListHeaderComponent}
            <ErrorMessage onTryAgainPress={onRefresh} />
          </>
        </ScrollView>
      }
      showFallback={hasError && !isLoading}>
      <FlatList<T>
        ListEmptyComponent={
          isLoading && firstLoading ? (
            <ActivityIndicator />
          ) : (
            <EmptyListText text={emptyListText} />
          )
        }
        ListHeaderComponent={ListHeaderComponent}
        refreshControl={
          refreshControlEnabled && onRefresh ? (
            <RefreshControl
              colors={['#d50006', '#ab2b3f', '#a1001a']}
              onRefresh={handleRefresh}
              refreshing={isLoading && !firstLoading}
              testID={TEST_IDS.FLAT_LIST_WITH_FETCH_INDICATOR_REFRESH_CONTROL}
            />
          ) : undefined
        }
        style={[styles.list, style]}
        contentContainerStyle={[
          contentContainerStyle,
          data && data.length === 0 && styles.contentContainerStyle,
        ]}
        data={data}
        testID={TEST_IDS.FLAT_LIST_WITH_FETCH_INDICATOR_FLAT_LIST}
        {...rest}
      />
    </ShowFallbackComponent>
  );
}

export default FlatListWithFetchIndicator;

const styles = StyleSheet.create({
  list: {flex: 1},
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
});
