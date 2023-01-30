import {TEST_IDS} from '@/shared/constants/testIds';
import React from 'react';
import {ViewStyle} from 'react-native';
import styled from 'styled-components/native';

export const Content = styled.View`
  width: 85%;
  border-radius: 15px;
  overflow: hidden;
  background-color: #fff;
  padding: 10px;
`;

interface Props {
  style?: ViewStyle;
}

const AnimatedBackgroundContent: React.FC<Props> = ({children, style}) => {
  return (
    <Content testID={TEST_IDS.ANIMATED_BACKGROUND_CONTENT} style={style}>
      {children}
    </Content>
  );
};

export default AnimatedBackgroundContent;
