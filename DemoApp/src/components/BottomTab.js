import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  Home,
  Grid2x2,
  ShoppingCart,
  UserRound,
} from 'lucide-react-native';

import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import CartScreen from '../screens/CartScreen';
import AccountScreen from '../screens/AccountScreen';
import { useCart } from '../context/CartContext';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
  const { totalItemCount } = useCart();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#888',

        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
        },

        tabBarIcon: ({ color, size }) => {
          let Icon;

          if (route.name === 'Home') {
            Icon = Home;
          } else if (route.name === 'Category') {
            Icon = Grid2x2;
          } else if (route.name === 'Cart') {
            Icon = ShoppingCart;
          } else if (route.name === 'Account') {
            Icon = UserRound;
          }

          return <Icon size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Category" component={CategoryScreen} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarBadge: totalItemCount > 0 ? totalItemCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: '#2563EB',
            color: '#FFFFFF',
            fontSize: 10,
            fontWeight: '800',
            minWidth: 18,
            height: 18,
            borderRadius: 9,
          },
        }}
      />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
};

export default BottomTab;
