import React, {PropsWithChildren} from 'react';
import {ViewStyle} from 'react-native';

import {AppTheme} from '@/modules/shared/models';

import AnimatedBackground from './AnimatedBackground';
import Center from './Center';
import FormContainer from './FormContainer';

interface FormScreenWrapperProps {
  contentStyle?: ViewStyle;
  alignCenter?: boolean;
  theme?: AppTheme;
}

function FormScreenWrapper({
  children,
  contentStyle,
  alignCenter = false,
  theme,
}: PropsWithChildren<FormScreenWrapperProps>) {
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
}

export default FormScreenWrapper;
