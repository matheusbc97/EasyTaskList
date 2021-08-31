import {css} from 'styled-components/native';

export const shadow = {
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.2,
  shadowRadius: 1.41,
};

export const shadowStyledComponents = css`
  elevation: 2;
  shadow-color: #000;
  shadow-offset: 0px 1px;
  shadow-opacity: 0.2px;
  shadow-radius: 2px;
`;
