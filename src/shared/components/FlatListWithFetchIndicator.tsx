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
import ErrorMessage from './fallbacks/ErrorMessage';
import ActivityIndicator from './ActivityIndicator';

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
  isLoading = false,
  data = [],
  hasError = false,
  emptyListText = '',
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

  return (
    <ShowFallbackComponent
      fallback={
        <ScrollView contentContainerStyle={styles.scrollView}>
          {showListHeaderWhenListIsNotShown && ListHeaderComponent}
          <ErrorMessage onTryAgainPress={onRefresh} />
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
              onRefresh={() => {
                if (firstLoading && showActivityIndicator) {
                  setFirstLoading(false);
                }

                if (onRefresh) {
                  onRefresh();
                }
              }}
              refreshing={isLoading && !firstLoading}
            />
          ) : undefined
        }
        style={[styles.list, style]}
        contentContainerStyle={[
          contentContainerStyle,
          data && data.length === 0 && styles.contentContainerStyle,
        ]}
        data={data}
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
