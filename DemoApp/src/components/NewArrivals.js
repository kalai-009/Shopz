import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from 'react-native';
import {
  Sparkles,
  ChevronRight,
  Heart,
  Star,
  ShoppingCart,
  Zap,
  Plus,
  Minus,
  Check,
} from 'lucide-react-native';
import { useCart } from '../context/CartContext';

const NEW_ARRIVALS = [
  {
    id: 'na_1',
    name: 'Galaxy S24 Ultra 5G',
    brand: 'Samsung',
    badge: 'NEW LAUNCH',
    rating: 4.9,
    reviews: '3.4k',
    price: '₹1,29,999',
    originalPrice: '₹1,44,999',
    discount: '10% off',
    image: require('../assests/samsung.png'),
    cardBg: 'white',
  },
  {
    id: 'na_2',
    name: 'AirPods Pro (2nd Gen)',
    brand: 'Apple',
    badge: 'HOT DROP',
    rating: 4.8,
    reviews: '8.1k',
    price: '₹20,999',
    originalPrice: '₹24,900',
    discount: '15% off',
    image: require('../assests/airpods.png'),
    cardBg: 'white',
  },
  {
    id: 'na_3',
    name: 'Urban Oversized Hoodie',
    brand: 'Zara Streetwear',
    badge: 'TRENDING',
    rating: 4.6,
    reviews: '1.2k',
    price: '₹2,499',
    originalPrice: '₹4,999',
    discount: '50% off',
    image: require('../assests/hoodie.png'),
    cardBg: 'white',
  },
  {
    id: 'na_4',
    name: 'Ultra Pro Fitness Watch',
    brand: 'Garmin Tech',
    badge: 'LIMITED',
    rating: 4.9,
    reviews: '950',
    price: '₹34,999',
    originalPrice: '₹42,999',
    discount: '18% off',
    image: require('../assests/watch.png'),
    cardBg: 'white',
  },
];

const NewArrivals = () => {
  const { width } = useWindowDimensions();
  const cardWidth = (width - 38) / 2;
  const [wishlist, setWishlist] = useState({});
  const { addToCart, updateQuantity, isInCart, getItemQuantity } = useCart();

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <View style={styles.container}>
      {/* Section Header */}
      <View style={styles.headerRow}>
        <View style={styles.titleContainer}>
          <View style={styles.headerIconCircle}>
            <Sparkles size={16} color="#000000" />
          </View>
          <View>
            <Text style={styles.sectionTitle}>New Arrivals</Text>
            <Text style={styles.sectionSubtitle}>Handpicked latest drops</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.viewAllBtn} activeOpacity={0.7}>
          <Text style={styles.viewAllText}>View All</Text>
          <ChevronRight size={14} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* 2-Column Grid */}
      <View style={styles.grid}>
        {NEW_ARRIVALS.map((item) => {
          const isFavorited = !!wishlist[item.id];

          return (
            <View
              key={item.id}
              style={[styles.productCard, { width: cardWidth }]}
            >
              {/* Product Visual Container */}
              <View
                style={[
                  styles.productImageContainer,
                  { backgroundColor: item.cardBg },
                ]}
              >
                {/* Product Image */}
                <View style={styles.iconCenterWrap}>
                  <Image
                    source={item.image}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                </View>

                {/* Badge */}
                <View style={styles.badgePill}>
                  <Zap size={9} color="#FFD700" />
                  <Text style={styles.badgePillText}>{item.badge}</Text>
                </View>

                {/* Wishlist Button */}
                <TouchableOpacity
                  style={styles.wishlistBtn}
                  activeOpacity={0.8}
                  onPress={() => toggleWishlist(item.id)}
                >
                  <Heart
                    size={15}
                    color={isFavorited ? '#EF4444' : '#FFFFFF'}
                    fill={isFavorited ? '#EF4444' : 'none'}
                  />
                </TouchableOpacity>
              </View>

              {/* Product Details */}
              <View style={styles.productDetails}>
                <Text style={styles.brandName}>
                  {item.brand}
                </Text>
                <Text style={styles.productName}>
                  {item.name}
                </Text>

                {/* Rating Row */}
                <View style={styles.ratingRow}>
                  <View style={styles.ratingBadge}>
                    <Text style={styles.ratingText}>{item.rating}</Text>
                    <Star size={9} color="#FFFFFF" fill="#FFFFFF" />
                  </View>
                  <Text style={styles.reviewsText}>({item.reviews})</Text>
                </View>

                {/* Pricing */}
                <View style={styles.pricingRow}>
                  <Text style={styles.currentPrice}>{item.price}</Text>
                  <Text style={styles.originalPrice}>{item.originalPrice}</Text>
                </View>
                <Text style={styles.discountTag}>{item.discount}</Text>

                {/* Add to Cart / Quantity Stepper */}
                {isInCart(item.id, item.name) ? (
                  <View style={styles.cardStepperRow}>
                    <TouchableOpacity
                      style={styles.cardStepperBtn}
                      onPress={() => updateQuantity(item.id, getItemQuantity(item.id, item.name) - 1)}
                      activeOpacity={0.7}
                    >
                      <Minus size={11} color="#FFFFFF" strokeWidth={3} />
                    </TouchableOpacity>

                    <View style={styles.cardStepperQtyBox}>
                      <Text style={styles.cardStepperQtyText}>
                        {getItemQuantity(item.id, item.name)}
                      </Text>
                    </View>

                    <TouchableOpacity
                      style={styles.cardStepperBtn}
                      onPress={() => addToCart(item, 1)}
                      activeOpacity={0.7}
                    >
                      <Plus size={11} color="#FFFFFF" strokeWidth={3} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.addToCartBtn}
                    activeOpacity={0.8}
                    onPress={() => addToCart(item)}
                  >
                    <ShoppingCart size={13} color="#FFFFFF" />
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 14,
    marginTop: 8,
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 10.5,
    color: '#333333',
    fontWeight: '600',
  },
  viewAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    gap: 2,
  },
  viewAllText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#000000',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  productImageContainer: {
    height: '100',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badgePill: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    gap: 3,
  },
  badgePillText: {
    color: '#FFFFFF',
    fontSize: 8.5,
    fontWeight: '800',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCenterWrap: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },

  productImage: {
    width: '100%',
    height: '100%',
  },
  productDetails: {
    padding: 8,
  },
  brandName: {
    fontSize: 9.5,
    color: '#777777',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  productName: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#111111',
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#15803D',
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 4,
    gap: 2,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '800',
  },
  reviewsText: {
    fontSize: 9.5,
    color: '#777777',
    fontWeight: '500',
  },
  pricingRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 6,
    gap: 5,
  },
  currentPrice: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#000000',
  },
  originalPrice: {
    fontSize: 10,
    color: '#888888',
    textDecorationLine: 'line-through',
  },
  discountTag: {
    fontSize: 10,
    fontWeight: '800',
    color: '#15803D',
    marginTop: 1,
  },
  addToCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 6,
    gap: 5,
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 10.5,
    fontWeight: '800',
  },
  cardStepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#16A34A',
    borderRadius: 8,
    marginTop: 6,
    paddingHorizontal: 4,
    paddingVertical: 3,
  },
  cardStepperBtn: {
    width: 22,
    height: 22,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardStepperQtyBox: {
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardStepperQtyText: {
    color: '#FFFFFF',
    fontSize: 11.5,
    fontWeight: '900',
  },
});

export default NewArrivals;
