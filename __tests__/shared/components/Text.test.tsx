import React from 'react';
import {Text} from '@/shared/components';
import {render} from '@testing-library/react-native';

jest.mock('@/shared/hooks/useAppTheme');

describe('Text Component', () => {
  it('Should render a Text', () => {
    render(<Text />);
  });
});
