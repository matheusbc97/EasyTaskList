import {ScrollView} from 'react-native';
import styled from 'styled-components/native';

import {Text} from '@shared/components';

export const FormWrapper = styled.View`
  padding: 10px 10px 0 10px;
  align-items: center;
`;

export const Title = styled(Text)`
  align-self: center;
  margin-top: 14px;
  color: #1fb7c8;
  font-size: 18px;
`;

export const Scroll = styled(ScrollView).attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})``;

export const Shadow = styled.View`
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.2;
  position: absolute;
  z-index: 2;
  elevation: 2;
`;

export const Content = styled.View`
  background-color: #fff;
  margin: 0 20px;
  border-radius: 30px;
  padding-bottom: 10px;
  elevation: 2;
  z-index: 2;
  margin-top: -23px;
`;
