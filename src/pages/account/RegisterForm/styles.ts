import {StyleSheet, Dimensions} from 'react-native';

const width = Dimensions.get('window').width;

export default StyleSheet.create({
  background: {
    width: width + 80,
    height: '100%',
    borderTopRightRadius: 600,
    borderColor: 'red',
  },
  container: {
    marginTop: 100,
    width,
    paddingBottom: 120,
  },
  content: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 30,
    paddingBottom: 10,
    elevation: 2,
    zIndex: 2,
    marginTop: -23,
  },
  title: {
    alignSelf: 'center',
    marginTop: 14,
    color: '#1fb7c8',
    fontSize: 18,
  },
  formWrapper: {
    paddingTop: 10,
    paddingHorizontal: 10,
    flex: 1,
  },
  checkBoxItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -5,
    flexGrow: 1,
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },
  checkBoxText: {
    flex: 1,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 10,
  },
  alreadyHaveAccountText: {
    marginTop: 5,
  },
  checkedImage: {
    position: 'absolute',
    top: 110,
    left: 0,
    tintColor: '#FFF',
    width: 80,
  },
  pizzaGraphImage: {
    position: 'absolute',
    top: 100,
    right: 0,
    width: 100,
    height: 100,
  },
  gearImage: {
    position: 'absolute',
    bottom: 0,
    left: -120,
    width: 250,
  },
  graphImage: {
    position: 'absolute',
    bottom: 10,
    right: 90,
    width: 150,
  },
  advanceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 150,
    height: 150,
    paddingTop: 52,
  },
  advanceButtonContainer: {
    position: 'absolute',
    bottom: -20,
    zIndex: 3,
  },
  personSeatedImage: {alignSelf: 'center'},
  scroll: {flexGrow: 1},
});
