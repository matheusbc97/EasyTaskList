import React from 'react';
import {Text} from 'react-native';
import {render} from '@testing-library/react-native';

import {LoadingFallback} from '@/shared/components';

describe('LoadingFallbackComponent Component', () => {
  it('Should render a LoadingFallbackComponent', () => {
    render(<LoadingFallback isLoading={false} />);
  });

  it('Should render the error fallback component as children', async () => {
    const {findByTestId} = render(<LoadingFallback isLoading />);

    const textElement = await findByTestId('loading-indicator-base');

    expect(textElement).toBeVisible();
  });

  it('Should render the children component as children', async () => {
    const {findByTestId} = render(
      <LoadingFallback isLoading={false}>
        <Text testID="text-rn">Teste</Text>
      </LoadingFallback>,
    );

    const textElement = await findByTestId('text-rn');

    expect(textElement).toBeVisible();
  });
});
