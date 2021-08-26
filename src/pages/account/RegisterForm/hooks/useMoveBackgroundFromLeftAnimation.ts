import {useDimensions} from '@react-native-community/hooks';
import {useMemo, useEffect} from 'react';
import {Animated} from 'react-native';

const useMoveBackgroundFromLeftAnimation = () => {
  const width = useDimensions().window.width;
  const backgroundMarginRight = useMemo(() => new Animated.Value(width + 80), [
    width,
  ]);

  useEffect(() => {
    Animated.timing(backgroundMarginRight, {
      toValue: 0,
      useNativeDriver: false,
      duration: 350,
      delay: 350,
    }).start();
  }, [backgroundMarginRight]);

  return {backgroundMarginRight};
};

export default useMoveBackgroundFromLeftAnimation;
