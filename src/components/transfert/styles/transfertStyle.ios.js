import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 100,
  },
  content: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  padNumber: {
    flex: 1,
    top: -38,
  },
  button: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    position: 'relative',
    top: -42,
    left: 28,
  },
});
