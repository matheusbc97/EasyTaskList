import {useCounter} from './useCounter';

interface UseTimeCounterProps {
  isCountdown?: boolean;
  initialMinutes?: number;
  initialSeconds?: number;
}

export function useTimeCounter({
  isCountdown = false,
  initialMinutes = 0,
  initialSeconds = 0,
}: UseTimeCounterProps = {}) {
  const [minutes, addMinutes] = useCounter({
    isCountdown,
    initialValue: initialMinutes,
  });

  const [seconds, addSeconds] = useCounter({
    minValue: 0,
    maxValue: 59,
    onLimitReached: () => addMinutes(isCountdown ? -1 : 1),
    isCountdown,
    initialValue: initialSeconds,
  });

  return {
    minutes,
    seconds,
    changeTimeCounter: () => addSeconds(isCountdown ? -1 : 1),
  };
}
