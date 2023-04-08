import React from 'react';
import {View} from 'react-native';

import {CreateNewTaskButton, Separator} from '@/shared/components';

function HomeFooter() {
  return (
    <>
      <Separator style={{marginTop: 5}} />
      <View style={{paddingVertical: 5, paddingHorizontal: 20}}>
        <CreateNewTaskButton />
      </View>
    </>
  );
}

export default HomeFooter;
