import React from 'react';
import {FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {ScreenWrapper, Header} from '@/shared/components';
import {AuthenticatedStackParams} from '@/navigation/types';
import {ABOUT} from '@/shared/constants/about';

import AboutListItem from './components/AboutListItem';
import {Content} from './styles';

interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'About'>;
}

const AboutPage: React.FC<Props> = ({navigation}) => {
  return (
    <ScreenWrapper>
      <Header
        title="Sobre"
        onBackPress={() => navigation.navigate('BottomNavigation')}
      />
      <Content>
        <FlatList
          keyExtractor={item => item.id}
          data={ABOUT}
          renderItem={({item, index}) => (
            <AboutListItem item={item} index={index} />
          )}
        />
      </Content>
    </ScreenWrapper>
  );
};

export default AboutPage;
