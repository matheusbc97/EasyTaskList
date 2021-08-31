import {StyleSheet} from 'react-native';
import {shadow} from '@/shared/styles';

export default StyleSheet.create({
  header: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: '#FFF',
    elevation: 3,
    borderBottomEndRadius: 33,
    borderBottomStartRadius: 33,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
    ...shadow,
  },
  headerContent: {marginLeft: 15},
  contentWrapper: {
    marginHorizontal: 10,
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 2,
    ...shadow,
  },
  title: {marginHorizontal: 20, marginTop: 30},
});
