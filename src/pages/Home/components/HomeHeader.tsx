import React from 'react';
import {View} from 'react-native';

import {Avatar, Text} from '@shared/components';

import styles from '../styles';
import {useFormatDate, useTranslation} from '@shared/hooks';
import {User} from '@shared/models';

interface HomeHeaderProps {
  user: User | null;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({user}) => {
  const formatDate = useFormatDate();
  const {translation} = useTranslation();

  if (!user) {
    return null;
  }

  return (
    <View style={styles.header}>
      <Avatar avatarNumber={user?.avatar} size={50} />
      <View style={styles.headerContent}>
        <Text type="title-medium">
          {translation('HELLO')}, {user?.name}
        </Text>
        <Text>{formatDate(new Date(), 'dateOfMotnhAndYear')}</Text>
      </View>
    </View>
  );
};

export default HomeHeader;
