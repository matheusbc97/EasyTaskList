import {View} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {useAppTheme} from '@/shared/hooks';

import Text from '../../Text';
import {HeaderProps} from '../types/HeaderProps';

function SecondaryHeader({
  title,
  style,
  textStyle,
  onBackPress,
}: Omit<HeaderProps, 'type'>) {
  const appTheme = useAppTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 10,
        paddingHorizontal: 5,
        ...style,
      }}>
      <View style={{flex: 1}}>
        <MaterialIcon
          name="arrow-back"
          size={30}
          color={appTheme.primaryColor}
          style={{marginRight: 10}}
          onPress={onBackPress}
        />
      </View>
      <Text type="title-big" primaryColor style={textStyle}>
        {title}
      </Text>
      <View style={{flex: 1}} />
    </View>
  );
}
export default SecondaryHeader;
