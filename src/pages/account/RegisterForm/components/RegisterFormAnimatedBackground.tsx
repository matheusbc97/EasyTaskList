import React from 'react';
import {Animated, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

import {GEAR, PERSON_SEATED, GRAPH, CHECKED, PIZZA_GRAPH} from '@assets/images';

import useMoveBackgroundFromLeftAnimation from '../hooks/useMoveBackgroundFromLeftAnimation';

const screenWidth = Dimensions.get('window').width;

const BackGround = styled(LinearGradient)`
  width: ${screenWidth + 80}px;
  height: 100%;
  border-top-right-radius: 600px;
  border-color: red;
`;

const Container = styled.View`
  margin-top: 100px;
  width: ${screenWidth};
  padding-bottom: 120px;
`;

const CheckedImage = styled.Image`
  position: absolute;
  top: 110px;
  left: 0;
  tint-color: #fff;
  width: 80px;
`;

const PizzaGraphImage = styled.Image`
  position: absolute;
  top: 100px;
  right: 0;
  width: 100px;
  height: 100px;
`;

const GearImage = styled.Image`
  position: absolute;
  bottom: 0;
  left: -120px;
  width: 250px;
`;

const GraphImage = styled.Image`
  position: absolute;
  bottom: 10px;
  right: 90px;
  width: 150px;
`;

const PersonSeatedImage = styled.Image`
  align-self: center;
`;

const AnimatedBackground = Animated.createAnimatedComponent(BackGround);

const RegisterFormAnimatedBackground: React.FC = ({children}) => {
  const {backgroundMarginRight} = useMoveBackgroundFromLeftAnimation();

  return (
    <AnimatedBackground
      style={{right: backgroundMarginRight}}
      colors={['#66F6A9', '#1FB7C8']}>
      <Container>
        <PersonSeatedImage source={PERSON_SEATED} />
        <CheckedImage source={CHECKED} />
        <PizzaGraphImage source={PIZZA_GRAPH} />

        {children}
      </Container>
      <GearImage source={GEAR} />
      <GraphImage source={GRAPH} />
    </AnimatedBackground>
  );
};

export default RegisterFormAnimatedBackground;
