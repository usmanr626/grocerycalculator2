import {StyleSheet} from 'react-native';
import {COLORS} from '../../constants/theme';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    //justifyContent: "center",
    // alignItems: "center",
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
        translateY: 0,
      },
    ],
  },
  groceryListContainer: {
    width: '100%',
    height: '60%',

    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainerStyle: {
    width: '100%',
    height: '33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
});

export default styles;
