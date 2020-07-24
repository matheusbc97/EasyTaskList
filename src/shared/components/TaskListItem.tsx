import React from 'react';
import {View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';

import {Text} from '.';
import categoryColors from '../../assets/categoryColors';

interface Props {
  colorIndex: number;
  name: string;
  onPress?(): void;
}

const TaskListItem: React.FC<Props> = ({
  colorIndex = 1,
  name = 'Atividades Fisícas',
  onPress,
}) => {
  return (
    <TouchableRipple
      onPress={onPress}
      style={{
        height: 50,
        backgroundColor: '#FFF',
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 50,
            height: '100%',
            borderTopLeftRadius: 25,
            borderBottomLeftRadius: 25,
            backgroundColor: categoryColors[colorIndex].color1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesomeIcon
            name="users"
            size={25}
            color="#FFF"
            style={{marginLeft: 5}}
          />
        </View>

        <View
          style={{
            borderWidth: 1,
            flex: 1,
            height: 49.5,
            borderColor: categoryColors[colorIndex].color1,
            borderTopEndRadius: 25,
            borderBottomEndRadius: 25,
            paddingHorizontal: 5,
          }}>
          <Text type="title" style={{padding: 5}}>
            {name}
          </Text>
        </View>
      </View>
    </TouchableRipple>
  );
};

export default TaskListItem;
