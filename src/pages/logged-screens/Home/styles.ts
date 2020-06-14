import {StyleSheet} from 'react-native';

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
  },
  title: {marginHorizontal: 20, marginTop: 30},
  cartegoryListItem: {
    height: 120,
    width: 120,
    //backgroundColor: '#34cbb6',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    marginVertical: 10,
    borderRadius: 10,
  },
});
