import React, {useEffect, useMemo, useState} from 'react';
import {Animated} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

import {ScreenWrapper, AnimatedBackground} from '@/modules/shared/components';
import {selectAppTheme} from '@/store/configs';

import ChooseTheme from './sub-pages/ChooseTheme';
import ChoosePhotoOrAvatar from './sub-pages/ChoosePhotoOrAvatar';
import ChooseName from './sub-pages/ChooseName';
import SaveUserConfiguration from './sub-pages/SaveUserConfiguration';

import styles from './styles';
import {setUserPreppingAvatar, setUserPreppingName} from './store/userPrepping';
import {UserPreppingProvider, useUserPreppingDispatch} from './store';

const subScreens = [
  'ChooseTheme',
  'ChooseName',
  'ChoosePhotoOrAvatar',
  'SaveUserConfiguration',
] as const;

const ChooseUserConfigurationsPage: React.FC = () => {
  const rotationAnimatedValue = useMemo(() => new Animated.Value(0), []);
  const animatedHeight = useMemo(() => new Animated.Value(310), []);

  const rotationAnimatedValueDegrees = rotationAnimatedValue.interpolate({
    inputRange: [0, 2],
    outputRange: ['0deg', '720deg'],
  });

  const dispatch = useUserPreppingDispatch();

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
      rotationAnimatedValue.setValue(index);
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
    if (screenShownState.heightAnimation) {
      heightAnimation();
    } else {
      Animated.timing(rotationAnimatedValue, {
        toValue: back
          ? screenShownState.index - 0.25
          : screenShownState.index + 0.25,
        duration: 300,
        useNativeDriver: false,
      }).start(() =>
        setScreenShownState({
          index: screenShownState.index + (back ? -1 : 1),
          back,
          heightAnimation: false,
        }),
      );
    }
  };

  const getSubScreen = () => {
    switch (subScreens[screenShownState.index]) {
      case 'ChooseTheme':
        return <ChooseTheme onAdvancePress={() => advanceForNextScreen()} />;
      case 'ChooseName':
        return (
          <ChooseName
            onBackPress={() => advanceForNextScreen(true)}
            onAdvancePress={name => {
              advanceForNextScreen();
              dispatch(setUserPreppingName(name));
            }}
            showBackButton={!screenShownState.heightAnimation}
          />
        );
      case 'ChoosePhotoOrAvatar':
        return (
          <ChoosePhotoOrAvatar
            onAvatarPress={avatar => {
              dispatch(setUserPreppingAvatar(avatar));
              heightAnimation();
            }}
            onBackPress={() => advanceForNextScreen(true)}
            showBackButton={!screenShownState.heightAnimation}
          />
        );
      case 'SaveUserConfiguration':
        return (
          <SaveUserConfiguration
            onChangePress={index => heightAnimation(true, index)}
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
        toValue: 310,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      const setValue = screenShownState.back
        ? screenShownState.index + 0.25
        : screenShownState.index - 0.25;

      rotationAnimatedValue.setValue(setValue);

      const toValue = screenShownState.back
        ? screenShownState.index
        : screenShownState.index;

      Animated.timing(rotationAnimatedValue, {
        toValue,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [screenShownState, rotationAnimatedValue, piDividedBy2, animatedHeight]);

  const appTheme = useSelector(selectAppTheme);

  return (
    <ScreenWrapper>
      <AnimatedBackground>
        <Animated.View
          style={[
            styles.content,
            {
              height: animatedHeight,
              backgroundColor: appTheme.aboveBackground,
              transform: [
                {
                  rotateY: rotationAnimatedValueDegrees,
                },
              ],
            },
          ]}>
          {getSubScreen()}
        </Animated.View>
      </AnimatedBackground>
    </ScreenWrapper>
  );
};

function ChooseUserConfigurationsPageWithProvider() {
  return (
    <UserPreppingProvider>
      <ChooseUserConfigurationsPage />
    </UserPreppingProvider>
  );
}

export default ChooseUserConfigurationsPageWithProvider;
