import useTimedFunction from './useTimedFunction';
import useTimeCounter from './useTimeCounter';

export default function useTimer() {
  const {minutes, seconds, changeTimeCounter} = useTimeCounter(true);

  const {isTimerRunning, startTimer, stopTimer} = useTimedFunction(
    changeTimeCounter,
    1000,
  );

  return {
    startTimer,
    stopTimer,
    minutes,
    seconds,
    isTimerRunning,
  };
}
