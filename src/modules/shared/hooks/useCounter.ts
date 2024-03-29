import {useEffect, useState} from 'react';

interface UseCounterParams {
  onLimitReached?: () => void;
  isCountdown?: boolean;
  initialValue?: number;
  maxValue?: number;
  minValue?: number;
}

export function useCounter({
  onLimitReached,
  isCountdown,
  initialValue = 0,
  maxValue,
  minValue,
}: UseCounterParams = {}): [number, (numToAdd: number) => void] {
  const [counter, setCounter] = useState(initialValue);

  useEffect(() => {
    setCounter(initialValue);
  }, [initialValue]);

  const addToCounter = (numToAdd: number) => {
    setCounter(oldState => {
      const newValue = oldState + numToAdd;

      const isCountdownMinReached =
        isCountdown && typeof minValue === 'number' && newValue < minValue;

      const isMaxReached =
        !isCountdown && typeof maxValue === 'number' && newValue > maxValue;

      if (isMaxReached || isCountdownMinReached) {
        onLimitReached?.();

        if (isCountdown) {
          if (typeof maxValue === 'number') {
            return maxValue;
          }
        } else if (typeof minValue === 'number') {
          return minValue;
        }

        return 0;
      }

      return newValue;
    });
  };

  return [counter, addToCounter];
}
