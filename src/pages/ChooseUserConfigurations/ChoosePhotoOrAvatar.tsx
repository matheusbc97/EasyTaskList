import React from 'react';
import {View, Image} from 'react-native';

import {Text} from '../../library/components';
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
];

const ImageAvatar = ({avatarNumber = 7}) => {
  const size = 60;
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 2,
        borderColor: '#707070',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#e4e0e0',
      }}>
      <Image
        source={avatarSources[avatarNumber]}
        resizeMode="contain"
        style={{width: size, height: size, marginTop: 4}}
      />
    </View>
  );
};

const ChoosePhotoOrAvatar = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 15,
      }}>
      <Text type="title-medium" style={{textAlign: 'center'}}>
        Você também pode escolher um dos nossos avatares!
      </Text>
      <View style={{width: '100%', paddingHorizontal: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}>
          <ImageAvatar avatarNumber={0} />
          <ImageAvatar avatarNumber={1} />
          <ImageAvatar avatarNumber={2} />
          <ImageAvatar avatarNumber={3} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}>
          <ImageAvatar avatarNumber={4} />
          <ImageAvatar avatarNumber={5} />
          <ImageAvatar avatarNumber={6} />
          <ImageAvatar avatarNumber={7} />
        </View>
      </View>
      <Text type="title-medium" style={{textAlign: 'center'}}>
        Não se preocupe, seus dados poderão ser alterados posteriormente!
      </Text>
    </View>
  );
};

export default ChoosePhotoOrAvatar;
