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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  title: {marginHorizontal: 20, marginTop: 30},
});
