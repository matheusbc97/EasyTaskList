import React, {useState} from 'react';
import {
  FlatList,
  RefreshControl,
  FlatListProps,
  StyleSheet,
  ScrollView,
} from 'react-native';
import EmptyListText from './EmptyListText';
import ErrorMessage from './ErrorMessage';
import ActivityIndicator from './ActivityIndicator';

interface Props<T> extends FlatListProps<T> {
  isLoading: boolean;
  hasError: boolean;
  emptyListText: string;
  refreshControlEnabled?: boolean;
  showActivityIndicator?: boolean;
  onRefresh?: (() => void) | null;
  showListHeaderWhenListIsNotShown?: boolean;
  keyExtractor(item: T, index: number): string;
}

function FlatListWithFetchControl<T>({
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
}: Props<T>) {
  const [firstLoading, setFirstLoading] = useState(true);

  if (hasError || (showActivityIndicator && isLoading && firstLoading)) {
    return (
      <ScrollView contentContainerStyle={styles.scrollView}>
        {showListHeaderWhenListIsNotShown && ListHeaderComponent}
        {hasError ? (
          <ErrorMessage onTryAgainPress={onRefresh} />
        ) : (
          <ActivityIndicator />
        )}
      </ScrollView>
    );
  }

  return (
    <FlatList<T>
      ListEmptyComponent={<EmptyListText text={emptyListText} />}
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
            refreshing={isLoading}
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
  );
}

export default FlatListWithFetchControl;

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
