import React from 'react';
import {ShowFallbackComponent} from '@/modules/shared/components';
import {render} from '@testing-library/react-native';
import {Text} from 'react-native';

describe('ShowFallbackComponent Component', () => {
  it('Should render a ShowFallbackComponent', () => {
    render(
      <ShowFallbackComponent
        fallback={<Text>Teste</Text>}
        showFallback={false}
      />,
    );
  });

  it('Should render the fallback component as children', async () => {
    const {findByTestId} = render(
      <ShowFallbackComponent
        fallback={<Text testID="text-rn">Teste</Text>}
        showFallback
      />,
    );

    const textElement = await findByTestId('text-rn');

    expect(textElement).toBeVisible();
  });

  it('Should render the children component as children', async () => {
    const {findByTestId} = render(
      <ShowFallbackComponent fallback={<Text />} showFallback={false}>
        <Text testID="text-rn">Teste</Text>
      </ShowFallbackComponent>,
    );

    const textElement = await findByTestId('text-rn');

    expect(textElement).toBeVisible();
  });
});
