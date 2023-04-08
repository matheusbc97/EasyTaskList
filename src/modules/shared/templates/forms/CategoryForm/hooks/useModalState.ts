import {useState} from 'react';

function useModalState<T>(defaultValue: T) {
  const [value, setValue] = useState(defaultValue);

  const [isVisible, setIsVisible] = useState(false);

  const _setValue = (_value: T) => {
    setValue(_value);
    setIsVisible(false);
  };

  const open = () => {
    setIsVisible(true);
  };

  const close = () => {
    setIsVisible(false);
  };

  return {
    isVisible,
    value,
    setValue: _setValue,
    open,
    close,
  };
}

export default useModalState;
