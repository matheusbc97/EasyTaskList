import React, {memo} from 'react';
import styled from 'styled-components/native';

import {Text} from '@/modules/shared/components';
import {AboutItem} from '@/modules/shared/models';

const Container = styled.View`
  padding: 10px;
  flex-direction: row;
`;

interface ContentProps {
  paddingLeft: number;
  paddingRight: number;
}

const Content = styled.View<ContentProps>`
  padding-left: ${props => props.paddingLeft}px;
  padding-right: ${props => props.paddingRight}px;
  margin-top: -2px;
  flex: 1;
`;

const ImageCircle = styled.View`
  width: 55px;
  height: 55px;
  background-color: red;
  border-radius: 28px;
`;

interface Props {
  item: AboutItem;
  index: number;
}

interface AboutListItemContentProps {
  item: AboutItem;
  paddingLeft: number;
  paddingRight: number;
}

const AboutListItemContent = ({
  paddingLeft,
  paddingRight,
  item,
}: AboutListItemContentProps) => {
  return (
    <Content paddingLeft={paddingLeft} paddingRight={paddingRight}>
      <Text type="title">{item.title}</Text>
      <Text>{item.text}</Text>
    </Content>
  );
};

const AboutListItem: React.FC<Props> = ({item, index}) => {
  const getContent = () => {
    if (index % 2 === 0) {
      return (
        <>
          <ImageCircle />
          <AboutListItemContent paddingLeft={15} paddingRight={6} item={item} />
        </>
      );
    }

    return (
      <>
        <AboutListItemContent item={item} paddingLeft={6} paddingRight={15} />
        <ImageCircle />
      </>
    );
  };

  return <Container>{getContent()}</Container>;
};

export default memo(AboutListItem);
