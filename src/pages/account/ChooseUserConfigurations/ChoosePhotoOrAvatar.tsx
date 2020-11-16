import React from 'react';
import {View, StyleSheet} from 'react-native';

import {Text, Avatar, BackButton} from '@shared/components';

interface Props {
  onBackPress(): void;
  onAvatarPress(arg0: number): void;
  showBackButton?: boolean;
}

const ChoosePhotoOrAvatar: React.FC<Props> = ({
  onBackPress,
  onAvatarPress,
  showBackButton = true,
}) => {
  return (
    <View style={styles.container}>
      {showBackButton && <BackButton onPress={onBackPress} />}
      <Text type="title-medium" style={{textAlign: 'center'}}>
        Você também pode escolher um dos nossos avatares!
      </Text>
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
      <Text type="title-medium" style={{textAlign: 'center'}}>
        Não se preocupe, seus dados poderão ser alterados posteriormente!
      </Text>
    </View>
  );
};

export default ChoosePhotoOrAvatar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
    marginHorizontal: 8,
  },
  content: {width: '100%', paddingHorizontal: 20},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
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
