import React from 'react';
import styled from 'styled-components/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';

import categoryIconNames from '@/assets/categoryIconNames';
import {Text, Button} from '@/modules/shared/components';

import {useTranslation} from '@/modules/shared/hooks';
import {FlatList, View} from 'react-native';
import {TEST_IDS} from '@/modules/shared/constants/testIds';

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

  return (
    <Modal isVisible={isVisible} onBackButtonPress={onBackButtonPress}>
      <Container testID={TEST_IDS.CHOOSE_CATEGORY_ICON_MODAL_CONTAINER}>
        <Title type="title-big" primaryColor>
          {translation('SELECT_ICON')}
        </Title>
        <FlatList
          numColumns={5}
          data={categoryIconNames}
          renderItem={({item: categoryIconName, index}) => (
            <View style={{flex: 0.2, alignItems: 'center'}}>
              <IconButton
                testID={TEST_IDS.CHOOSE_CATEGORY_ICON_MODAL_ICON_BUTTON(index)}
                key={categoryIconName}
                onPress={() => onIconPress(index)}>
                <FontAwesomeIcon name={categoryIconName} size={25} />
              </IconButton>
            </View>
          )}
        />
        <Button
          testID={TEST_IDS.CHOOSE_CATEGORY_ICON_MODAL_CANCEL_BUTTON}
          onPress={onBackButtonPress}>
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
