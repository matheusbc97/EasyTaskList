import React from 'react'
import { View } from 'react-native'
import {TouchableRipple} from 'react-native-paper';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {useSelector} from 'react-redux'

import Text from './Text';
import categoryColors from '../../assets/categoryColors';
import {selectAppTheme} from '../../store/configs'

interface Props {
  text: string;
  onPress?(): void;
  iconName: string;
}


const OutlineButton: React.FC<Props> = ({
  text = 'Atividades Fisícas',
  onPress,
  iconName,
}) => {
  const appTheme = useSelector(selectAppTheme);

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
            borderWidth: 1,
            flex: 1,
            height: 49.5,
            borderColor: appTheme.secondaryColor,
            borderTopStartRadius: 25,
            borderBottomStartRadius: 25,
            paddingHorizontal: 5,
            justifyContent:'center',
            alignItems:'center',
          }}>
          <Text type="title-medium" style={{padding: 5}}>
            {text}
          </Text>
        </View>
        <View
          style={{
            width: 50,
            height: '100%',
            borderTopRightRadius: 25,
            borderBottomRightRadius: 25,
            backgroundColor: appTheme.secondaryColor,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: -2,
          }}>
          <FontAwesomeIcon
            name={iconName}
            size={25}
            color="#FFF"
            style={{marginRight: 5}}
          />
        </View>
    </View>
  </TouchableRipple>
  )
}

export default OutlineButton;
