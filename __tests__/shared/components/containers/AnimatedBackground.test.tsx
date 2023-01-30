import {AnimatedBackground} from '@/shared/components';
import {render} from '@testing-library/react-native';

jest.mock('@/shared/hooks/data/useAppTheme');

describe('AnimatedBackground Component', () => {
  it('Should render an AnimatedBackground', () => {
    render(<AnimatedBackground />);
  });
});
