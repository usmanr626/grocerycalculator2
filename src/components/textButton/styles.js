import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import {COLORS} from '../../constants/theme';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  buttonContaier: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.15,
    backgroundColor: COLORS.white,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
