import React from 'react';
import {ScrollView} from 'react-native';

import {
  Text,
  BackButton,
  FormScreenWrapper,
  LoadingFallback,
  ShowFallbackComponent,
} from '@shared/components';
import {UnauthenticatedStackParams} from '@navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import usePrivacyPolicy from '@/hooks/usePrivacyPolicy';
import {useTranslation} from '@/shared/hooks';

interface Props {
  navigation: StackNavigationProp<UnauthenticatedStackParams, 'PrivacyPolicy'>;
}

interface ErrorFallbackProps {
  hasError: boolean;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({hasError, children}) => (
  <ShowFallbackComponent
    showFallback={hasError}
    fallback={<Text style={{paddingHorizontal: 10}}>ERROR</Text>}>
    {children}
  </ShowFallbackComponent>
);

const PrivacyPolicy: React.FC<Props> = ({navigation}) => {
  const {fetchState, privacyPolicy} = usePrivacyPolicy();
  const {translation} = useTranslation();

  return (
    <FormScreenWrapper>
      <BackButton onPress={() => navigation.pop()} />

      <Text type="title-big" centerText style={{marginVertical: 10}}>
        {translation('PRIVACY_POLICY')}
      </Text>
      <LoadingFallback isLoading={fetchState.isLoading}>
        <ErrorFallback hasError={fetchState.hasError}>
          <ScrollView>
            <Text style={{paddingHorizontal: 10}}>{privacyPolicy}</Text>
          </ScrollView>
        </ErrorFallback>
      </LoadingFallback>
    </FormScreenWrapper>
  );
};

export default PrivacyPolicy;
