import {useEffect, useRef, useState} from 'react';

export default function useTimedFunction(
  functionParam: () => void,
  interval: number,
) {
  const timerRef = useRef<any | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const maintainTimer = () => {
    timerRef.current = setTimeout(() => {
      functionParam();

      maintainTimer();
    }, interval);
  };

  const startTimer = () => {
    setIsTimerRunning(true);
    maintainTimer();
  };

  const stopTimer = () => {
    setIsTimerRunning(false);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return {
    startTimer,
    stopTimer,
    isTimerRunning,
  };
}
