import styled from 'styled-components/native';
import {Form} from '@unform/mobile';

import {TextButton, RoundedButton, Text} from '@shared/components';

export const ImageBackground = styled.ImageBackground`
  width: 100%;
  padding: 0 40px;
  align-items: center;
`;

export const LoginTextButton = styled(TextButton).attrs({
  textInEvidenceStyle: {
    color: '#E63A5A',
  },
})``;

export const LoginButton = styled(RoundedButton)`
  background-color: #e63a5a;
`;

export const TopText = styled(Text)`
  color: #e63a5a;
  font-size: 24;
  font-weight: bold;
`;

export const FormContainer = styled.View`
  padding: 20px;
  align-items: center;
  background-color: #fafafa;
  margin-top: -50px;
`;

export const LoginForm = styled(Form)`
  width: 100%;
  margin-top: 10;
`;

export const ButtonContainer = styled.View`
  width: 100%;
  align-items: center;
  padding: 15px 0;
`;
