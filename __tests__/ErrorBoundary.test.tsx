import 'react-native';
import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';

import ErrorBoundary from '@/ErrorBoundary';
import {TEST_IDS} from '@/modules/shared/constants/testIds';
import {View} from 'react-native';

describe('ErrorBoundary', () => {
  it('Should render component', () => {
    render(<ErrorBoundary />);
  });

  it('Should render children', async () => {
    const fakeViewTestId = 'fake-view-test-id';

    const {findByTestId} = render(
      <ErrorBoundary>
        <View testID={fakeViewTestId} />
      </ErrorBoundary>,
    );

    const element = await findByTestId(fakeViewTestId);
    expect(element).toBeVisible();
  });

  it('Should render ErrorPage and Reload App', async () => {
    const TroubleMaker = () => {
      throw new Error('Error');
    };

    const fakeViewTestId = 'fake-view-test-id';

    const {findByTestId, rerender} = render(
      <ErrorBoundary>
        <View testID={fakeViewTestId}>
          <TroubleMaker />
        </View>
      </ErrorBoundary>,
    );

    const errorPageContainer = await findByTestId(
      TEST_IDS.ERROR_PAGE_CONTAINER,
    );
    expect(errorPageContainer).toBeVisible();

    const reloadAppButton = await findByTestId(TEST_IDS.RELOAD_APP_BUTTON);

    rerender(
      <ErrorBoundary>
        <View testID={fakeViewTestId} />
      </ErrorBoundary>,
    );

    fireEvent(reloadAppButton, 'press');

    const fakeViewElement = await findByTestId(fakeViewTestId);

    expect(fakeViewElement).toBeVisible();
  });
});
