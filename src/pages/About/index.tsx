import React from 'react';
import {useSelector} from 'react-redux';

import {
  ScreenWrapper,
  Header,
  FlatListWithFetchIndicator,
} from '@shared/components';
import {AuthenticatedStackParams} from '@navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  selectAboutItemsFetchState,
  aboutItemsListSelectors,
} from '@store/about';

import AboutListItem from './AboutListItem';
import {Content} from './styles';

interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'About'>;
}

const About: React.FC<Props> = ({navigation}) => {
  const aboutItems = useSelector(aboutItemsListSelectors.selectAll);
  const fetchState = useSelector(selectAboutItemsFetchState);

  return (
    <ScreenWrapper>
      <Header
        title="Sobre"
        onBackPress={() => navigation.navigate('BottomNavigation')}
      />
      <Content>
        <FlatListWithFetchIndicator
          keyExtractor={item => item.id}
          data={aboutItems}
          isLoading={fetchState.isLoading}
          hasError={fetchState.hasError}
          emptyListText="Nenhum Item Encontrado"
          renderItem={({item, index}) => (
            <AboutListItem item={item} index={index} />
          )}
        />
      </Content>
    </ScreenWrapper>
  );
};

export default About;
