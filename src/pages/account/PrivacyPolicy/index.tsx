import React, {useEffect, useState, useMemo} from 'react';
import {ScrollView} from 'react-native';

import {
  AnimatedBackground,
  ScreenWrapper,
  AnimatedBackgroundContent,
  Text,
  BackButton,
  LoadingIndicator,
} from '@shared/components';
import {UnauthenticatedStackParams} from '@navigation/types';
import {StackNavigationProp} from '@react-navigation/stack';
import {getPrivacyPolicy} from '@shared/firebase';
import {handleErrorMessage} from '@shared/utils/errorHandler';

interface Props {
  navigation: StackNavigationProp<UnauthenticatedStackParams, 'PrivacyPolicy'>;
}

const PrivacyPolicy: React.FC<Props> = ({navigation}) => {
  const [privacyPolicy, setPrivacyPolicy] = useState('');
  const isLoading = useMemo(() => privacyPolicy === '', [privacyPolicy]);

  useEffect(() => {
    async function getAsync() {
      try {
        const _privacyPolicy = await getPrivacyPolicy();

        setPrivacyPolicy(_privacyPolicy);
      } catch (error) {
        handleErrorMessage(error);
      }
    }

    getAsync();
  }, []);

  const content = useMemo(() => {
    if (isLoading) {
      return <LoadingIndicator />;
    }

    return (
      <ScrollView>
        <Text style={{paddingHorizontal: 10}}>{privacyPolicy}</Text>
      </ScrollView>
    );
  }, [privacyPolicy, isLoading]);

  return (
    <ScreenWrapper>
      <AnimatedBackground>
        <AnimatedBackgroundContent style={{height: '80%'}}>
          <BackButton onPress={() => navigation.pop()} />

          <Text
            type="title-big"
            style={{alignSelf: 'center', marginVertical: 10}}>
            Política de Privacidade
          </Text>
          {content}
        </AnimatedBackgroundContent>
      </AnimatedBackground>
    </ScreenWrapper>
  );
};

export default PrivacyPolicy;
