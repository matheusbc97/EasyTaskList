import React from 'react';
import {ViewStyle, StyleProp} from 'react-native';
import styled from 'styled-components/native';

const StyledVerticalSeparator = styled.View`
  width: 1px;
  background-color: #e0e0e0;
  height: 100%;
`;

interface VerticalSeparatorProps {
  style?: StyleProp<ViewStyle>;
}

function VerticalSeparator({style}: VerticalSeparatorProps) {
  return <StyledVerticalSeparator style={style} />;
}

export default VerticalSeparator;
