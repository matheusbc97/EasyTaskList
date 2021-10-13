import {useState, useCallback} from 'react';

const useSwitchState: () => [boolean, () => void] = () => {
  const [isOn, setIsOn] = useState(false);

  const onToggleSwitch = useCallback(() => setIsOn(oldState => !oldState), []);

  return [isOn, onToggleSwitch];
};

export default useSwitchState;
