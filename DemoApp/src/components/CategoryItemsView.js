import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import {
  Star,
  ShoppingCart,
  Plus,
  Minus,
  X,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Truck,
  Tag,
} from 'lucide-react-native';
import { useCart } from '../context/CartContext';

const CategoryItemsView = ({ category, onClear, navigation }) => {
  const { width } = useWindowDimensions();
  const cardWidth = (width - 38) / 2;
  const { addToCart, updateQuantity, isInCart, getItemQuantity } = useCart();
  const [activeSubcategory, setActiveSubcategory] = useState('All');

  const CategoryIcon = category.Icon;

  // Filter items if specific subcategory is selected
  const displayedItems = useMemo(() => {
    if (!category || !category.items) return [];
    if (activeSubcategory === 'All') return category.items;

    // Filter items matching subcategory keyword
    const query = activeSubcategory.toLowerCase();
    const filtered = category.items.filter((item) => {
      const matchName = item.name.toLowerCase().includes(query);
      const matchSpec = (item.spec || '').toLowerCase().includes(query);
      const matchBrand = (item.brand || '').toLowerCase().includes(query);
      return matchName || matchSpec || matchBrand;
    });

    return filtered.length > 0 ? filtered : category.items;
  }, [category, activeSubcategory]);

  const handleNavigateToCategoryScreen = () => {
    navigation?.navigate?.('Category', { categoryId: category.id });
  };

  if (!category) return null;

  return (
    <View style={styles.container}>
      {/* Category Header Card */}
      <View style={styles.headerCard}>
        <View style={styles.headerLeftRow}>
          <View style={styles.iconCircle}>
            <CategoryIcon size={24} color="#000000" strokeWidth={2.2} />
          </View>
          <View style={styles.headerTextCol}>
            <View style={styles.titleBadgeRow}>
              <Text style={styles.categoryTitle}>{category.name}</Text>
              {category.badge && (
                <View
                  style={[
                    styles.badgePill,
                    { backgroundColor: category.badgeColor || '#EF4444' },
                  ]}
                >
                  <Text style={styles.badgeText}>{category.badge}</Text>
                </View>
              )}
            </View>
            <Text style={styles.taglineText} numberOfLines={1}>
              {category.tagline}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.closeBtn}
          onPress={onClear}
          activeOpacity={0.7}
          accessibilityLabel="Clear category"
        >
          <X size={18} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* Subcategory Filter Chips */}
      {category.subcategories && category.subcategories.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.subcategoriesScroll}
        >
          {category.subcategories.map((sub, idx) => {
            const isActive = activeSubcategory === sub;
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.subChip, isActive && styles.subChipActive]}
                onPress={() => setActiveSubcategory(sub)}
                activeOpacity={0.7}
              >
                {isActive && <Sparkles size={11} color="#FFFFFF" />}
                <Text
                  style={[
                    styles.subChipText,
                    isActive && styles.subChipTextActive,
                  ]}
                >
                  {sub}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}

      {/* Section Subheader: Item count & Navigation Link */}
      <View style={styles.sectionBar}>
        <Text style={styles.sectionBarCount}>
          Showing {displayedItems.length} products
        </Text>
        <TouchableOpacity
          style={styles.viewFullCategoryBtn}
          onPress={handleNavigateToCategoryScreen}
          activeOpacity={0.7}
        >
          <Text style={styles.viewFullCategoryText}>View Full Store</Text>
          <ChevronRight size={14} color="#000000" />
        </TouchableOpacity>
      </View>

      {/* 2-Column Product Grid */}
      <View style={styles.grid}>
        {displayedItems.map((item) => {
          const inCart = isInCart(item.id, item.name);
          const qty = getItemQuantity(item.id, item.name);

          return (
            <View
              key={item.id}
              style={[styles.productCard, { width: cardWidth }]}
            >
              {/* Product Visual Container */}
              <View style={styles.imageContainer}>
                {item.image ? (
                  <Image
                    source={item.image}
                    style={styles.productImage}
                    resizeMode="contain"
                  />
                ) : (
                  <CategoryIcon size={48} color="#9CA3AF" />
                )}

                {item.badge && (
                  <View style={styles.itemBadge}>
                    <Text style={styles.itemBadgeText}>{item.badge}</Text>
                  </View>
                )}
              </View>

              {/* Product Info */}
              <View style={styles.productDetails}>
                <Text style={styles.brandName} numberOfLines={1}>
                  {item.brand}
                </Text>
                <Text style={styles.productName} numberOfLines={2}>
                  {item.name}
                </Text>

                {item.spec ? (
                  <Text style={styles.specText} numberOfLines={1}>
                    {item.spec}
                  </Text>
                ) : null}

                {/* Rating Row */}
                <View style={styles.ratingRow}>
                  <View style={styles.ratingBadge}>
                    <Text style={styles.ratingText}>{item.rating}</Text>
                    <Star size={9} color="#FFFFFF" fill="#FFFFFF" />
                  </View>
                  <Text style={styles.reviewsText}>({item.reviews})</Text>
                </View>

                {/* Pricing Row */}
                <View style={styles.pricingRow}>
                  <Text style={styles.currentPrice}>{item.price}</Text>
                  {item.originalPrice ? (
                    <Text style={styles.originalPrice}>
                      {item.originalPrice}
                    </Text>
                  ) : null}
                </View>
                {item.discount ? (
                  <Text style={styles.discountTag}>{item.discount}</Text>
                ) : null}

                {/* Delivery Badge */}
                {item.deliveryDate ? (
                  <View style={styles.deliveryRow}>
                    <Truck size={10} color="#15803D" />
                    <Text style={styles.deliveryText} numberOfLines={1}>
                      {item.deliveryDate}
                    </Text>
                  </View>
                ) : null}

                {/* Add to Cart Button / Quantity Stepper */}
                {inCart ? (
                  <View style={styles.cardStepperRow}>
                    <TouchableOpacity
                      style={styles.cardStepperBtn}
                      onPress={() => updateQuantity(item.id, qty - 1)}
                      activeOpacity={0.7}
                    >
                      <Minus size={11} color="#FFFFFF" strokeWidth={3} />
                    </TouchableOpacity>

                    <View style={styles.cardStepperQtyBox}>
                      <Text style={styles.cardStepperQtyText}>{qty}</Text>
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

      {/* Bottom CTA to explore full category page */}
      <TouchableOpacity
        style={styles.bottomBannerBtn}
        onPress={handleNavigateToCategoryScreen}
        activeOpacity={0.8}
      >
        <View style={styles.bottomBannerLeft}>
          <Tag size={16} color="#000000" />
          <Text style={styles.bottomBannerText}>
            Explore all {category.name} in Category section
          </Text>
        </View>
        <ArrowRight size={16} color="#000000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 14,
    marginTop: 6,
    marginBottom: 20,
  },

  /* Header card */
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFBEB',
    borderWidth: 1.5,
    borderColor: '#FCD34D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextCol: {
    flex: 1,
  },
  titleBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#000000',
  },
  badgePill: {
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 8.5,
    fontWeight: '900',
  },
  taglineText: {
    fontSize: 11,
    color: '#555555',
    fontWeight: '600',
    marginTop: 2,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 6,
  },

  /* Subcategories chips */
  subcategoriesScroll: {
    paddingVertical: 10,
    gap: 8,
  },
  subChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  subChipActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  subChipText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#333333',
  },
  subChipTextActive: {
    color: '#FFFFFF',
  },

  /* Section bar */
  sectionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    paddingHorizontal: 2,
  },
  sectionBarCount: {
    fontSize: 12,
    fontWeight: '700',
    color: '#444444',
  },
  viewFullCategoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  viewFullCategoryText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#000000',
  },

  /* 2-Column Grid */
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EEEEEE',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  itemBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#000000',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  itemBadgeText: {
    color: '#FFFFFF',
    fontSize: 8.5,
    fontWeight: '800',
  },
  productDetails: {
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  brandName: {
    fontSize: 10.5,
    color: '#777777',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  productName: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#000000',
    marginTop: 2,
    height: 34,
    lineHeight: 17,
  },
  specText: {
    fontSize: 10,
    color: '#888888',
    marginTop: 2,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#15803D',
    paddingHorizontal: 5,
    paddingVertical: 1,
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
  deliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  deliveryText: {
    fontSize: 9.5,
    color: '#15803D',
    fontWeight: '700',
  },

  /* Add to cart / Stepper */
  addToCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 8,
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
    marginTop: 8,
    paddingHorizontal: 4,
    paddingVertical: 3,
  },
  cardStepperBtn: {
    width: 24,
    height: 24,
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
    fontSize: 12,
    fontWeight: '900',
  },

  /* Bottom CTA */
  bottomBannerBtn: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  bottomBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  bottomBannerText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#000000',
  },
});

export default CategoryItemsView;
