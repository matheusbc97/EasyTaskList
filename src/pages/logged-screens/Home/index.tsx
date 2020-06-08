import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';

import {Text} from '../../../library/components';
import {RootStackParams} from '../../../navigation/types';
import {ScreenWrapper} from '../../../library/components';

type HomeNavigationProp = StackNavigationProp<RootStackParams, 'DrawerStack'>;

interface Props {
  navigation: HomeNavigationProp;
}

const Home = ({}: Props) => {
  return (
    <ScreenWrapper>
      <Text>Home</Text>
    </ScreenWrapper>
  );
};

export default Home;
