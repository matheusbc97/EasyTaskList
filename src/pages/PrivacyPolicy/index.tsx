import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';

import usePrivacyPolicy from '@/hooks/usePrivacyPolicy';
import {useTranslation} from '@/shared/hooks';
import {
  Text,
  BackButton,
  FormScreenWrapper,
  LoadingFallback,
  ErrorFallback,
} from '@/shared/components';

const PrivacyPolicy: React.FC = () => {
  const {fetchState, privacyPolicy, getPrivacyPolicy} = usePrivacyPolicy();
  const {translation} = useTranslation();

  useEffect(() => {
    getPrivacyPolicy();
  }, [getPrivacyPolicy]);

  return (
    <FormScreenWrapper>
      <BackButton />

      <Text type="title-big" centerText style={{marginVertical: 10}}>
        {translation('PRIVACY_POLICY')}
      </Text>
      <LoadingFallback isLoading={fetchState.isLoading}>
        <ErrorFallback
          hasError={fetchState.hasError}
          onTryAgainPress={getPrivacyPolicy}>
          <ScrollView>
            <Text style={{paddingHorizontal: 10}}>{privacyPolicy}</Text>
          </ScrollView>
        </ErrorFallback>
      </LoadingFallback>
    </FormScreenWrapper>
  );
};

export default PrivacyPolicy;
