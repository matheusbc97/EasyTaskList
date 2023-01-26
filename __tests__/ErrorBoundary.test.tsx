import 'react-native';
import React from 'react';
import {render} from '@testing-library/react-native';

import ErrorBoundary from '@/ErrorBoundary';
import {TEST_IDS} from '@/shared/constants/testIds';
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

  it('Should render errorPage', async () => {
    const TroubleMaker = () => {
      throw new Error('Error');
    };

    const {findByTestId} = render(
      <ErrorBoundary>
        <TroubleMaker />
      </ErrorBoundary>,
    );

    const element = await findByTestId(TEST_IDS.ERROR_PAGE_CONTAINER);
    expect(element).toBeVisible();
  });
});
