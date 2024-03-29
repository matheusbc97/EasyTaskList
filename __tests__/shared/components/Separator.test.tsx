import {Separator} from '@/modules/shared/components';
import {render} from '@testing-library/react-native';
import {TEST_IDS} from '@/modules/shared/constants/testIds';
import {TextStyle} from 'react-native';

describe('Separator Component', () => {
  it('Should render a Separator', () => {
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
