import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CheckCircle2, ArrowRight, X } from 'lucide-react-native';
import { useCart } from '../context/CartContext';

const GlobalCartToast = () => {
  const navigation = useNavigation();
  const { toastMessage, hideToast } = useCart();

  if (!toastMessage) return null;

  return (
    <View style={styles.toastContainer} pointerEvents="box-none">
      <View style={styles.toastCard}>
        <View style={styles.toastIconCircle}>
          <CheckCircle2 size={16} color="#16A34A" />
        </View>

        <Text style={styles.toastMessage} numberOfLines={2}>
          {toastMessage}
        </Text>

        <TouchableOpacity
          style={styles.viewCartBtn}
          onPress={() => {
            hideToast();
            navigation.navigate('Cart');
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.viewCartText}>View Cart</Text>
          <ArrowRight size={13} color="#38BDF8" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.closeBtn}
          onPress={hideToast}
          activeOpacity={0.7}
        >
          <X size={14} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 55,
    left: 14,
    right: 14,
    zIndex: 9999,
    alignItems: 'center',
  },
  toastCard: {
    backgroundColor: '#0F172A',
    borderRadius: 24,
    paddingVertical: 9,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 10,
    width: '100%',
  },
  toastIconCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastMessage: {
    flex: 1,
    color: '#F8FAFC',
    fontSize: 12,
    fontWeight: '700',
  },
  viewCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
    borderWidth: 0.5,
    borderColor: '#38BDF8',
  },
  viewCartText: {
    color: '#38BDF8',
    fontSize: 11,
    fontWeight: '800',
  },
  closeBtn: {
    padding: 3,
  },
});

export default GlobalCartToast;
