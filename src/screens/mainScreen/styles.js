import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: COLORS.primary1,
  },
  headerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.primary2,
    height: 60,
    transform: [
      {
        translateY: -145,
      },
    ],
  },
  textButtonStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  listContainer: {
    width: '100%',
    height: '60%',

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
