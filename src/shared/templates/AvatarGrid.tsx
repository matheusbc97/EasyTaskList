import React from 'react';
import {View, StyleSheet} from 'react-native';

import Avatar from '@/shared/components/Avatar';
import {TEST_IDS} from '../constants/testIds';

interface Props {
  onAvatarPress(avatarIndex: number): void;
}

const AvatarList: React.FC<Props> = ({onAvatarPress}) => {
  return (
    <View style={styles.content}>
      <View style={styles.row}>
        <Avatar
          testId={TEST_IDS.AVATAR_GRID_AVATAR(0)}
          avatarNumber={0}
          onPress={() => onAvatarPress(0)}
        />
        <Avatar
          testId={TEST_IDS.AVATAR_GRID_AVATAR(1)}
          avatarNumber={1}
          onPress={() => onAvatarPress(1)}
        />
        <Avatar
          testId={TEST_IDS.AVATAR_GRID_AVATAR(2)}
          avatarNumber={2}
          onPress={() => onAvatarPress(2)}
        />
        <Avatar
          testId={TEST_IDS.AVATAR_GRID_AVATAR(3)}
          avatarNumber={3}
          onPress={() => onAvatarPress(3)}
        />
      </View>
      <View style={styles.row}>
        <Avatar
          testId={TEST_IDS.AVATAR_GRID_AVATAR(4)}
          avatarNumber={4}
          onPress={() => onAvatarPress(4)}
        />
        <Avatar
          testId={TEST_IDS.AVATAR_GRID_AVATAR(5)}
          avatarNumber={5}
          onPress={() => onAvatarPress(5)}
        />
        <Avatar
          testId={TEST_IDS.AVATAR_GRID_AVATAR(6)}
          avatarNumber={6}
          onPress={() => onAvatarPress(6)}
        />
        <Avatar
          testId={TEST_IDS.AVATAR_GRID_AVATAR(7)}
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
