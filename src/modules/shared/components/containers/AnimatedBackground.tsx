import React, {PropsWithChildren, useEffect, useMemo} from 'react';
import {View, Animated, Image, StyleSheet} from 'react-native';
import {useDimensions} from '@react-native-community/hooks';

import {
  MARKED_LIST,
  CALENDAR,
  ROCKET,
  LEFT_STRIPES,
  GRAPH_2,
  BOTTOM_RIGHT_DOT,
} from '@/assets/images';
import {AppTheme} from '@/modules/shared/models';
import {useAppTheme} from '@/modules/shared/hooks';

interface Props {
  theme?: AppTheme;
}

function AnimatedBackground({children, theme}: PropsWithChildren<Props>) {
  const firstAnimationValue = useMemo(() => new Animated.Value(0), []);

  const screenHeight = useDimensions().window.height;
  const screenHeightDividedBy2 = useMemo(
    () => screenHeight / 2,
    [screenHeight],
  );

  const animatedBackgroundOffset = firstAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-screenHeightDividedBy2, 0],
  });

  const appThemeFromMemory = useAppTheme();
  const appTheme = theme ?? appThemeFromMemory;

  useEffect(() => {
    Animated.timing(firstAnimationValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [firstAnimationValue]);

  return (
    <View>
      <Animated.View
        style={[
          {
            height: screenHeightDividedBy2,
            top: animatedBackgroundOffset,
            backgroundColor: appTheme.secondaryColor,
          },
        ]}>
        <Image source={MARKED_LIST} style={styles.imageMarkedList} />
        <Image source={CALENDAR} style={styles.imageCalendar} />
      </Animated.View>
      <Animated.View
        style={{
          height: screenHeightDividedBy2,
          bottom: animatedBackgroundOffset,
          backgroundColor: appTheme.primaryColor,
        }}>
        <View style={styles.footerImagesContainer}>
          <Image source={LEFT_STRIPES} style={styles.imageLeftStripes} />
          <Image source={GRAPH_2} style={styles.imageGraph2} />
          <Image source={ROCKET} style={styles.imageRocket} />
          <Image
            source={BOTTOM_RIGHT_DOT}
            style={styles.imageBottomRightDots}
          />
        </View>
      </Animated.View>
      <Animated.View style={[styles.container, {opacity: firstAnimationValue}]}>
        {children}
      </Animated.View>
    </View>
  );
}

export default AnimatedBackground;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageMarkedList: {
    position: 'absolute',
    top: 35,
    left: 20,
    width: 125,
    height: 110,
  },
  imageCalendar: {
    position: 'absolute',
    top: -10,
    right: -12,
    width: 90,
    height: 110,
  },
  footerImagesContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  imageLeftStripes: {
    width: 15,
    height: 136,
    marginHorizontal: 5,
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  imageGraph2: {
    width: 100,
    height: 80,
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  imageRocket: {
    width: 90,
    height: 110,
    marginBottom: 45,
  },
  imageBottomRightDots: {
    width: 40,
    height: 40,
    alignSelf: 'flex-end',
    margin: 10,
  },
});
