import {Center} from '@/shared/components';
import {render} from '@testing-library/react-native';

jest.mock('@/shared/hooks/data/useAppTheme');

describe('Center Component', () => {
  it('Should render a Center', () => {
    render(<Center />);
  });
});
