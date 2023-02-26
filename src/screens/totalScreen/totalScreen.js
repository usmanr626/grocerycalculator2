import React, {useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextButton} from '../../components/textButton';
import PDFLib, {PDFDocument, PDFPage} from 'react-native-pdf-lib';
import RNPDF from 'react-native-pdf-lib';
import {Buffer} from 'buffer';
import {COLORS} from '../../constants/theme';

const TotalScreen = ({navigation}) => {
  const [dairyTotal, setDairyTotal] = useState('');
  const [groceryTotal, setGroceryTotal] = useState('');
  const [subTotal, setsubTotal] = useState('');

  useEffect(() => {
    const getDairyTotal = async () => {
      try {
        const storedTotal = await AsyncStorage.getItem('totalDairy');
        setDairyTotal(Number(storedTotal));
      } catch (error) {
        console.error(error);
      }
    };

    getDairyTotal();
  }, []);

  React.useEffect(() => {
    const getGroceryTotal = async () => {
      try {
        const storedTotal = await AsyncStorage.getItem('total');
        setGroceryTotal(Number(storedTotal));
      } catch (error) {
        console.error(error);
      }
    };

    getGroceryTotal(); // Get the total from async storage
  }, []);

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text>TOTAL SCREEN</Text>
      </View>
    );
  };

  const resetData = async () => {
    try {
      await AsyncStorage.removeItem('totalDairy');
      await AsyncStorage.removeItem('productsDairy');
      await AsyncStorage.removeItem('products');
      await AsyncStorage.removeItem('total');
      setDairyTotal('');
      setGroceryTotal('');
      setsubTotal('');
      return true;
    } catch (exception) {
      return false;
    }
  };

  const convertToPdf = async () => {
    // Create a PDF page with text and images
    const path = RNPDF;
    const options = {
      path: `${path}/example.pdf`,
      buffer: `${Buffer.from('Hello World!')}`,
    };
    await RNPDF.create(options);
  };

  const renderTotalList = () => {
    return (
      <>
        <View style={styles.totalListStyle}>
          <View
            style={{
              width: '100%',
              height: 80,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.primary2,
              marginBottom: 2,
            }}>
            <Text style={{fontSize: 18, fontWeight: '700'}}>
              TOTAL FOR THIS MONTH IS:
              <Text style={{fontSize: 20}}> {groceryTotal + dairyTotal}</Text>
            </Text>
          </View>

          <View
            style={{
              width: '100%',
              height: 80,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.primary2,
              marginBottom: 2,
            }}>
            <Text style={{fontSize: 18, fontWeight: '700'}}>
              Dairy:
              <Text style={{fontSize: 20}}> {dairyTotal}</Text>
            </Text>
          </View>

          <View
            style={{
              width: '100%',
              height: 80,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: COLORS.primary2,
              marginBottom: 2,
            }}>
            <Text style={{fontSize: 18, fontWeight: '700'}}>
              Grocery:
              <Text style={{fontSize: 20}}> {groceryTotal}</Text>
            </Text>
          </View>
        </View>
        <View style={styles.totalTextStyle}>
          <TextButton
            buttonText="Reset"
            onPress={() =>
              Alert.alert('Reset Data?', 'All Data will be Lost', [
                {
                  text: 'Cancel',

                  style: 'destructive',
                },
                {text: 'OK', onPress: () => resetData()},
              ])
            }
          />
          {/* <TextButton
            buttonText="PDF"
            onPress={() =>
              Alert.alert('Convert to PDf?', 's', [
                {
                  text: 'Cancel',

                  style: 'destructive',
                },
                {text: 'OK', onPress: () => convertToPdf()},
              ])
            }
          /> */}
        </View>
      </>
    );
  };
  return (
    <View style={styles.mainContainer}>
      {renderHeader()}
      {renderTotalList()}
    </View>
  );
};
export default TotalScreen;
