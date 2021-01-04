import React from 'react';
import styled from 'styled-components/native';

export const Content = styled.View`
  width: 85%;
  border-radius: 15px;
  overflow: hidden;
  background-color: #fff;
  padding: 10px;
`;

const AnimatedBackgroundContent: React.FC = ({children}) => {
  return <Content>{children}</Content>;
};

export default AnimatedBackgroundContent;
