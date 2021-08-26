import {useMemo, useEffect} from 'react';
import {Animated} from 'react-native';

const useOnRegisterUserSuccessAnimation = (isConfirmed: boolean) => {
  const confirmButtonWidth = useMemo(() => new Animated.Value(200), []);
  const advanceButtonRight = useMemo(() => new Animated.Value(-150), []);

  useEffect(() => {
    if (isConfirmed) {
      Animated.timing(confirmButtonWidth, {
        toValue: 33,
        useNativeDriver: false,
        duration: 350,
      }).start(() =>
        Animated.spring(advanceButtonRight, {
          toValue: -35,
          useNativeDriver: false,
          bounciness: 14,
        }).start(),
      );
    }
  }, [isConfirmed, confirmButtonWidth, advanceButtonRight]);

  return {confirmButtonWidth, advanceButtonRight};
};

export default useOnRegisterUserSuccessAnimation;
