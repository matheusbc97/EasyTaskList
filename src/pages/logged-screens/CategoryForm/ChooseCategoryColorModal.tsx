import React, {useCallback} from 'react';
import {View, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

import Modal from 'react-native-modal';
import categoryColors from '@assets/categoryColors';
import {Text} from '@shared/components';
import LinearGradient from 'react-native-linear-gradient';

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
  const getColors = useCallback(() => {
    const components: any[] = [];

    for (let index = 0; index < categoryColors.length; index += 5) {
      const subComponents: any[] = [];

      for (let j = 0; j < 5; j++) {
        if (index + j < categoryColors.length) {
          subComponents.push(
            <TouchableOpacity
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
                colors={[
                  categoryColors[index + j].color1,
                  categoryColors[index + j].color2,
                ]}
              />
            </TouchableOpacity>,
          );
        }
      }

      components.push(
        <View
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
          Selecionar Cor
        </Text>
        {getColors()}
      </Container>
    </Modal>
  );
};

export default ChooseCategoryColorModal;
