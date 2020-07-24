import {useCallback} from 'react';

const useMaskedOnChangeText = (
  mask: (...arg0: any) => string,
  inputRef: any,
  onChangeText: any,
) => {
  const maskeOnChangeText = useCallback(
    (text) => {
      const _text = mask(text, inputRef.current?.value);
      inputRef.current?.setNativeProps({text: _text});
      onChangeText(_text);
    },
    [inputRef, onChangeText, mask],
  );

  return maskeOnChangeText;
};

export default useMaskedOnChangeText;
