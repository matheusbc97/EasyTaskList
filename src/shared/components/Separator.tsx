import React from 'react';
import {ViewStyle, StyleProp} from 'react-native';
import styled from 'styled-components/native';

const StyledSeparator = styled.View`
  height: 1px;
  background-color: #e0e0e0;
  flex-direction: row;
  margin: 0 40px;
`;

interface SeparatorProps {
  style?: StyleProp<ViewStyle>;
}

function Separator({style}: SeparatorProps) {
  return <StyledSeparator style={style} />;
}

export default Separator;
