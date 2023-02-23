import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: COLORS.primary1,
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: COLORS.primary2,
    height: 60,
    transform: [
      {
        translateY: -60,
      },
    ],
  },
  totalListStyle: {
    width: '100%',
    height: '33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalTextStyle: {
    width: '100%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
