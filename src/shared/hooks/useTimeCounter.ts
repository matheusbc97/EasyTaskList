import {useCounter} from './useCounter';

export function useTimeCounter(isCountdown: boolean = false) {
  const [minutes, addMinutes] = useCounter({
    isCountdown,
    initialValue: 59,
  });

  const [seconds, addSeconds] = useCounter({
    minValue: 0,
    maxValue: 59,
    onLimitReached: () => addMinutes(isCountdown ? -1 : 1),
    isCountdown,
    initialValue: 5,
  });

  return {
    minutes,
    seconds,
    changeTimeCounter: () => addSeconds(isCountdown ? -1 : 1),
  };
}
