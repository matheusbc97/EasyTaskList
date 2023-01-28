import {Separator} from '@/shared/components';
import {render} from '@testing-library/react-native';
import {TEST_IDS} from '@/shared/constants/testIds';
import {TextStyle} from 'react-native';

describe('Separator Component', () => {
  it('Should render an Separator', () => {
    render(<Separator />);
  });

  it('Container should have custom style', async () => {
    const style: TextStyle = {
      backgroundColor: 'red',
    };

    const {findByTestId} = render(<Separator style={style} />);

    const element = await findByTestId(TEST_IDS.SEPARATOR);

    expect(element).toHaveStyle(style);
  });
});
