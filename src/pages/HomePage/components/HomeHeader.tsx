import React from 'react';
import {View} from 'react-native';

import {Avatar, Text} from '@/shared/components';
import {useFormatDate, useTranslation} from '@/shared/hooks';

import styles from '../styles';
import {TEST_IDS} from '@/shared/constants/testIds';
import useGetUser from '@/shared/hooks/data/useGetUser';

const HomeHeader: React.FC = () => {
  const formatDate = useFormatDate();
  const {translation} = useTranslation();
  const user = useGetUser();

  if (!user) {
    return null;
  }

  return (
    <View style={styles.header}>
      <Avatar avatarNumber={user?.avatar} size={50} />
      <View style={styles.headerContent}>
        <Text testID={TEST_IDS.HEADER_USER_NAME_TEXT} type="title-medium">
          {translation('HELLO')}, {user?.name}
        </Text>
        <Text>{formatDate(new Date(), 'dateOfMonthAndYear')}</Text>
      </View>
    </View>
  );
};

export default HomeHeader;
