import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
} from 'react-native';
import {
  ShoppingCart,
  ShoppingBag,
  Trash2,
  Heart,
  Plus,
  Minus,
  Check,
  ShieldCheck,
  Tag,
  Truck,
  MapPin,
  ArrowRight,
  Sparkles,
  RotateCcw,
  X,
  AlertCircle,
  Coins,
  Star,
  Zap,
} from 'lucide-react-native';
import { useCart, COUPON_CODES } from '../context/CartContext';

// Helper to format currency in Indian numbering format
const formatPrice = (amount) => {
  return '₹' + Math.round(amount || 0).toLocaleString('en-IN');
};

// Recommended accessories / products
const RECOMMENDED_ITEMS = [
  {
    id: 'rec_1',
    name: 'Digital Sports Chrono Watch',
    spec: '50M Water Resistant • LED Backlight',
    price: 1299,
    originalPrice: 2599,
    discount: '50% off',
    rating: 4.4,
    image: require('../assests/digitalwatch.png'),
  },
  {
    id: 'rec_2',
    name: 'Artisan Roasted Arabica Coffee',
    spec: '500g • Medium-Dark Roast • Fresh Whole Beans',
    price: 749,
    originalPrice: 999,
    discount: '25% off',
    rating: 4.7,
    image: require('../assests/coffee.png'),
  },
  {
    id: 'rec_3',
    name: 'California Premium Whole Almonds',
    spec: '1kg • Crunchy & Vacuum Sealed',
    price: 899,
    originalPrice: 1250,
    discount: '28% off',
    rating: 4.8,
    image: require('../assests/almond.png'),
  },
  {
    id: 'rec_4',
    name: '4WD Rock Crawler RC Monster',
    spec: 'High-torque all-terrain buggy with remote',
    price: 1499,
    originalPrice: 2999,
    discount: '50% off',
    rating: 4.6,
    image: require('../assests/rcmonster.png'),
  },
];

// Predefined delivery addresses
const ADDRESSES = [
  {
    id: 'addr_1',
    tag: 'HOME',
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    addressLine: 'Flat 402, Sunshine Heights, 12th Main Road, Koramangala 4th Block',
    cityStatePin: 'Bengaluru, Karnataka - 560034',
  },
  {
    id: 'addr_2',
    tag: 'WORK',
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    addressLine: 'Unit 304, Cyber Park, Outer Ring Road, Bellandur',
    cityStatePin: 'Bengaluru, Karnataka - 560103',
  },
  {
    id: 'addr_3',
    tag: 'PARENTS',
    name: 'Sunita Sharma',
    phone: '+91 91234 56789',
    addressLine: '15, Shanti Niketan Marg, Civil Lines',
    cityStatePin: 'Jaipur, Rajasthan - 302006',
  },
];

