import React, {useEffect, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  ScreenWrapper,
  Header,
  FlatListWithFetchIndicator,
} from '@shared/components';
import {AuthenticatedStackParams} from '@navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  getAboutItems,
  selectAboutItemsFetchState,
  aboutItemsListSelectors,
  resetAboutItems,
} from '@store/about';

import AboutListItem from './AboutListItem';

interface Props {
  navigation: StackNavigationProp<AuthenticatedStackParams, 'About'>;
}

const About: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();

  const getAboutList = useCallback(() => dispatch(getAboutItems()), [dispatch]);

  useEffect(() => {
    getAboutList();

    return () => {
      dispatch(resetAboutItems());
    };
  }, [dispatch, getAboutList]);

  const aboutItems = useSelector(aboutItemsListSelectors.selectAll);
  const fetchState = useSelector(selectAboutItemsFetchState);

  return (
    <ScreenWrapper>
      <Header
        title="Sobre"
        onBackPress={() => navigation.navigate('BottomNavigation')}
      />
      <FlatListWithFetchIndicator
        keyExtractor={(item) => item.id}
        onRefresh={getAboutList}
        data={aboutItems}
        isLoading={fetchState.isLoading}
        hasError={fetchState.hasError}
        emptyListText="Nenhum Item Encontrado"
        renderItem={({item, index}) => (
          <AboutListItem item={item} index={index} />
        )}
      />
    </ScreenWrapper>
  );
};

export default About;
