import {ForwardedRef, forwardRef, useImperativeHandle} from 'react';
import {useTimer} from '../hooks';
import Text from './Text';

export interface TimerHandles {
  startTimer: () => void;
  stopTimer: () => void;
}

function Timer({}, ref: ForwardedRef<TimerHandles>) {
  const {seconds, minutes, startTimer, stopTimer} = useTimer();

  useImperativeHandle(ref, () => ({
    startTimer,
    stopTimer,
  }));

  return (
    <Text type="title-big">
      {minutes} : {seconds}
    </Text>
  );
}

export default forwardRef(Timer);
