import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage,
  Alert
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import SummaryItem from '../../components/summary/SummaryItem';

import * as productsActions from '../../store/actions/summary';
import Colors from '../../constants/Colors';


const GetUser = props => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const Try = async () => {
      const userData = await AsyncStorage.getItem('userData');
    
      const transformedData = JSON.parse(userData);
      const {userId,uname} = transformedData;

      //console.log(uname);
    //console.log(userId);
     // window.alert("Hi, " +uname+" ,\n start to explore & share book summaries on mobile application platform too");

      Alert.alert(
        'Welcome To Bookmin Mobile ',
        `Hi, ${uname} you can now start to explore & share book summaries on mobile more quickly and easily`,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
    };

    Try();
  }, [dispatch]);


};


const SummaryOverviewScreen = props => {

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();
  GetUser();


  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      dispatch(productsActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener(
      'willFocus',
      loadProducts
    );

    return () => {
      willFocusSub.remove();
    };
  }, [loadProducts]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('SummaryDetailScreen', {
      productId: id,
      productTitle: title
    });
  };



  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred check your code @ SummaryOverviewScreen!</Text>
        <Button
          title="Try again"
          onPress={loadProducts}
          color={Colors.primary}
        />
      </View>
    );
  }

 


  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <SummaryItem
          image='https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Legal_pad_and_pencil.jpg/800px-Legal_pad_and_pencil.jpg'
          title={itemData.item.title}
          description={itemData.item.description}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
        </SummaryItem>
      )}
    />
  );
};



SummaryOverviewScreen.navigationOptions = navData => {


  return {
    headerTitle:'Explore Summaries',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
/*     headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Orders');
          }}
        />
      </HeaderButtons>
    ) */
  };
};
const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default SummaryOverviewScreen;
