import React from 'react';
import styled from 'styled-components/native';

import Section from '@/shared/components/Section';

const Content = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

const SectionRowButtonsContainer: React.FC = ({children}) => {
  return (
    <Section style={{marginTop: 5}} contentStyle={{paddingTop: 0}}>
      <Content>{children}</Content>
    </Section>
  );
};

export default SectionRowButtonsContainer;
