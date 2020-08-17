import React, {useCallback} from 'react';
import {View, TouchableOpacity} from 'react-native';

import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import Modal from 'react-native-modal';
import categoryIconNames from '@assets/categoryIconNames';

interface Props {
  isVisible: boolean;
  onIconPress(iconIndex: number): void;
}

const ChooseCategoryIconModal: React.FC<Props> = ({isVisible, onIconPress}) => {
  const getIcons = useCallback(() => {
    const components: any[] = [];

    for (let index = 0; index < categoryIconNames.length; index += 5) {
      const subComponents: any[] = [];

      for (let j = 0; j < 5; j++) {
        if (index + j < categoryIconNames.length) {
          subComponents.push(
            <TouchableOpacity
              onPress={() => {
                onIconPress(index + j);
              }}
              style={{
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              //key={index}
            >
              <FontAwesomeIcon name={categoryIconNames[index + j]} size={25} />
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
  }, [onIconPress]);

  return (
    <Modal isVisible={isVisible}>
      <View style={{backgroundColor: '#fafafa', borderRadius: 2}}>
        {getIcons()}
      </View>
    </Modal>
  );
};

export default ChooseCategoryIconModal;
