import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F81C55',
  },
  separator: {
    height: 2,
    width: 60,
    marginTop: 10,
    backgroundColor: '#FFF',
  },
  subtitle: {
    width: 220,
    textAlign: 'center',
  },
  textColor: {
    color: '#FFF',
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  body: {
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#FFF',
    width: '100%',
    height: 42,
  },
  buttonText: {
    color: '#F81C55',
    fontSize: 20,
  },
  buttonInverted: {
    backgroundColor: '#d31446',
    width: '100%',
    borderWidth: 2,
    borderColor: '#FFF',
    marginTop: 5,
    height: 40,
  },
  buttonInvertedText: {
    color: '#FFF',
    fontSize: 20,
  },
  actionsContainer: {
    marginTop: 40,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  notHaveAccountText: {
    marginTop: 15,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBackgroundImage: {
    opacity: 0.2,
  },
});
