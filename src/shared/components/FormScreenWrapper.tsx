import React from 'react';
import {ViewStyle} from 'react-native';

import {AnimatedBackground, Center, FormContainer} from '@/shared/components';
import {AppTheme} from '@shared/models';

interface FormScreenWrapperProps {
  contentStyle?: ViewStyle;
  alignCenter?: boolean;
  theme?: AppTheme;
}

const FormScreenWrapper: React.FC<FormScreenWrapperProps> = ({
  children,
  contentStyle,
  alignCenter = false,
  theme,
}) => {
  return (
    <AnimatedBackground theme={theme}>
      <Center>
        <FormContainer
          style={[
            {alignItems: alignCenter ? 'center' : undefined},
            contentStyle,
          ]}>
          {children}
        </FormContainer>
      </Center>
    </AnimatedBackground>
  );
};

export default FormScreenWrapper;
