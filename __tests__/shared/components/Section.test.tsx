import {Section} from '@/modules/shared/components';
import {render} from '@testing-library/react-native';
import {TEST_IDS} from '@/modules/shared/constants/testIds';
import {TextStyle} from 'react-native';

jest.mock('@/shared/hooks/data/useAppTheme');

describe('Section Component', () => {
  it('Should render an Section', () => {
    render(<Section />);
  });

  it('Should have title "Testing"', async () => {
    const text = 'Testing';

    const {findByTestId} = render(<Section title={text} />);

    const element = await findByTestId(TEST_IDS.TEXT_BASE);

    expect(element.props.children).toBe(text);
  });

  it('Container should have custom style', async () => {
    const text = 'Testing';

    const style: TextStyle = {
      backgroundColor: 'red',
    };

    const {findByTestId} = render(<Section title={text} style={style} />);

    const element = await findByTestId(TEST_IDS.SECTION_CONTAINER);

    expect(element).toHaveStyle(style);
  });

  it('Content should have custom style', async () => {
    const text = 'Testing';

    const style: TextStyle = {
      backgroundColor: 'red',
    };

    const {findByTestId} = render(
      <Section title={text} contentStyle={style} />,
    );

    const element = await findByTestId(TEST_IDS.SECTION_CONTENT_CONTAINER);

    expect(element).toHaveStyle(style);
  });
});
