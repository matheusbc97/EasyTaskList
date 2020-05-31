import React, {useEffect, useMemo, useState} from 'react';
import {View, Animated, Image} from 'react-native';
import {useDimensions} from '@react-native-community/hooks';
import {useSelector, useDispatch} from 'react-redux';

import {ScreenWrapper} from '../../library/components';
import {selectAppTheme} from '../../store/configs';
import {setUserName, setUserAvatar} from '../../store/account/user';
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
import ChooseName from './ChooseName';
import SaveUserConfiguration from './SaveUserConfiguration';

import styles from './styles';

const subScreems = [
  'ChooseTheme',
  'ChooseName',
  'ChoosePhotoOrAvatar',
  'SaveUserConfiguration',
] as const;

const ChooseUserConfigurations: React.FC = () => {
  const firstAnimationValue = useMemo(() => new Animated.Value(0), []);
  const rotationAnimatedValue = useMemo(() => new Animated.Value(0), []);
  const animatedHeight = useMemo(() => new Animated.Value(350), []);

  const dispatch = useDispatch();

  const piDividedBy2 = useMemo(() => Math.PI / 2, []);

  const [screenShownState, setScreenShownState] = useState<{
    index: number;
    back: boolean;
    heightAnimation: boolean;
  }>({
    index: 0,
    back: false,
    heightAnimation: false,
  });

  const heightAnimation = (back = false, index = 3) => {
    if (back) {
      rotationAnimatedValue.setValue(index * 2 * Math.PI);
    }

    Animated.timing(animatedHeight, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() =>
      setScreenShownState({
        index,
        back,
        heightAnimation: true,
      }),
    );
  };

  const advanceForNextScreen = (back = false) => {
    Animated.timing(rotationAnimatedValue, {
      toValue:
        (back ? -piDividedBy2 : piDividedBy2) +
        screenShownState.index * 2 * Math.PI,
      duration: 300,
      useNativeDriver: false,
    }).start(() =>
      setScreenShownState({
        index: screenShownState.index + (back ? -1 : 1),
        back,
        heightAnimation: false,
      }),
    );
  };

  const getSubScreen = () => {
    switch (subScreems[screenShownState.index]) {
      case 'ChooseTheme':
        return <ChooseTheme onAdvancePress={() => advanceForNextScreen()} />;
      case 'ChooseName':
        return (
          <ChooseName
            onBackPress={() => advanceForNextScreen(true)}
            onAdvancePress={(name) => {
              advanceForNextScreen();
              dispatch(setUserName(name));
            }}
          />
        );
      case 'ChoosePhotoOrAvatar':
        return (
          <ChoosePhotoOrAvatar
            onAvatarPress={(avatar) => {
              dispatch(setUserAvatar(avatar));
              heightAnimation();
            }}
            onBackPress={() => advanceForNextScreen(true)}
          />
        );
      case 'SaveUserConfiguration':
        return (
          <SaveUserConfiguration
            onChagePress={(index) => heightAnimation(true, index)}
          />
        );
    }
  };

  useEffect(() => {
    if (screenShownState.index === 3) {
      Animated.timing(animatedHeight, {
        toValue: 380,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else if (screenShownState.heightAnimation) {
      Animated.timing(animatedHeight, {
        toValue: 350,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      const setValue = screenShownState.back
        ? piDividedBy2 + screenShownState.index * 2 * Math.PI
        : piDividedBy2 * 3 + (screenShownState.index - 1) * 2 * Math.PI;

      rotationAnimatedValue.setValue(setValue);

      const toValue = screenShownState.back
        ? screenShownState.index * 2 * Math.PI
        : piDividedBy2 * 4 + (screenShownState.index - 1) * 2 * Math.PI;

      Animated.timing(rotationAnimatedValue, {
        toValue,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [screenShownState, rotationAnimatedValue, piDividedBy2, animatedHeight]);

  const screenHeight = useDimensions().window.height;
  const screenHeightDividedBy2 = useMemo(() => screenHeight / 2, [
    screenHeight,
  ]);

  const animatedBackgroundOffset = firstAnimationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-screenHeightDividedBy2, 0],
  });

  const appTheme = useSelector(selectAppTheme);

  useEffect(() => {
    Animated.timing(firstAnimationValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [firstAnimationValue]);

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
              height: animatedHeight,
              opacity: firstAnimationValue,
              backgroundColor: appTheme.aboveBackground,
              transform: [
                {
                  rotateY: rotationAnimatedValue,
                },
              ],
            },
          ]}>
          {getSubScreen()}
        </Animated.View>
      </View>
    </ScreenWrapper>
  );
};

export default ChooseUserConfigurations;
