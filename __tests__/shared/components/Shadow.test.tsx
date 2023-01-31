import {Shadow} from '@/shared/components';
import {render} from '@testing-library/react-native';
import {TEST_IDS} from '@/shared/constants/testIds';
import {TextStyle} from 'react-native';

describe('Shadow Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render a Shadow', () => {
    render(<Shadow />);
  });

  it('Container should have custom style', async () => {
    const style: TextStyle = {
      backgroundColor: 'red',
    };

    const {findByTestId} = render(<Shadow style={style} />);

    const element = await findByTestId(TEST_IDS.SHADOW);

    expect(element).toHaveStyle(style);
  });
});
