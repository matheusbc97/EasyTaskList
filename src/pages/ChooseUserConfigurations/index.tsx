import React, {useEffect, useMemo, useState} from 'react';
import {View, Animated, Image} from 'react-native';
import {useDimensions} from '@react-native-community/hooks';
import {useSelector} from 'react-redux';

import {ScreenWrapper} from '../../library/components';
import {selectAppTheme} from '../../store/configs';
import {
  MARKED_LIST,
  CALENDAR,
  ROCKET,
  LEFT_STRIPES,
  GRAPH_2,
  BOTTOM_RIGHT_DOT,
} from '../../assets/images';

import ChooseTheme from './ChooseTheme';
import ChoosePhotoOrAvatar from './ChoosePhotoOrAvatar';

import styles from './styles';

const ChooseUserConfigurations: React.FC = () => {
  const animatedValue = useMemo(() => new Animated.Value(0), []);
  const rotationYValue = useMemo(() => new Animated.Value(0), []);
  const finalRotationYValue = useMemo(() => new Animated.Value(0), []);

  const [advanceButtonPressed, setAdvanceButtonPressed] = useState(false);
  const [showSecondScreeen, setShowSecondScreeen] = useState(false);

  useEffect(() => {
    if (advanceButtonPressed) {
      Animated.timing(rotationYValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setShowSecondScreeen(true));
    }
  }, [advanceButtonPressed, rotationYValue]);

  useEffect(() => {
    if (showSecondScreeen) {
      Animated.timing(finalRotationYValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [showSecondScreeen, finalRotationYValue]);

  const screenHeight = useDimensions().window.height;
  const screenHeightDividedBy2 = useMemo(() => screenHeight / 2, [
    screenHeight,
  ]);

  const animatedBackgroundOffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-screenHeightDividedBy2, 0],
  });

  const animatedYRotation = rotationYValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '90deg'],
  });

  const animatedFinalYRotation = finalRotationYValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['270deg', '360deg'],
  });

  const appTheme = useSelector(selectAppTheme);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [animatedValue]);

  return (
    <ScreenWrapper>
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
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.content,
            {
              opacity: animatedValue,
              backgroundColor: appTheme.aboveBackground,
              transform: [
                {
                  rotateY: showSecondScreeen
                    ? animatedFinalYRotation
                    : animatedYRotation,
                },
              ],
            },
          ]}>
          {showSecondScreeen ? (
            <ChoosePhotoOrAvatar />
          ) : (
            <ChooseTheme onAdvancePress={() => setAdvanceButtonPressed(true)} />
          )}
        </Animated.View>
      </View>
    </ScreenWrapper>
  );
};

export default ChooseUserConfigurations;
