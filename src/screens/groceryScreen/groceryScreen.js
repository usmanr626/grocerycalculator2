import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native';
import styles from './styles';
import {TextButton} from '../../components/textButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

let dummyData = [
  {
    date: '',
    product: '',
    price: 0,
  },
];

const GroceryScreen = ({navigation}) => {
  console.log('Screen Rendered');

  var date = new Date().getDate();
  var month = new Date().getMonth() + 1;
  var year = new Date().getFullYear();
  const currentDate = `${date}/${month}/${year}`;
  // console.warn(currentDate);
  const [products, setProducts] = React.useState([]);
  const [product, setProduct] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [copyData, setCopyData] = React.useState(null);
  const [total, setTotal] = React.useState(0);

  React.useEffect(() => {
    const getTotal = async () => {
      try {
        const storedTotal = await AsyncStorage.getItem('total');
        setTotal(Number(storedTotal));
      } catch (error) {
        console.error(error);
      }
    };

    getTotal(); // Get the total from async storage
  }, []);

  React.useEffect(() => {
    const getStoredProducts = async () => {
      try {
        const storedProducts =
          JSON.parse(await AsyncStorage.getItem('products')) || [];
        setProducts(storedProducts);
      } catch (error) {
        console.error(error);
      }
    };

    getStoredProducts();

    try {
      const total = AsyncStorage.getItem('total');
      console.log('ITEM Get:', total.toString());
    } catch (error) {
      console.error(error);
    }
  }, []);
  // const getTotal = async () => {
  //   try {
  //     const total = await AsyncStorage.getItem("total");
  //     return total;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const renderHeader = () => {
    return (
      <View style={styles.headerStyle}>
        <Text>Grocery List</Text>
      </View>
    );
  };

  const renderGroceryList = () => {
    return (
      <View style={styles.groceryListContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '100%',
            marginTop: 10,
          }}>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>DATE</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>PRODUCT</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>PRICE</Text>
        </View>
        <FlatList
          data={products}
          style={{width: '100%', marginTop: 10}}
          // key={`item`}
          ListHeaderComponent={() => {
            //View to set in Header
            return (
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-around',
                  marginBottom: 10,
                  alignItems: 'center',
                }}></View>
            );
          }}
          renderItem={({item}) => {
            return (
              <Pressable
                onLongPress={() =>
                  Alert.alert('Delete Item', item.product, [
                    {
                      text: 'Delete',
                      onPress: async () => {
                        // try {
                        //   await AsyncStorage.removeItem('products');
                        //   return true;
                        // } catch (exception) {
                        //   return false;
                        // }
                        deleteLastEntry();
                      },
                      style: 'destructive',

                      //Async Remove from list and total
                    },
                    {
                      text: 'cancel',
                      onPress: () => console.log('Cancelled'),
                      style: 'cancel',
                    },
                  ])
                }
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  paddingBottom: 5,
                  backgroundColor: 'orange',
                  height: 50,
                }}>
                <Text>{item.date}</Text>
                <Text style={{width: 150}}>{item.product}</Text>
                <Text>{item.price}</Text>
              </Pressable>
            );
          }}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  height: 2,
                  width: '100%',
                }}></View>
            );
          }}
        />
      </View>
    );
  };
  useEffect(() => {
    console.log('current TOTAL before Set State is: ', total);
    setTotal(total);
    console.log('current TOTAL after Set State is: ', total);
    saveTotal(total);
  }, [total]);
  const saveTotal = async total => {
    console.log('Save Total Called');
    try {
      await AsyncStorage.setItem('total', total.toString());
      console.log('Total saved', total);
    } catch (error) {
      console.error(error);
    }
  };
  const addToList = async () => {
    // console.log("Data to be added is: ", currentDate, product, price);
    const newProduct = {
      date: currentDate,
      product: product,
      price: price,
    };
    if (!product) {
      Alert.alert('Please Enter Product');
    } else if (!price) {
      Alert.alert('Please Enter Price');
    } else {
      setProducts([...products, newProduct]);
      setProduct('');
      setPrice('');

      const intPrice = parseInt(price, 10);

      setTotal(prevTotal => prevTotal + intPrice);

      try {
        const storedProducts =
          JSON.parse(await AsyncStorage.getItem('products')) || [];
        storedProducts.push(newProduct);
        await AsyncStorage.setItem('products', JSON.stringify(storedProducts));
      } catch (error) {
        console.error(error);
      }
    }
  };
  const deleteLastEntry = async () => {
    const storedProducts =
      JSON.parse(await AsyncStorage.getItem('products')) || [];
    if (storedProducts.length > 0) {
      const lastProduct = storedProducts[storedProducts.length - 1];
      storedProducts.pop(); // remove the last entry
      setProducts(storedProducts);

      let updatedTotal = total - lastProduct.price;
      setTotal(updatedTotal);

      try {
        await AsyncStorage.setItem('products', JSON.stringify(storedProducts));
        await AsyncStorage.setItem('total', updatedTotal.toString());
      } catch (error) {
        console.error(error);
      }
    } else {
      Alert.alert('No items to delete');
    }
  };

  const renderInputContainer = () => {
    return (
      <SafeAreaView style={styles.inputContainerStyle}>
        <Text style={{fontSize: 18}}>Total Dairy Till Now: {total}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
          }}>
          <TextInput
            style={{
              width: 180,
              height: 60,
              backgroundColor: 'white',
              borderRadius: 80,
              paddingHorizontal: 10,
              marginVertical: 20,
            }}
            onChangeText={setProduct}
            value={product}
            placeholder="Product"
          />
          <TextInput
            style={{
              width: 180,
              height: 60,
              backgroundColor: 'white',
              borderRadius: 80,
              paddingHorizontal: 10,
              marginVertical: 20,
            }}
            onChange={event => {
              const newText = event.nativeEvent.text.replace(/[^0-9]/g, '');
              setPrice(newText);
            }}
            value={price}
            placeholder="Price"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.textButtonContainer}>
          <TextButton
            buttonText="Add to List"
            onPress={() => addToList()}></TextButton>
        </View>
      </SafeAreaView>
    );
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Header */}
      {renderHeader()}
      {/* Grocery FlatList */}
      {renderGroceryList()}
      {/* Input Container */}
      {renderInputContainer()}
    </SafeAreaView>
  );
};

export default GroceryScreen;
