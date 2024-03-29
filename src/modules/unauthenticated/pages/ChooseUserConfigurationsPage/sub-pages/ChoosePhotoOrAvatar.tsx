import React from 'react';
import {View, StyleSheet} from 'react-native';

import {Text, BackButton} from '@/modules/shared/components';
import {useTranslation} from '@/modules/shared/hooks';
import AvatarGrid from '@/modules/shared/templates/AvatarGrid';

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
  const {translation} = useTranslation();

  return (
    <View style={styles.container}>
      {showBackButton && <BackButton onPress={onBackPress} />}
      <Text type="title-medium" style={{textAlign: 'center'}}>
        {translation('CHOOSE_ONE_OF_OUR_AVATARS')}
      </Text>
      <View style={styles.content}>
        <AvatarGrid onAvatarPress={onAvatarPress} />
      </View>
      <Text type="title-medium" style={{textAlign: 'center'}}>
        {translation('YOUR_DATA_CAN_BE_CHANGE_FUTURELY')}
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
