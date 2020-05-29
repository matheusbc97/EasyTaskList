import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '85%',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 1.5,
    zIndex: 3,
    height: 350,
  },
  imageMarkedList: {
    position: 'absolute',
    top: 35,
    left: 20,
    width: 125,
    height: 110,
  },
  imageCalendar: {
    position: 'absolute',
    top: -10,
    right: -12,
    width: 90,
    height: 110,
  },
  footerImagesContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  imageLeftStripes: {
    width: 15,
    height: 136,
    marginHorizontal: 5,
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  imageGraph2: {
    width: 100,
    height: 80,
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  imageRocket: {
    width: 90,
    height: 110,
    marginBottom: 45,
  },
  imageBottomRightDots: {
    width: 40,
    height: 40,
    alignSelf: 'flex-end',
    margin: 10,
  },
});
