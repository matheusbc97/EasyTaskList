import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styled from 'styled-components/native';

import {shadowStyledComponents} from '@/modules/shared/styles';

import Text from '../../Text';
import {useAppTheme} from '../../../hooks';
import {HeaderProps} from '../types/HeaderProps';
import {TEST_IDS} from '@/modules/shared/constants/testIds';

interface ContainerProps {
  backgroundColor: string;
}

const Container = styled.View<ContainerProps>`
  background-color: ${props => props.backgroundColor};
  elevation: 3;
  padding: 20px 20px 15px 35px;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  margin: 0 5px 0 5px;
  flex-direction: row;
  ${shadowStyledComponents};
`;

function PrimaryHeader({
  title,
  style,
  textStyle,
  onBackPress,
}: Omit<HeaderProps, 'type'>) {
  const appTheme = useAppTheme();

  return (
    <Container
      testID={TEST_IDS.PRIMARY_HEADER_CONTAINER}
      backgroundColor={appTheme.aboveBackground}
      style={style}>
      <MaterialIcon
        name="arrow-back"
        size={30}
        color={appTheme.textColor}
        style={{marginRight: 10}}
        onPress={onBackPress}
        testID={TEST_IDS.PRIMARY_HEADER_BACK_BUTTON}
      />
      <Text type="title-big" style={textStyle}>
        {title}
      </Text>
    </Container>
  );
}

export default PrimaryHeader;
