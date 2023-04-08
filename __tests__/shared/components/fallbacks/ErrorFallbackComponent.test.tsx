import React from 'react';
import {ErrorFallback} from '@/modules/shared/components';
import {render} from '@testing-library/react-native';
import {Text} from 'react-native';
import {TEST_IDS} from '@/modules/shared/constants/testIds';

describe('ErrorFallbackComponent Component', () => {
  it('Should render a ErrorFallbackComponent', () => {
    render(<ErrorFallback hasError={false} />);
  });

  it('Should render the error fallback component as children', async () => {
    const {findByTestId} = render(<ErrorFallback hasError />);

    const textElement = await findByTestId(TEST_IDS.ERROR_MESSAGE);

    expect(textElement).toBeVisible();
  });

  it('Should render the children component as children', async () => {
    const {findByTestId} = render(
      <ErrorFallback hasError={false}>
        <Text testID="text-rn">Teste</Text>
      </ErrorFallback>,
    );

    const textElement = await findByTestId('text-rn');

    expect(textElement).toBeVisible();
  });
});
