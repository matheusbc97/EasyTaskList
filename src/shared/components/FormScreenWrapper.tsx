import React from 'react';
import {ViewStyle} from 'react-native';

import {AnimatedBackground, Center, FormContainer} from '@/shared/components';

interface FormScreenWrapperProps {
  contentStyle?: ViewStyle;
}

const FormScreenWrapper: React.FC<FormScreenWrapperProps> = ({
  children,
  contentStyle,
}) => {
  return (
    <AnimatedBackground>
      <Center>
        <FormContainer style={contentStyle}>{children}</FormContainer>
      </Center>
    </AnimatedBackground>
  );
};

export default FormScreenWrapper;
