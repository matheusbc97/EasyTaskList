import styled from 'styled-components/native';
import {FlatListWithFetchIndicator} from '@/modules/shared/components';

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
