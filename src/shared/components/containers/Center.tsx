import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';

function TaskFormWrapper({children}: PropsWithChildren) {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      }}>
      {children}
    </View>
  );
}

export default TaskFormWrapper;