const CartScreen = ({ navigation }) => {
  const {
    cartItems,
    savedItems,
    totalItemCount,
    totalMRP,
    totalSellingPrice,
    mrpDiscount,
    couponDiscount,
    appliedCoupon,
    couponError,
    useSuperCoins,
    availableSuperCoins,
    superCoinsDeduction,
    deliveryCharges,
    packagingFee,
    finalPayable,
    totalSavings,
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    saveForLater,
    moveToCart,
    removeSavedItem,
    clearCart,
    restoreDemoItems,
    applyCoupon,
    removeCoupon,
    setUseSuperCoins,
    showToast,
  } = useCart();

  // Address state
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [addressModalVisible, setAddressModalVisible] = useState(false);

  // Coupon input state
  const [couponInput, setCouponInput] = useState('');

  // Modals state
  const [itemToDelete, setItemToDelete] = useState(null);
  const [orderSuccessModalVisible, setOrderSuccessModalVisible] = useState(false);

  // Handle decrease / deletion prompt
  const handleDecrease = (item) => {
    if (item.quantity <= 1) {
      setItemToDelete(item);
    } else {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const confirmDelete = () => {
    if (!itemToDelete) return;
    removeFromCart(itemToDelete.id);
    setItemToDelete(null);
  };

  const handleSaveForLater = (item) => {
    saveForLater(item);
    setItemToDelete(null);
  };

  const handleApplyCoupon = (codeToApply) => {
    const code = codeToApply || couponInput;
    const success = applyCoupon(code);
    if (success) {
      setCouponInput('');
    }
  };

  const handlePlaceOrder = () => {
    setOrderSuccessModalVisible(true);
  };

  const handleOrderConfirmedClose = () => {
    setOrderSuccessModalVisible(false);
    clearCart();
    navigation?.navigate?.('Home');
  };

  const activeAddress = ADDRESSES[selectedAddressIndex] || ADDRESSES[0];

  return (
    <View style={styles.container}>
      {/* Sleek App Top Header */}
      <View style={styles.topHeader}>
        <View style={styles.headerLeft}>
          <Text style={styles.brandTitle}>
            ShopZ <Text style={styles.brandTitlePlus}>Plus</Text>
          </Text>
          <View style={styles.titleDivider} />
          <View style={styles.cartTitleRow}>
            <Text style={styles.cartTitle}>My Cart</Text>
            {totalItemCount > 0 && (
              <View style={styles.itemCountBadge}>
                <Text style={styles.itemCountText}>{totalItemCount}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.headerRight}>
          <TouchableOpacity
            style={styles.headerIconBtn}
            activeOpacity={0.7}
            onPress={() => showToast('Wishlist feature')}
          >
            <Heart size={20} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerIconBtn}
            activeOpacity={0.7}
            onPress={restoreDemoItems}
          >
            <RotateCcw size={19} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Delivery Address Bar */}
        <View style={styles.addressBarContainer}>
          <View style={styles.addressLeftCol}>
            <View style={styles.addressPinRow}>
              <MapPin size={18} color="#2563EB" />
              <Text style={styles.deliverToHeading}>Deliver to:</Text>
              <Text style={styles.addressNameText} numberOfLines={1}>
                {activeAddress.name}, {activeAddress.cityStatePin.split('-')[1]?.trim() || '560034'}
              </Text>
              <View style={styles.addressTagBadge}>
                <Text style={styles.addressTagText}>{activeAddress.tag}</Text>
              </View>
            </View>
            <Text style={styles.addressDetailText} numberOfLines={1}>
              {activeAddress.addressLine}, {activeAddress.cityStatePin}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.changeAddressBtn}
            onPress={() => setAddressModalVisible(true)}
            activeOpacity={0.7}
          >
            <Text style={styles.changeAddressText}>Change</Text>
          </TouchableOpacity>
        </View>

        {/* Free Delivery / Plus Delivery Perk Banner */}
        {cartItems.length > 0 && (
          <View style={styles.deliveryPerkBanner}>
            <View style={styles.perkIconWrap}>
              <Truck size={18} color="#16A34A" />
            </View>
            <View style={styles.perkTextWrap}>
              <Text style={styles.perkTitle}>
                {totalSellingPrice >= 499
                  ? "🎉 You've unlocked FREE Delivery!"
                  : `Add ${formatPrice(499 - totalSellingPrice)} more for FREE Delivery`}
              </Text>
              <Text style={styles.perkSubtitle}>
                Plus members enjoy guaranteed fast dispatch & priority handling
              </Text>
            </View>
          </View>
        )}

        {/* Empty Cart State */}
        {cartItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <ShoppingBag size={56} color="#9CA3AF" />
            </View>
            <Text style={styles.emptyTitle}>Your Shopping Cart is Empty</Text>
            <Text style={styles.emptySubtitle}>
              Explore thousands of deals, gadgets, and apparel right now.
            </Text>

            <View style={styles.emptyActionRow}>
              <TouchableOpacity
                style={styles.emptyPrimaryBtn}
                onPress={() => navigation?.navigate?.('Home')}
                activeOpacity={0.8}
              >
                <Text style={styles.emptyPrimaryBtnText}>Explore Products</Text>
                <ArrowRight size={18} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.emptySecondaryBtn}
                onPress={restoreDemoItems}
                activeOpacity={0.7}
              >
                <RotateCcw size={16} color="#1F2937" />
                <Text style={styles.emptySecondaryBtnText}>Restore Sample Items</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          /* Active Cart Items Section */
          <View style={styles.cartItemsSection}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionHeading}>Items in Cart ({totalItemCount})</Text>
              <Text style={styles.sectionSubtitle}>Prices include all taxes</Text>
            </View>

            {cartItems.map((item) => (
              <View key={item.id} style={styles.cartItemCard}>
                <View style={styles.cardMainRow}>
                  {/* Product Thumbnail */}
                  <View style={styles.productImageContainer}>
                    {item.image ? (
                      <Image source={item.image} style={styles.productImage} resizeMode="contain" />
                    ) : (
                      <ShoppingBag size={38} color="#9CA3AF" />
                    )}
                    {item.discount && (
                      <View style={styles.imageDiscountBadge}>
                        <Text style={styles.imageDiscountText}>{item.discount}</Text>
                      </View>
                    )}
                  </View>

                  {/* Product Details */}
                  <View style={styles.productInfoCol}>
                    <Text style={styles.productTitle} numberOfLines={2}>
                      {item.name}
                    </Text>

                    {item.spec ? (
                      <Text style={styles.productSpec} numberOfLines={1}>
                        {item.spec}
                      </Text>
                    ) : null}

                    {/* Seller & ShopZ Assured Badge */}
                    <View style={styles.sellerRow}>
                      <Text style={styles.sellerText} numberOfLines={1}>
                        Seller: {item.seller || 'ShopZ Verified'}
                      </Text>
                      <View style={styles.assuredBadge}>
                        <ShieldCheck size={12} color="#FFFFFF" />
                        <Text style={styles.assuredText}>Assured</Text>
                      </View>
                    </View>

                    {/* Rating Pill */}
                    {item.rating && (
                      <View style={styles.ratingRow}>
                        <View style={styles.ratingBadge}>
                          <Text style={styles.ratingText}>{item.rating}</Text>
                          <Star size={10} color="#FFFFFF" fill="#FFFFFF" />
                        </View>
                        {item.reviews && (
                          <Text style={styles.reviewsCount}>({item.reviews} reviews)</Text>
                        )}
                      </View>
                    )}

                    {/* Pricing Row */}
                    <View style={styles.pricingRow}>
                      <Text style={styles.currentPrice}>{formatPrice(item.price)}</Text>
                      {item.originalPrice > item.price && (
                        <Text style={styles.originalPrice}>
                          {formatPrice(item.originalPrice)}
                        </Text>
                      )}
                      <Text style={styles.discountBadgeText}>{item.discount}</Text>
                    </View>

                    {/* Savings Note */}
                    {item.originalPrice > item.price && (
                      <Text style={styles.itemSavingsText}>
                        Save {formatPrice((item.originalPrice - item.price) * item.quantity)}
                      </Text>
                    )}

                    {/* Delivery & Replacement tags */}
                    <View style={styles.itemPerksRow}>
                      <View style={styles.itemPerkChip}>
                        <Truck size={12} color="#16A34A" />
                        <Text style={styles.itemPerkText}>{item.deliveryDate || 'Fast Delivery'}</Text>
                      </View>
                      <View style={styles.itemPerkChip}>
                        <RotateCcw size={11} color="#6B7280" />
                        <Text style={styles.itemPerkTextGray}>7 Days Return</Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Card Bottom Action Bar: Stepper & Action Buttons */}
                <View style={styles.cardFooter}>
                  {/* Stepper Quantity Control */}
                  <View style={styles.stepperContainer}>
                    <TouchableOpacity
                      style={styles.stepperBtn}
                      onPress={() => handleDecrease(item)}
                      activeOpacity={0.7}
                    >
                      <Minus size={14} color="#1F2937" />
                    </TouchableOpacity>

                    <View style={styles.stepperValueBox}>
                      <Text style={styles.stepperValueText}>{item.quantity}</Text>
                    </View>

                    <TouchableOpacity
                      style={[styles.stepperBtn, item.quantity >= 5 && styles.stepperBtnDisabled]}
                      onPress={() => updateQuantity(item.id, item.quantity + 1)}
                      activeOpacity={0.7}
                      disabled={item.quantity >= 5}
                    >
                      <Plus size={14} color={item.quantity >= 5 ? '#9CA3AF' : '#1F2937'} />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.cardActionButtons}>
                    <TouchableOpacity
                      style={styles.actionBtn}
                      onPress={() => handleSaveForLater(item)}
                      activeOpacity={0.7}
                    >
                      <Heart size={15} color="#4B5563" />
                      <Text style={styles.actionBtnText}>Save for Later</Text>
                    </TouchableOpacity>

                    <View style={styles.actionDivider} />

                    <TouchableOpacity
                      style={styles.actionBtn}
                      onPress={() => setItemToDelete(item)}
                      activeOpacity={0.7}
                    >
                      <Trash2 size={15} color="#DC2626" />
                      <Text style={[styles.actionBtnText, styles.actionBtnRemoveText]}>
                        Remove
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Coupons & Promo Codes Section */}
        {cartItems.length > 0 && (
          <View style={styles.couponSectionCard}>
            <View style={styles.couponHeaderRow}>
              <View style={styles.couponHeaderLeft}>
                <Tag size={18} color="#EA580C" />
                <Text style={styles.couponHeading}>Coupons & Offers</Text>
              </View>
              {appliedCoupon && (
                <View style={styles.appliedTagBadge}>
                  <Check size={12} color="#16A34A" />
                  <Text style={styles.appliedTagText}>Applied</Text>
                </View>
              )}
            </View>

            {appliedCoupon ? (
              <View style={styles.appliedCouponBanner}>
                <View style={styles.appliedCouponLeft}>
                  <Text style={styles.appliedCodeName}>{appliedCoupon.code}</Text>
                  <Text style={styles.appliedCodeSavings}>
                    Discount of {formatPrice(couponDiscount)} applied!
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.removeCouponBtn}
                  onPress={removeCoupon}
                  activeOpacity={0.7}
                >
                  <Text style={styles.removeCouponText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <View style={styles.couponInputRow}>
                  <TextInput
                    style={styles.couponTextInput}
                    placeholder="Enter Coupon / Promo Code"
                    placeholderTextColor="#9CA3AF"
                    value={couponInput}
                    onChangeText={(val) => setCouponInput(val.toUpperCase())}
                    autoCapitalize="characters"
                  />
                  <TouchableOpacity
                    style={[
                      styles.couponApplyBtn,
                      !couponInput.trim() && styles.couponApplyBtnDisabled,
                    ]}
                    onPress={() => handleApplyCoupon(couponInput)}
                    disabled={!couponInput.trim()}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.couponApplyBtnText}>Apply</Text>
                  </TouchableOpacity>
                </View>

                {couponError !== '' && (
                  <View style={styles.couponErrorRow}>
                    <AlertCircle size={14} color="#DC2626" />
                    <Text style={styles.couponErrorText}>{couponError}</Text>
                  </View>
                )}

                {/* Quick Coupon Chips */}
                <View style={styles.quickCouponsWrap}>
                  <Text style={styles.quickCouponsTitle}>Available for you:</Text>
                  <View style={styles.chipsRow}>
                    {Object.values(COUPON_CODES).map((coupon) => (
                      <TouchableOpacity
                        key={coupon.code}
                        style={styles.couponChip}
                        onPress={() => handleApplyCoupon(coupon.code)}
                        activeOpacity={0.7}
                      >
                        <Zap size={12} color="#D97706" />
                        <Text style={styles.couponChipCode}>{coupon.code}</Text>
                        <Text style={styles.couponChipDesc}>({coupon.label.split('on')[0]})</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </>
            )}
          </View>
        )}

        {/* SuperCoins Loyalty Reward Option */}
        {cartItems.length > 0 && (
          <TouchableOpacity
            style={styles.superCoinsCard}
            onPress={() => setUseSuperCoins(!useSuperCoins)}
            activeOpacity={0.8}
          >
            <View style={styles.superCoinsLeft}>
              <View style={styles.superCoinsIconBox}>
                <Coins size={20} color="#D97706" />
              </View>
              <View style={styles.superCoinsTextBox}>
                <Text style={styles.superCoinsTitle}>ShopZ SuperCoins</Text>
                <Text style={styles.superCoinsSubtitle}>
                  Use 50 SuperCoins to save ₹50 on this order (Balance: {availableSuperCoins})
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.checkboxBox,
                useSuperCoins && styles.checkboxBoxActive,
              ]}
            >
              {useSuperCoins && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
            </View>
          </TouchableOpacity>
        )}

        {/* Saved For Later Section */}
        {savedItems.length > 0 && (
          <View style={styles.savedSectionContainer}>
            <View style={styles.savedHeaderRow}>
              <Text style={styles.savedHeading}>Saved for Later ({savedItems.length})</Text>
              <Text style={styles.savedSubheading}>Move items back when you are ready</Text>
            </View>

            {savedItems.map((item) => (
              <View key={item.id} style={styles.savedItemCard}>
                <View style={styles.savedCardRow}>
                  {item.image ? (
                    <Image source={item.image} style={styles.savedItemImage} resizeMode="contain" />
                  ) : (
                    <ShoppingBag size={35} color="#9CA3AF" />
                  )}
                  <View style={styles.savedItemInfo}>
                    <Text style={styles.savedItemName} numberOfLines={2}>
                      {item.name}
                    </Text>
                    <Text style={styles.savedItemSpec} numberOfLines={1}>
                      {item.spec}
                    </Text>
                    <View style={styles.pricingRow}>
                      <Text style={styles.currentPrice}>{formatPrice(item.price)}</Text>
                      {item.originalPrice > item.price && (
                        <Text style={styles.originalPrice}>
                          {formatPrice(item.originalPrice)}
                        </Text>
                      )}
                      <Text style={styles.discountBadgeText}>{item.discount}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.savedActionRow}>
                  <TouchableOpacity
                    style={styles.moveToCartBtn}
                    onPress={() => moveToCart(item)}
                    activeOpacity={0.7}
                  >
                    <ShoppingCart size={15} color="#2563EB" />
                    <Text style={styles.moveToCartText}>Move to Cart</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.removeSavedBtn}
                    onPress={() => removeSavedItem(item.id)}
                    activeOpacity={0.7}
                  >
                    <Trash2 size={15} color="#DC2626" />
                    <Text style={styles.removeSavedText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Recommendations / Frequently Bought Together */}
        <View style={styles.recommendationsContainer}>
          <View style={styles.recHeaderRow}>
            <View>
              <Text style={styles.recHeading}>You Might Also Like</Text>
              <Text style={styles.recSubheading}>Frequently added with your items</Text>
            </View>
            <Sparkles size={18} color="#D97706" />
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recScrollContent}
          >
            {RECOMMENDED_ITEMS.map((item) => (
              <View key={item.id} style={styles.recCard}>
                <View style={styles.recImageWrap}>
                  <Image source={item.image} style={styles.recImage} resizeMode="contain" />
                  <View style={styles.recDiscountPill}>
                    <Text style={styles.recDiscountText}>{item.discount}</Text>
                  </View>
                </View>

                <Text style={styles.recItemName} numberOfLines={2}>
                  {item.name}
                </Text>

                <View style={styles.recPriceRow}>
                  <Text style={styles.recCurrentPrice}>{formatPrice(item.price)}</Text>
                  <Text style={styles.recOriginalPrice}>{formatPrice(item.originalPrice)}</Text>
                </View>

                <TouchableOpacity
                  style={styles.recAddBtn}
                  onPress={() => addToCart(item)}
                  activeOpacity={0.8}
                >
                  <Plus size={14} color="#FFFFFF" strokeWidth={2.5} />
                  <Text style={styles.recAddBtnText}>Add</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Price Details Breakdown / Order Summary */}
        {cartItems.length > 0 && (
          <View style={styles.billDetailsCard}>
            <Text style={styles.billHeading}>PRICE DETAILS ({totalItemCount} Items)</Text>
            <View style={styles.billDivider} />

            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Total MRP</Text>
              <Text style={styles.billValue}>{formatPrice(totalMRP)}</Text>
            </View>

            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Discount on MRP</Text>
              <Text style={[styles.billValue, styles.billGreenValue]}>
                -{formatPrice(mrpDiscount)}
              </Text>
            </View>

            {appliedCoupon && (
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>Coupon Discount ({appliedCoupon.code})</Text>
                <Text style={[styles.billValue, styles.billGreenValue]}>
                  -{formatPrice(couponDiscount)}
                </Text>
              </View>
            )}
   
            {useSuperCoins && (
              <View style={styles.billRow}>
                <Text style={styles.billLabel}>SuperCoins Applied</Text>
                <Text style={[styles.billValue, styles.billGreenValue]}>
                  -{formatPrice(superCoinsDeduction)}
                </Text>
              </View>
            )}

            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Delivery Charges</Text>
              {deliveryCharges === 0 ? (
                <View style={styles.freeDeliveryRow}>
                  <Text style={styles.strikethroughFee}>₹40</Text>
                  <Text style={[styles.billValue, styles.billGreenValue]}>FREE</Text>
                </View>
              ) : (
                <Text style={styles.billValue}>{formatPrice(deliveryCharges)}</Text>
              )}
            </View>

            <View style={styles.billRow}>
              <Text style={styles.billLabel}>Secured Packaging Fee</Text>
              <Text style={styles.billValue}>{formatPrice(packagingFee)}</Text>
            </View>

            <View style={styles.billTotalDivider} />

            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Payable Amount</Text>
              <Text style={styles.totalAmount}>{formatPrice(finalPayable)}</Text>
            </View>

            <View style={styles.savingsCalloutBox}>
              <Sparkles size={16} color="#16A34A" />
              <Text style={styles.savingsCalloutText}>
                You will save {formatPrice(totalSavings)} on this order
              </Text>
            </View>
          </View>
        )}

        {/* Safety & Trust Badges */}
        <View style={styles.safetyBadgesContainer}>
          <View style={styles.safetyItem}>
            <ShieldCheck size={22} color="#4B5563" />
            <Text style={styles.safetyText}>100% Authentic Products</Text>
          </View>
          <View style={styles.safetyDot} />
          <View style={styles.safetyItem}>
            <RotateCcw size={20} color="#4B5563" />
            <Text style={styles.safetyText}>Easy 7-Day Returns</Text>
          </View>
          <View style={styles.safetyDot} />
          <View style={styles.safetyItem}>
            <Zap size={20} color="#4B5563" />
            <Text style={styles.safetyText}>Secure Payments</Text>
          </View>
        </View>

        {/* Extra Bottom Padding for Sticky Checkout Bar */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Sticky Bottom Checkout Footer */}
      {cartItems.length > 0 && (
        <View style={styles.bottomCheckoutBar}>
          <View style={styles.bottomPriceCol}>
            <Text style={styles.bottomTotalHeading}>Total Amount</Text>
            <View style={styles.bottomPriceRow}>
              <Text style={styles.bottomPriceText}>{formatPrice(finalPayable)}</Text>
              <Text style={styles.bottomSavingsBadge}>
                Save {formatPrice(totalSavings)}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.placeOrderBtn}
            onPress={handlePlaceOrder}
            activeOpacity={0.85}
          >
            <Text style={styles.placeOrderBtnText}>Place Order</Text>
            <ArrowRight size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      )}

      {/* MODAL 1: Address Selection Sheet */}
      <Modal
        visible={addressModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAddressModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.addressModalContent}>
            <View style={styles.modalHeaderRow}>
              <Text style={styles.modalTitle}>Select Delivery Address</Text>
              <TouchableOpacity
                onPress={() => setAddressModalVisible(false)}
                style={styles.modalCloseBtn}
              >
                <X size={20} color="#4B5563" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.addressListScroll}>
              {ADDRESSES.map((addr, idx) => {
                const isSelected = selectedAddressIndex === idx;
                return (
                  <TouchableOpacity
                    key={addr.id}
                    style={[
                      styles.addressCardItem,
                      isSelected && styles.addressCardItemActive,
                    ]}
                    onPress={() => {
                      setSelectedAddressIndex(idx);
                      setAddressModalVisible(false);
                      showToast(`Delivering to ${addr.name} (${addr.tag})`);
                    }}
                    activeOpacity={0.7}
                  >
                    <View style={styles.addressRadioRow}>
                      <View
                        style={[
                          styles.radioCircle,
                          isSelected && styles.radioCircleActive,
                        ]}
                      >
                        {isSelected && <View style={styles.radioInnerDot} />}
                      </View>
                      <View style={styles.addressCardInfo}>
                        <View style={styles.addressCardNameRow}>
                          <Text style={styles.addressCardName}>{addr.name}</Text>
                          <View style={styles.addressTagBadge}>
                            <Text style={styles.addressTagText}>{addr.tag}</Text>
                          </View>
                        </View>
                        <Text style={styles.addressCardLine}>{addr.addressLine}</Text>
                        <Text style={styles.addressCardCity}>{addr.cityStatePin}</Text>
                        <Text style={styles.addressCardPhone}>Phone: {addr.phone}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <TouchableOpacity
              style={styles.addNewAddressBtn}
              onPress={() => {
                setAddressModalVisible(false);
                showToast('Add new address modal');
              }}
              activeOpacity={0.7}
            >
              <Plus size={16} color="#2563EB" />
              <Text style={styles.addNewAddressText}>Add New Address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL 2: Delete Item Confirmation */}
      <Modal
        visible={itemToDelete !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setItemToDelete(null)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.confirmModalContent}>
            <View style={styles.confirmIconCircle}>
              <Trash2 size={26} color="#DC2626" />
            </View>

            <Text style={styles.confirmModalTitle}>Remove Item?</Text>
            <Text style={styles.confirmModalDesc} numberOfLines={2}>
              Are you sure you want to remove &quot;{itemToDelete?.name}&quot; from your cart?
            </Text>

            <View style={styles.confirmActionsCol}>
              <TouchableOpacity
                style={styles.confirmSaveForLaterBtn}
                onPress={() => itemToDelete && handleSaveForLater(itemToDelete)}
                activeOpacity={0.8}
              >
                <Heart size={16} color="#2563EB" />
                <Text style={styles.confirmSaveForLaterText}>Move to Saved for Later</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmDeleteBtn}
                onPress={confirmDelete}
                activeOpacity={0.8}
              >
                <Text style={styles.confirmDeleteBtnText}>Remove</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmCancelBtn}
                onPress={() => setItemToDelete(null)}
                activeOpacity={0.7}
              >
                <Text style={styles.confirmCancelBtnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* MODAL 3: Order Placed Success Modal */}
      <Modal
        visible={orderSuccessModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setOrderSuccessModalVisible(false)}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.orderSuccessContent}>
            <View style={styles.successCheckCircle}>
              <Check size={40} color="#FFFFFF" strokeWidth={3} />
            </View>

            <Text style={styles.successTitle}>Order Placed Successfully!</Text>
            <Text style={styles.successOrderNumber}>Order ID: #SZ-2026-98421</Text>

            <View style={styles.orderSummaryCard}>
              <View style={styles.orderSummaryRow}>
                <Text style={styles.orderSummaryLabel}>Items Ordered</Text>
                <Text style={styles.orderSummaryValue}>{totalItemCount} Items</Text>
              </View>
              <View style={styles.orderSummaryRow}>
                <Text style={styles.orderSummaryLabel}>Total Paid</Text>
                <Text style={styles.orderSummaryTotal}>{formatPrice(finalPayable)}</Text>
              </View>
              <View style={styles.orderSummaryRow}>
                <Text style={styles.orderSummaryLabel}>Delivery To</Text>
                <Text style={styles.orderSummaryValue} numberOfLines={1}>
                  {activeAddress.name} ({activeAddress.tag})
                </Text>
              </View>
              <View style={styles.orderSummaryRow}>
                <Text style={styles.orderSummaryLabel}>Estimated Delivery</Text>
                <Text style={styles.orderSummaryValueHighlight}>Tomorrow, by 11 AM</Text>
              </View>
            </View>

            <View style={styles.deliveryTrackingBox}>
              <Truck size={18} color="#2563EB" />
              <Text style={styles.deliveryTrackingText}>
                We will send SMS updates to {activeAddress.phone}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.continueShoppingBtn}
              onPress={handleOrderConfirmedClose}
              activeOpacity={0.85}
            >
              <Text style={styles.continueShoppingBtnText}>Continue Shopping</Text>
              <ArrowRight size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F3F6',
  },

  /* Sleek Brand Header */
  topHeader: {
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingTop: 15,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginLeft:1,
    marginRight:1,
    marginTop:1,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '900',
    letterSpacing: -0.3,
  },
  brandTitlePlus: {
    color: '#FFB800',
    fontSize: 13,
    fontWeight: '800',
    fontStyle: 'italic',
  },
  titleDivider: {
    width: 1,
    height: 18,
    backgroundColor: '#374151',
    marginHorizontal: 10,
  },
  cartTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cartTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  itemCountBadge: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
  },
  itemCountText: {
    color: '#FFFFFF',
    fontSize: 10.5,
    fontWeight: '800',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIconBtn: {
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#1F2937',
  },

  /* Scrollable Content */
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },

  /* Address Bar */
  addressBarContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  addressLeftCol: {
    flex: 1,
    paddingRight: 12,
  },
  addressPinRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  deliverToHeading: {
    fontSize: 12.5,
    color: '#4B5563',
    fontWeight: '500',
  },
  addressNameText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
    maxWidth: 150,
  },
  addressTagBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 5,
    paddingVertical: 1.5,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#BFDBFE',
  },
  addressTagText: {
    color: '#1D4ED8',
    fontSize: 9,
    fontWeight: '800',
  },
  addressDetailText: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 3,
  },
  changeAddressBtn: {
    borderWidth: 1,
    borderColor: '#2563EB',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  changeAddressText: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '700',
  },

  /* Delivery perk banner */
  deliveryPerkBanner: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#BBF7D0',
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  perkIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  perkTextWrap: {
    flex: 1,
  },
  perkTitle: {
    color: '#15803D',
    fontSize: 12.5,
    fontWeight: '800',
  },
  perkSubtitle: {
    color: '#4B5563',
    fontSize: 10.5,
    marginTop: 1,
  },

  /* Cart Items Section */
  cartItemsSection: {
    marginTop: 10,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '800',
    color: '#111827',
  },
  sectionSubtitle: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },

  /* Individual Cart Item Card */
  cartItemCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 12,
    marginBottom: 10,
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardMainRow: {
    flexDirection: 'row',
    gap: 12,
  },
  productImageContainer: {
    width: 90,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  productImage: {
    width: 80,
    height: 90,
  },
  imageDiscountBadge: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: '#16A34A',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  imageDiscountText: {
    color: '#FFFFFF',
    fontSize: 8.5,
    fontWeight: '800',
  },
  productInfoCol: {
    flex: 1,
  },
  productTitle: {
    fontSize: 13.5,
    fontWeight: '700',
    color: '#111827',
    lineHeight: 18,
  },
  productSpec: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 3,
  },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 6,
  },
  sellerText: {
    fontSize: 10.5,
    color: '#878787',
    maxWidth: 140,
  },
  assuredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2563EB',
    paddingHorizontal: 4,
    paddingVertical: 1.5,
    borderRadius: 3,
    gap: 2,
  },
  assuredText: {
    color: '#FFFFFF',
    fontSize: 8.5,
    fontWeight: '800',
    fontStyle: 'italic',
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
    backgroundColor: '#16A34A',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
    gap: 2,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '800',
  },
  reviewsCount: {
    fontSize: 9.5,
    color: '#6B7280',
  },
  pricingRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginTop: 5,
  },
  currentPrice: {
    fontSize: 15,
    fontWeight: '900',
    color: '#111827',
  },
  originalPrice: {
    fontSize: 11.5,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  discountBadgeText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#16A34A',
  },
  itemSavingsText: {
    fontSize: 10.5,
    color: '#15803D',
    fontWeight: '600',
    marginTop: 2,
  },
  itemPerksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  itemPerkChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 4,
  },
  itemPerkText: {
    fontSize: 9.5,
    color: '#15803D',
    fontWeight: '700',
  },
  itemPerkTextGray: {
    fontSize: 9.5,
    color: '#4B5563',
    fontWeight: '600',
  },

  /* Card footer */
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    overflow: 'hidden',
  },
  stepperBtn: {
    paddingHorizontal: 9,
    paddingVertical: 4,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperBtnDisabled: {
    backgroundColor: '#F3F4F6',
  },
  stepperValueBox: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#E5E7EB',
  },
  stepperValueText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#111827',
  },
  cardActionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  actionBtnText: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#4B5563',
  },
  actionBtnRemoveText: {
    color: '#DC2626',
  },
  actionDivider: {
    width: 1,
    height: 14,
    backgroundColor: '#E5E7EB',
  },

  /* Empty Cart State */
  emptyContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 12,
    marginTop: 16,
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  emptyIconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#111827',
  },
  emptySubtitle: {
    fontSize: 12.5,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 6,
    paddingHorizontal: 16,
    lineHeight: 18,
  },
  emptyActionRow: {
    marginTop: 20,
    width: '100%',
    gap: 10,
  },
  emptyPrimaryBtn: {
    backgroundColor: '#000000',
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  emptyPrimaryBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '800',
  },
  emptySecondaryBtn: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  emptySecondaryBtnText: {
    color: '#1F2937',
    fontSize: 12.5,
    fontWeight: '700',
  },

  /* Coupon Section */
  couponSectionCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  couponHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  couponHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  couponHeading: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#111827',
  },
  appliedTagBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    gap: 4,
  },
  appliedTagText: {
    color: '#15803D',
    fontSize: 10,
    fontWeight: '800',
  },
  appliedCouponBanner: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#86EFAC',
    borderRadius: 8,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  appliedCouponLeft: {
    flex: 1,
  },
  appliedCodeName: {
    fontSize: 13,
    fontWeight: '900',
    color: '#15803D',
  },
  appliedCodeSavings: {
    fontSize: 11,
    color: '#166534',
    marginTop: 1,
  },
  removeCouponBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  removeCouponText: {
    color: '#DC2626',
    fontSize: 11.5,
    fontWeight: '800',
  },
  couponInputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  couponTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 12.5,
    color: '#111827',
    backgroundColor: '#F9FAFB',
  },
  couponApplyBtn: {
    backgroundColor: '#000000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  couponApplyBtnDisabled: {
    backgroundColor: '#9CA3AF',
  },
  couponApplyBtnText: {
    color: '#FFFFFF',
    fontSize: 12.5,
    fontWeight: '800',
  },
  couponErrorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 6,
  },
  couponErrorText: {
    color: '#DC2626',
    fontSize: 11,
    fontWeight: '600',
  },
  quickCouponsWrap: {
    marginTop: 10,
  },
  quickCouponsTitle: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '600',
    marginBottom: 6,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  couponChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#FDE68A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  couponChipCode: {
    fontSize: 11,
    fontWeight: '900',
    color: '#92400E',
  },
  couponChipDesc: {
    fontSize: 9.5,
    color: '#B45309',
  },

  /* SuperCoins Card */
  superCoinsCard: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FCD34D',
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 10,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  superCoinsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    paddingRight: 10,
  },
  superCoinsIconBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  superCoinsTextBox: {
    flex: 1,
  },
  superCoinsTitle: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#92400E',
  },
  superCoinsSubtitle: {
    fontSize: 10.5,
    color: '#B45309',
    marginTop: 1,
  },
  checkboxBox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#D97706',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxBoxActive: {
    backgroundColor: '#D97706',
  },

  /* Saved for Later */
  savedSectionContainer: {
    marginTop: 14,
    marginHorizontal: 12,
  },
  savedHeaderRow: {
    marginBottom: 8,
  },
  savedHeading: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#111827',
  },
  savedSubheading: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 1,
  },
  savedItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  savedCardRow: {
    flexDirection: 'row',
    gap: 10,
  },
  savedItemImage: {
    width: 65,
    height: 65,
    borderRadius: 6,
    backgroundColor: '#F9FAFB',
  },
  savedItemInfo: {
    flex: 1,
  },
  savedItemName: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#111827',
  },
  savedItemSpec: {
    fontSize: 10.5,
    color: '#6B7280',
    marginTop: 2,
  },
  savedActionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  moveToCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  moveToCartText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#2563EB',
  },
  removeSavedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  removeSavedText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#DC2626',
  },

  /* Recommendations Carousel */
  recommendationsContainer: {
    marginTop: 14,
    backgroundColor: '#FFFFFF',
    paddingVertical: 14,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  recHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  recHeading: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#111827',
  },
  recSubheading: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 1,
  },
  recScrollContent: {
    paddingHorizontal: 12,
    gap: 10,
  },
  recCard: {
    width: 140,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  recImageWrap: {
    width: '100%',
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  recImage: {
    width: 75,
    height: 75,
  },
  recDiscountPill: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#16A34A',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 3,
  },
  recDiscountText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '800',
  },
  recItemName: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#111827',
    marginTop: 6,
    height: 30,
  },
  recPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginTop: 4,
  },
  recCurrentPrice: {
    fontSize: 12,
    fontWeight: '900',
    color: '#111827',
  },
  recOriginalPrice: {
    fontSize: 9.5,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  recAddBtn: {
    marginTop: 8,
    backgroundColor: '#000000',
    paddingVertical: 5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  recAddBtnText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },

  /* Detailed Bill Breakdown */
  billDetailsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 12,
    marginTop: 14,
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  billHeading: {
    fontSize: 12.5,
    fontWeight: '900',
    color: '#6B7280',
    letterSpacing: 0.5,
  },
  billDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  billLabel: {
    fontSize: 12.5,
    color: '#374151',
  },
  billValue: {
    fontSize: 12.5,
    fontWeight: '700',
    color: '#111827',
  },
  billGreenValue: {
    color: '#16A34A',
  },
  freeDeliveryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  strikethroughFee: {
    fontSize: 11,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  billTotalDivider: {
    height: 1,
    backgroundColor: '#D1D5DB',
    borderStyle: 'dashed',
    marginVertical: 10,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '900',
    color: '#111827',
  },
  totalAmount: {
    fontSize: 17,
    fontWeight: '900',
    color: '#111827',
  },
  savingsCalloutBox: {
    backgroundColor: '#DCFCE7',
    borderWidth: 1,
    borderColor: '#86EFAC',
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  savingsCalloutText: {
    color: '#15803D',
    fontSize: 12,
    fontWeight: '800',
  },

  /* Safety badges */
  safetyBadgesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    paddingHorizontal: 16,
    gap: 8,
  },
  safetyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  safetyText: {
    fontSize: 10,
    color: '#6B7280',
    fontWeight: '600',
  },
  safetyDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#D1D5DB',
  },

  /* Sticky Bottom Bar */
  bottomCheckoutBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  bottomPriceCol: {
    flex: 1,
  },
  bottomTotalHeading: {
    fontSize: 10.5,
    color: '#6B7280',
    fontWeight: '700',
  },
  bottomPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  bottomPriceText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111827',
  },
  bottomSavingsBadge: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#16A34A',
  },
  placeOrderBtn: {
    backgroundColor: '#000000',
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  placeOrderBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 0.3,
  },

  /* Modals Common Backdrop */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },

  /* Address Modal */
  addressModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
    maxHeight: '75%',
  },
  modalHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#111827',
  },
  modalCloseBtn: {
    padding: 4,
  },
  addressListScroll: {
    marginBottom: 10,
  },
  addressCardItem: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#F9FAFB',
  },
  addressCardItemActive: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  addressRadioRow: {
    flexDirection: 'row',
    gap: 10,
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  radioCircleActive: {
    borderColor: '#2563EB',
  },
  radioInnerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563EB',
  },
  addressCardInfo: {
    flex: 1,
  },
  addressCardNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addressCardName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
  },
  addressCardLine: {
    fontSize: 11.5,
    color: '#4B5563',
    marginTop: 2,
  },
  addressCardCity: {
    fontSize: 11,
    color: '#6B7280',
    marginTop: 1,
  },
  addressCardPhone: {
    fontSize: 11,
    fontWeight: '600',
    color: '#374151',
    marginTop: 4,
  },
  addNewAddressBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2563EB',
    borderStyle: 'dashed',
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
    marginTop: 6,
  },
  addNewAddressText: {
    color: '#2563EB',
    fontSize: 12.5,
    fontWeight: '800',
  },

  /* Delete Item Modal */
  confirmModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    alignItems: 'center',
  },
  confirmIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  confirmModalTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#111827',
  },
  confirmModalDesc: {
    fontSize: 12.5,
    color: '#4B5563',
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 18,
  },
  confirmActionsCol: {
    width: '100%',
    marginTop: 16,
    gap: 8,
  },
  confirmSaveForLaterBtn: {
    backgroundColor: '#EFF6FF',
    paddingVertical: 11,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  confirmSaveForLaterText: {
    color: '#2563EB',
    fontSize: 13,
    fontWeight: '800',
  },
  confirmDeleteBtn: {
    backgroundColor: '#DC2626',
    paddingVertical: 11,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmDeleteBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },
  confirmCancelBtn: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  confirmCancelBtnText: {
    color: '#6B7280',
    fontSize: 12.5,
    fontWeight: '700',
  },

  /* Order Placed Success Modal */
  orderSuccessContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  successCheckCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#16A34A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#16A34A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111827',
  },
  successOrderNumber: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '700',
    marginTop: 2,
  },
  orderSummaryCard: {
    width: '100%',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    padding: 14,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  orderSummaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderSummaryLabel: {
    fontSize: 12,
    color: '#4B5563',
  },
  orderSummaryValue: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },
  orderSummaryTotal: {
    fontSize: 14,
    fontWeight: '900',
    color: '#111827',
  },
  orderSummaryValueHighlight: {
    fontSize: 12,
    fontWeight: '800',
    color: '#16A34A',
  },
  deliveryTrackingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
    padding: 10,
    gap: 8,
    marginTop: 12,
    width: '100%',
  },
  deliveryTrackingText: {
    fontSize: 11,
    color: '#1E40AF',
    fontWeight: '600',
    flex: 1,
  },
  continueShoppingBtn: {
    backgroundColor: '#000000',
    width: '100%',
    paddingVertical: 13,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
  },
  continueShoppingBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
  },
});

export default CartScreen;
