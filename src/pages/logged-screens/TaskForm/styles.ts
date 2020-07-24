import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  content: {
    paddingVertical: 15,
    backgroundColor: '#FFF',
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderRadius: 30,
    elevation: 3,
  },
  header: {
    paddingBottom: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    marginLeft: -38,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  backButton: {
    alignSelf: 'center',
    width: 100,
  },
  saveButton: {
    alignSelf: 'center',
    marginLeft: 5,
    width: 150,
  },
});
