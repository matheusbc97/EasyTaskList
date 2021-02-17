import React, {memo, useMemo} from 'react';
import styled from 'styled-components/native';

import {Text} from '@shared/components';
import {AboutItem} from '@shared/models';

const Container = styled.View`
  padding: 20px;
  flex-direction: row;
`;

interface ContentProps {
  paddingLeft: string;
  paddingRight: string;
}

const Content = styled.View<ContentProps>`
  padding-left: ${(props) => props.paddingLeft};
  padding-right: ${(props) => props.paddingRight};
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

const AboutListItem: React.FC<Props> = ({item, index}) => {
  const content = useMemo(() => {
    if (index % 2 === 0) {
      return (
        <>
          <ImageCircle />
          <Content paddingLeft={'15px'} paddingRight={'6px'}>
            <Text type="title">{item.title}</Text>
            <Text>{item.text}</Text>
          </Content>
        </>
      );
    }

    return (
      <>
        <Content paddingLeft={'6px'} paddingRight={'15px'}>
          <Text type="title">{item.title}</Text>
          <Text>{item.text}</Text>
        </Content>
        <ImageCircle />
      </>
    );
  }, [item, index]);

  return <Container>{content}</Container>;
};

export default memo(AboutListItem);
