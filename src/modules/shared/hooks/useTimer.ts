import {useTimedFunction} from './useTimedFunction';
import {useTimeCounter} from './useTimeCounter';

export function useTimer() {
  const {minutes, seconds, changeTimeCounter} = useTimeCounter();

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
