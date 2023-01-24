import React, {useCallback} from 'react';
import styled from 'styled-components/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';

import categoryIconNames from '@/assets/categoryIconNames';
import {Text, Button} from '@/shared/components';

import {useTranslation} from '@/shared/hooks';

const Title = styled(Text)`
  align-self: center;
  margin: 10px 0 10px;
`;

const Container = styled.View`
  background-color: #fafafa;
  border-radius: 2px;
  padding: 5px 5px;
`;

const IconButton = styled(Button)`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 0 5px;
`;

interface Props {
  isVisible: boolean;
  onIconPress(iconIndex: number): void;
  onBackButtonPress(): void;
}

const ChooseCategoryIconModal: React.FC<Props> = ({
  isVisible,
  onIconPress,
  onBackButtonPress,
}) => {
  const {translation} = useTranslation();

  const getIcons = useCallback(() => {
    const components: any[] = [];

    for (let index = 0; index < categoryIconNames.length; index += 5) {
      const subComponents: any[] = [];

      for (let j = 0; j < 5; j++) {
        if (index + j < categoryIconNames.length) {
          const categoryName = categoryIconNames[index + j];
          subComponents.push(
            <IconButton
              key={categoryName}
              onPress={() => {
                onIconPress(index + j);
              }}>
              <FontAwesomeIcon name={categoryName} size={25} />
            </IconButton>,
          );
        }
      }

      components.push(<Row key={`icon-row-${index}`}>{subComponents}</Row>);
    }

    return components;
  }, [onIconPress]);

  return (
    <Modal isVisible={isVisible} onBackButtonPress={onBackButtonPress}>
      <Container>
        <Title type="title-big" primaryColor>
          {translation('SELECT_ICON')}
        </Title>
        {getIcons()}
        <Button onPress={onBackButtonPress}>
          <Text
            type="title-big"
            secondaryColor
            style={{alignSelf: 'center', paddingVertical: 10}}>
            {translation('CANCEL')}
          </Text>
        </Button>
      </Container>
    </Modal>
  );
};

export default ChooseCategoryIconModal;
