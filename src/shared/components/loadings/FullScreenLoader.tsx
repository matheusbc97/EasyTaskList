import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  DeviceEventEmitter,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {useBackHandler} from '@react-native-community/hooks';

import colors from '../../../assets/colors';

export const fullScreenLoader = {
  hideLoader() {
    DeviceEventEmitter.emit('changeLoadingEffect', {isVisible: false});
  },
  showLoader() {
    DeviceEventEmitter.emit('changeLoadingEffect', {isVisible: true});
  },
};

const FullScreenLoader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutId = useRef(-1);

  useBackHandler(() => isVisible);

  useEffect(() => {
    const emitter = DeviceEventEmitter.addListener(
      'changeLoadingEffect',
      data => {
        if (data.isVisible) {
          timeoutId.current = setTimeout(() => {
            timeoutId.current = -1;
            DeviceEventEmitter.emit('changeLoadingEffect', {
              isVisible: false,
            });
          }, 20000);
        } else if (timeoutId.current !== -1) {
          clearTimeout(timeoutId.current);
          timeoutId.current = -1;
        }

        setIsVisible(data.isVisible);
      },
    );

    return () => {
      emitter.remove();
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.background} />
      <View style={styles.contentWrapper}>
        <View style={styles.content}>
          <ActivityIndicator
            size={40}
            color={colors.red2}
            style={styles.activityIndicator}
          />
          <Text style={styles.text}>Carregando...</Text>
        </View>
      </View>
    </View>
  );
};

export default FullScreenLoader;

const styles = StyleSheet.create({
  container: {position: 'absolute', width: '100%', height: '100%'},
  background: {flex: 1, backgroundColor: 'black', opacity: 0.5},
  contentWrapper: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  content: {
    backgroundColor: 'white',
    width: 300,
    height: 100,
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityIndicator: {paddingHorizontal: 30},
  text: {fontSize: 18},
});
