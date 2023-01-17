import React from 'react';
import {View, StyleSheet} from 'react-native';

import Avatar from '@/shared/components/Avatar';

interface Props {
  onAvatarPress(avatarIndex: number): void;
}

const AvatarList: React.FC<Props> = ({onAvatarPress}) => {
  return (
    <View style={styles.content}>
      <View style={styles.row}>
        <Avatar
          testId="AvatarGridAvatar0"
          avatarNumber={0}
          onPress={() => onAvatarPress(0)}
        />
        <Avatar
          testId="AvatarGridAvatar1"
          avatarNumber={1}
          onPress={() => onAvatarPress(1)}
        />
        <Avatar
          testId="AvatarGridAvatar2"
          avatarNumber={2}
          onPress={() => onAvatarPress(2)}
        />
        <Avatar
          testId="AvatarGridAvatar3"
          avatarNumber={3}
          onPress={() => onAvatarPress(3)}
        />
      </View>
      <View style={styles.row}>
        <Avatar
          testId="AvatarGridAvatar4"
          avatarNumber={4}
          onPress={() => onAvatarPress(4)}
        />
        <Avatar
          testId="AvatarGridAvatar5"
          avatarNumber={5}
          onPress={() => onAvatarPress(5)}
        />
        <Avatar
          testId="AvatarGridAvatar6"
          avatarNumber={6}
          onPress={() => onAvatarPress(6)}
        />
        <Avatar
          testId="AvatarGridAvatar7"
          avatarNumber={7}
          onPress={() => onAvatarPress(7)}
        />
      </View>
    </View>
  );
};

export default AvatarList;

const styles = StyleSheet.create({
  content: {width: '100%', paddingHorizontal: 20},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
});
