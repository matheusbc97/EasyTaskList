import {render} from '@testing-library/react-native';

import {TEST_IDS} from '@/modules/shared/constants/testIds';
import {Timer, TimerHandles} from '@/modules/shared/components';
import {createRef} from 'react';

const minutes = 12;
const seconds = 15;

const mockedStartTimer = jest.fn();
const mockedStopTimer = jest.fn();

jest.mock('@/shared/hooks/useTimer', () => {
  return {
    useTimer: () => ({
      seconds,
      minutes,
      startTimer: mockedStartTimer,
      stopTimer: mockedStopTimer,
    }),
  };
});

jest.mock('@/shared/hooks/data/useAppTheme');

describe('Timer Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Should render a Timer', () => {
    render(<Timer />);
  });

  it('Should show minutes and seconds', async () => {
    const {findByTestId} = render(<Timer />);

    const element = await findByTestId(TEST_IDS.TEXT_BASE);

    expect(element).toHaveTextContent(seconds.toString());

    expect(element).toHaveTextContent(minutes.toString());
  });

  it('Should fire startTimer', async () => {
    const timerRef = createRef<TimerHandles>();
    render(<Timer ref={timerRef} />);

    timerRef.current?.startTimer();

    expect(mockedStartTimer).toHaveBeenCalledTimes(1);
  });

  it('Should fire stopTimer', async () => {
    const timerRef = createRef<TimerHandles>();
    render(<Timer ref={timerRef} />);

    timerRef.current?.stopTimer();

    expect(mockedStopTimer).toHaveBeenCalledTimes(1);
  });
});
