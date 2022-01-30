import React from 'react';
import {Animated} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';

import {ADVANCE_BTN} from '@/assets/images';
import {Text, Button} from '@/shared/components';

const Container = styled.View`
  z-index: 3;
  elevation: 3;
`;

const Background = styled.ImageBackground`
  flex-direction: row;
  align-items: center;
  width: 150px;
  height: 150px;
  padding-top: 52px;
`;

interface AdvanceButtonProps {
  style: any;
  onPress: () => void;
}

const AnimatedContainer = Animated.createAnimatedComponent(Container);

export default function AdvanceButton({style, onPress}: AdvanceButtonProps) {
  return (
    <AnimatedContainer style={style}>
      <Button onPress={onPress} testID='RegisterAdvanceButton'>
        <Background source={ADVANCE_BTN}>
          <Text type="title" style={{paddingLeft: 20, color: '#1fb7c8'}}>
            AVANÇAR
          </Text>
          <MaterialIcon
            name="keyboard-arrow-right"
            size={40}
            style={{marginLeft: -8, color: '#1fb7c8'}}
          />
        </Background>
      </Button>
    </AnimatedContainer>
  );
}
