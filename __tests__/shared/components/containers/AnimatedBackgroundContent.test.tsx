import {TextStyle} from 'react-native';
import {render} from '@testing-library/react-native';
import {TEST_IDS} from '@/modules/shared/constants/testIds';
import {AnimatedBackgroundContent} from '@/modules/shared/components';

jest.mock('@/shared/hooks/data/useAppTheme');

describe('AnimatedBackgroundContent Component', () => {
  it('Should render an AnimatedBackgroundContent', () => {
    render(<AnimatedBackgroundContent />);
  });

  it('Container should have custom style', async () => {
    const style: TextStyle = {
      backgroundColor: 'red',
    };

    const {findByTestId} = render(<AnimatedBackgroundContent style={style} />);

    const element = await findByTestId(TEST_IDS.ANIMATED_BACKGROUND_CONTENT);

    expect(element).toHaveStyle(style);
  });
});
