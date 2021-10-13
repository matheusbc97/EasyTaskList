import React, {useCallback} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';

import categoryColors from '@assets/categoryColors';
import {Text, Button} from '@shared/components';
import {useTranslation} from '@/shared/hooks';

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

  const getColors = useCallback(() => {
    const components: any[] = [];

    for (let index = 0; index < categoryColors.length; index += 5) {
      const subComponents: any[] = [];

      for (let j = 0; j < 5; j++) {
        if (index + j < categoryColors.length) {
          const color1 = categoryColors[index + j].color1;
          const color2 = categoryColors[index + j].color2;
          subComponents.push(
            <Button
              key={`${color1}-${color2}`}
              onPress={() => {
                onColorPress(index + j);
              }}
              style={{elevation: 5}}
              //key={index}
            >
              <LinearGradient
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: 4,
                  borderColor: '#e0e0e0',
                  borderWidth: 1,
                }}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                colors={[color1, color2]}
              />
            </Button>,
          );
        }
      }

      components.push(
        <View
          key={`row-category-color-${index}`}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 5,
          }}>
          {subComponents}
        </View>,
      );
    }

    return components;
  }, [onColorPress]);

  return (
    <Modal isVisible={isVisible} onBackButtonPress={onBackButtonPress}>
      <Container>
        <Text
          type="title-big"
          primaryColor
          style={{alignSelf: 'center', marginTop: 5, marginBottom: 10}}>
          {translation('SELECT_COLOR')}
        </Text>
        {getColors()}
        <Button onPress={onBackButtonPress}>
          <Text
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
