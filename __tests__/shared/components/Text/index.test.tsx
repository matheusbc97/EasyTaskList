import React from 'react';
import {Text} from '@/shared/components';
import {render} from '@testing-library/react-native';
import {useAppThemeReturnMock} from '@/shared/hooks/data/__mocks__/useAppTheme';
import {getTextStyle} from '@/shared/components/Text/utils/getTextStyle';
import {TEXT_TYPES} from '@/shared/components/Text/constants/textTypes';

jest.mock('@/shared/hooks/data/useAppTheme');

describe('Text Component', () => {
  it('Should render a Text', () => {
    render(<Text />);
  });

  it('Should contain a text', async () => {
    const text = 'testing';

    const {findByTestId} = render(<Text>{text}</Text>);

    const element = await findByTestId('text-base');

    expect(element).toHaveTextContent(text);
  });

  it('Should have the right style', async () => {
    const text = 'testing';

    const promises = TEXT_TYPES.map(async type => {
      const {findByTestId} = render(<Text type={type}>{text}</Text>);

      const styles = getTextStyle({
        centerText: false,
        primaryColor: false,
        secondaryColor: false,
        theme: useAppThemeReturnMock,
        type,
      });

      const element = await findByTestId('text-base');

      expect(element).toHaveStyle(styles);
    });

    await Promise.all(promises);
  });
});
