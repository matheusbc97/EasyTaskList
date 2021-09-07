import React from 'react';
import {View} from 'react-native';

const FormContainer: React.FC = ({children}) => {
  return (
    <View
      style={{
        paddingVertical: 15,
        backgroundColor: '#FFF',
        marginHorizontal: 10,
        paddingHorizontal: 10,
        borderRadius: 30,
        elevation: 3,
      }}>
      {children}
    </View>
  );
};

export default FormContainer;
