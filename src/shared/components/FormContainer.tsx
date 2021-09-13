import React from 'react';
import {View, ViewProps} from 'react-native';

interface FormContainerProps extends ViewProps {
  height?: number;
  spaceBetween?: boolean;
}

const FormContainer: React.FC<FormContainerProps> = ({
  children,
  height,
  style,
  spaceBetween = false,
}) => {
  return (
    <View
      style={[
        {
          paddingVertical: 15,
          backgroundColor: '#FFF',
          marginHorizontal: 20,
          paddingHorizontal: 10,
          borderRadius: 30,
          elevation: 3,
          height,
          justifyContent: spaceBetween ? 'space-between' : 'flex-start',
        },
        style,
      ]}>
      {children}
    </View>
  );
};

export default FormContainer;
