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
  isCountdown, // if you are decrementing you have to set isCountdown to true
  initialValue = 0,
  maxValue,
  minValue,
}: UseCounterParams = {}): [number, (numToAdd: number) => void] {
  const [counter, setCounter] = useState(initialValue);

  useEffect(() => {
    //setCounter(initialValue);
  }, [initialValue]);

  const addToCounter = (numToAdd: number) => {
    setCounter(oldState => {
      const isCountdownMinReached =
        isCountdown &&
        typeof minValue === 'number' &&
        oldState + numToAdd < minValue;

      const isMaxReached =
        !isCountdown &&
        typeof maxValue === 'number' &&
        oldState + numToAdd > maxValue;

      if (isMaxReached || isCountdownMinReached) {
        onLimitReached?.();

        if (isCountdown) {
          if (typeof maxValue === 'number') {
            return maxValue;
          }
        } else {
          if (typeof minValue === 'number') {
            return minValue;
          }
        }

        return 0;
      }

      return oldState + numToAdd;
    });
  };

  return [counter, addToCounter];
}
