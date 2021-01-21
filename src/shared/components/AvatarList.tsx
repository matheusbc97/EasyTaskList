import React from 'react';
import {View, StyleSheet} from 'react-native';
import Avatar from '@shared/components/Avatar';

interface Props {
  onAvatarPress(arg0: number): void;
}

const AvatarList: React.FC<Props> = ({onAvatarPress}) => {
  return (
    <View style={styles.content}>
      <View style={styles.row}>
        <Avatar avatarNumber={0} onPress={() => onAvatarPress(0)} />
        <Avatar avatarNumber={1} onPress={() => onAvatarPress(1)} />
        <Avatar avatarNumber={2} onPress={() => onAvatarPress(2)} />
        <Avatar avatarNumber={3} onPress={() => onAvatarPress(3)} />
      </View>
      <View style={styles.row}>
        <Avatar avatarNumber={4} onPress={() => onAvatarPress(4)} />
        <Avatar avatarNumber={5} onPress={() => onAvatarPress(5)} />
        <Avatar avatarNumber={6} onPress={() => onAvatarPress(6)} />
        <Avatar avatarNumber={7} onPress={() => onAvatarPress(7)} />
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
