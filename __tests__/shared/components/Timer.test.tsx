import {render} from '@testing-library/react-native';

import {TEST_IDS} from '@/shared/constants/testIds';
import {Timer} from '@/shared/components';

const minutes = 12;
const seconds = 15;

jest.mock('@/shared/hooks/useTimer', () => {
  return {
    useTimer: () => ({
      seconds,
      minutes,
      startTimer: () => {},
      stopTimer: () => {},
    }),
  };
});

jest.mock('@/shared/hooks/data/useAppTheme');

describe('Timer Component', () => {
  it('Should render a Timer', () => {
    render(<Timer />);
  });

  it('Should show minutes and seconds', async () => {
    const {findByTestId} = render(<Timer />);

    const element = await findByTestId(TEST_IDS.TEXT_BASE);

    expect(element).toHaveTextContent(seconds.toString());

    expect(element).toHaveTextContent(minutes.toString());
  });
});
