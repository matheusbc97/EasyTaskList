import {TextStyle} from 'react-native';

import {render} from '@testing-library/react-native';
import {VerticalSeparator} from '@/modules/shared/components';
import {TEST_IDS} from '@/modules/shared/constants/testIds';

describe('VerticalSeparator Component', () => {
  it('Should render a VerticalSeparator', () => {
    render(<VerticalSeparator />);
  });

  it('VerticalSeparator container should have custom style', async () => {
    const style: TextStyle = {
      backgroundColor: 'red',
    };

    const {findByTestId} = render(<VerticalSeparator style={style} />);

    const element = await findByTestId(TEST_IDS.VERTICAL_SEPARATOR);

    expect(element).toHaveStyle(style);
  });
});
