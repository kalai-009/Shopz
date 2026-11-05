import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import BottomTab from './src/components/BottomTab';
import { CartProvider } from './src/context/CartContext';
import GlobalCartToast from './src/components/GlobalCartToast';

function MainApp() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />
      <GlobalCartToast />
      <BottomTab />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <CartProvider>
          <MainApp />
        </CartProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'orange',
  },
});
