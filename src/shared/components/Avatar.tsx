import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {TouchableRipple} from 'react-native-paper';

import {
  AVATAR,
  AVATAR_2,
  AVATAR_3,
  AVATAR_4,
  AVATAR_5,
  AVATAR_6,
  AVATAR_7,
  AVATAR_8,
} from '../../assets/images';

const avatarSources = [
  AVATAR,
  AVATAR_2,
  AVATAR_3,
  AVATAR_4,
  AVATAR_5,
  AVATAR_6,
  AVATAR_7,
  AVATAR_8,
] as const;

interface ImageAvatarProps {
  onPress?(): void;
  avatarNumber?: number;
  size?: number;
}

const ImageAvatar: React.FC<ImageAvatarProps> = ({
  avatarNumber = -1,
  size = 55,
  onPress,
}) => {
  return (
    <TouchableRipple
      onPress={onPress}
      style={[
        styles.avatarContainer,
        {width: size, height: size, borderRadius: size / 2},
      ]}>
      <Image
        source={avatarSources[avatarNumber]}
        resizeMode="contain"
        style={[styles.avatarImage, {width: size, height: size}]}
      />
    </TouchableRipple>
  );
};

export default ImageAvatar;

const styles = StyleSheet.create({
  avatarContainer: {
    borderWidth: 2,
    borderColor: '#707070',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#e4e0e0',
  },
  avatarImage: {marginTop: 4},
});
