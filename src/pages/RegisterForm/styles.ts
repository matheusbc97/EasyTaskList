import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  background: {
    elevation: 3,
    width: width + 80,
    height: '100%',
    borderTopRightRadius: 600,
    borderColor: 'red',
  },
  container: {
    marginTop: 100,
    width,
  },
  content: {
    backgroundColor: '#FFF',
    marginHorizontal: 40,
    borderRadius: 30,
    paddingBottom: 30,
  },
});
