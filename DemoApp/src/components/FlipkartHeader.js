
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';

import {
  ShoppingCart,
  Bell,
  Search,
  Camera,
  Mic,Heart
} from 'lucide-react-native';

const  FlipkartHeader = () => {
  const navigation = useNavigation();
  const { totalItemCount: cartCount } = useCart();

  return (
    <View style={styles.container}>

      {/* Top Brand & Actions Bar */}
      <View style={styles.topRow}>

        <View style={styles.brandContainer}>
          <Text style={styles.brandTitle}>
            ShopZ <Text style={styles.plusText}>Plus</Text>
          </Text>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionIconButton}
            activeOpacity={0.7}
            accessibilityLabel="Notifications"
          >
            <Heart size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionIconButton}
            activeOpacity={0.7}
            accessibilityLabel="Notifications"
          >
            <Bell size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionIconButton}
            activeOpacity={0.7}
            accessibilityLabel="Cart"
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            onPress={() => navigation.navigate('Cart')}
          >
            <ShoppingCart size={24} color="#FFFFFF" />

            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>
                  {cartCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>

        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>

        <Search size={22} color="#000000" />

        <TextInput
          style={styles.searchPlaceholder}
          placeholder="Search for Products, Brands and More"
        />

        <View style={styles.searchRightIcons}>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.searchToolButton}
          >
            <Mic size={22} color="#000000" />
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.searchToolButton}
          >
            <Camera size={22} color="#000000" />
          </TouchableOpacity>

        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
    marginRight:1,
    marginLeft:1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    borderRadius: 10,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  brandContainer: {
    flexDirection: 'column',
  },

  brandTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.3,
  },

  plusText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    fontStyle: 'italic',
  },

  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  actionIconButton: {
    marginLeft: 8,
    position: 'relative',
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -6,
    backgroundColor: '#FFFFFF',
    borderRadius: 9,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },

  cartBadgeText: {
    color: '#000000',
    fontSize: 9.5,
    fontWeight: '900',
  },

  searchBar: {
    backgroundColor: '#FFFFFF',
    borderRadius: 9,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 3,
    gap: 8,
  },

  searchPlaceholder: {
    color: '#666666',
    fontSize: 12.5,
    flex: 1,
  },

  searchRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  searchToolButton: {
    padding: 2,
  },

});

export default FlipkartHeader;
