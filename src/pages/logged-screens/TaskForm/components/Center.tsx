import React from 'react';
import {View} from 'react-native';

const TaskFormWrapper: React.FC = ({children}) => {
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
};

export default TaskFormWrapper;
