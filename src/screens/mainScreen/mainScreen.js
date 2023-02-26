import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import styles from './styles';
import {TextButton} from '../../components/textButton';

const MainScreen = ({navigation}) => {
  const renderHeader = () => {
    return (
      <View style={styles.headerStyle}>
        <Text>Grocery Calculator App</Text>
      </View>
    );
  };
  const renderTextButtons = () => {
    return (
      // <>
      //   <View style={styles.textButtonStyle}>
      // <TextButton
      //   buttonText="Grocery"
      //   onPress={() => navigation.navigate('GroceryScreen')}></TextButton>
      // <TextButton
      //   buttonText="Dairy"
      //   onPress={() => navigation.navigate('DairyScreen')}></TextButton>
      //   </View>

      // <TextButton
      //   buttonText="Total"
      //   onPress={() => navigation.navigate('TotalScreen')}
      // />
      // </>

      <View style={styles.textButtonStyle}>
        <TextButton
          buttonText="Grocery"
          onPress={() => navigation.navigate('GroceryScreen')}></TextButton>
        <View style={styles.separator}></View>
        <TextButton
          buttonText="Dairy"
          onPress={() => navigation.navigate('DairyScreen')}></TextButton>
        <View style={styles.separator}></View>
        <TextButton
          buttonText="Personal"
          onPress={() => navigation.navigate('PersonalScreen')}></TextButton>
        <View style={styles.separator}></View>
        <TextButton
          buttonText="Total"
          onPress={() => navigation.navigate('TotalScreen')}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Header */}
      {renderHeader()}
      {/* Text Buttons */}
      {renderTextButtons()}
    </SafeAreaView>
  );
};
export default MainScreen;
