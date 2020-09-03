import styled from 'styled-components/native';
import {FlatListWithFetchIndicator} from '@shared/components';
import {Category} from '@shared/models';

interface ContainerProps {
  backgroundColor: string;
}

export const Container = styled.View<ContainerProps>`
  margin: 10px 9px;
  background-color: ${(props) => props.backgroundColor};
  elevation: 3;
  border-radius: 5px;
  flex: 1;
`;

export const SearchInput = styled.TextInput`
  border-bottom-color: #e6e6e6;
  border-bottom-width: 1px;
  margin: 5px 0;
  padding: 8px 15px;
`;

export const SearchList = styled(FlatListWithFetchIndicator)`
  padding: 5px 0;
  height: 600px;
`;
