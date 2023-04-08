import React from 'react';
import {FlatList, View} from 'react-native';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';

import categoryColors from '@/assets/categoryColors';
import {Text, Button} from '@/modules/shared/components';
import {useTranslation} from '@/modules/shared/hooks';
import CategoryColorBoxButton from './components/CategoryColorBoxButton';
import {TEST_IDS} from '@/modules/shared/constants/testIds';

interface Props {
  isVisible: boolean;
  onBackButtonPress(): void;
  onColorPress(colorIndex: number): void;
}

const Container = styled.View`
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
`;

const ChooseCategoryColorModal: React.FC<Props> = ({
  isVisible,
  onBackButtonPress,
  onColorPress,
}) => {
  const {translation} = useTranslation();

  return (
    <Modal isVisible={isVisible} onBackButtonPress={onBackButtonPress}>
      <Container testID={TEST_IDS.CHOOSE_CATEGORY_COLOR_MODAL_CONTAINER}>
        <Text
          type="title-big"
          primaryColor
          style={{alignSelf: 'center', marginTop: 5, marginBottom: 10}}>
          {translation('SELECT_COLOR')}
        </Text>
        <FlatList
          data={categoryColors}
          numColumns={5}
          keyExtractor={(item, index) =>
            `${item.color1}-${item.color2}-${index}`
          }
          renderItem={({item, index}) => (
            <View style={{flex: 0.2, alignItems: 'center', marginVertical: 5}}>
              <CategoryColorBoxButton
                testID={TEST_IDS.CATEGORY_COLOR_BOX_BUTTON(index)}
                color1={item.color1}
                color2={item.color2}
                onColorPress={() => onColorPress(index)}
              />
            </View>
          )}
        />
        <Button onPress={onBackButtonPress}>
          <Text
            testID={TEST_IDS.CHOOSE_CATEGORY_COLOR_MODAL_CANCEL_BUTTON}
            type="title-big"
            secondaryColor
            style={{alignSelf: 'center', marginTop: 5, paddingVertical: 10}}>
            {translation('CANCEL')}
          </Text>
        </Button>
      </Container>
    </Modal>
  );
};

export default ChooseCategoryColorModal;
