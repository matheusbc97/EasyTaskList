import React from 'react';
import {ScrollView} from 'react-native';

import {useTranslation} from '@/modules/shared/hooks';
import {Text, BackButton, FormScreenWrapper} from '@/modules/shared/components';
import {PRIVACY_POLICE} from '@/modules/shared/constants/privacyPolice';

function PrivacyPolicyPage() {
  const {translation} = useTranslation();

  return (
    <FormScreenWrapper>
      <BackButton />

      <Text type="title-big" centerText style={{marginVertical: 10}}>
        {translation('PRIVACY_POLICY')}
      </Text>
      <ScrollView>
        <Text style={{paddingHorizontal: 10}}>{PRIVACY_POLICE}</Text>
      </ScrollView>
    </FormScreenWrapper>
  );
}

export default PrivacyPolicyPage;
