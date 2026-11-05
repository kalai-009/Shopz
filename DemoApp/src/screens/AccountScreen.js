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
  Switch,
} from 'react-native';
import {
  Package,
  Heart,
  Tag,
  Headphones,
  CreditCard,
  Wallet,
  MapPin,
  Globe,
  ShieldCheck,
  LogOut,
  ChevronRight,
  Star,
  Truck,
  Sparkles,
  Check,
  CheckCircle2,
  Edit3,
  Camera,
  Phone,
  Mail,
  Coins,
  HelpCircle,
  X,
  Plus,
  ShoppingCart,
  Copy,
  MessageSquare,
} from 'lucide-react-native';
import { useCart, COUPON_CODES } from '../context/CartContext';

// Saved addresses sample data matching CartScreen
const INITIAL_ADDRESSES = [
  {
    id: 'addr_1',
    tag: 'HOME',
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    addressLine: 'Flat 402, Sunshine Heights, 12th Main Road, Koramangala 4th Block',
    cityStatePin: 'Bengaluru, Karnataka - 560034',
    isDefault: true,
  },
  {
    id: 'addr_2',
    tag: 'WORK',
    name: 'Rahul Sharma',
    phone: '+91 98765 43210',
    addressLine: 'Unit 304, Cyber Park, Outer Ring Road, Bellandur',
    cityStatePin: 'Bengaluru, Karnataka - 560103',
    isDefault: false,
  },
  {
    id: 'addr_3',
    tag: 'PARENTS',
    name: 'Sunita Sharma',
    phone: '+91 91234 56789',
    addressLine: '15, Shanti Niketan Marg, Civil Lines',
    cityStatePin: 'Jaipur, Rajasthan - 302006',
    isDefault: false,
  },
];

// Past orders list
const PAST_ORDERS = [
  {
    id: 'ORD-89421',
    name: 'Galaxy S24 Ultra 5G',
    variant: 'Titanium Black • 256GB',
    price: '₹1,29,999',
    status: 'Arriving Tomorrow by 11 AM',
    statusType: 'in_transit',
    date: '3 Nov 2026',
    image: require('../assests/samsung.png'),
    otp: '7412',
  },
  {
    id: 'ORD-76192',
    name: 'AirPods Pro (2nd Gen)',
    variant: 'MagSafe USB-C Case',
    price: '₹20,999',
    status: 'Delivered on Oct 28',
    statusType: 'delivered',
    date: '28 Oct 2026',
    image: require('../assests/airpods.png'),
    rating: 5,
  },
  {
    id: 'ORD-65311',
    name: 'Urban Oversized Hoodie',
    variant: 'Charcoal Grey • Size L',
    price: '₹2,499',
    status: 'Delivered on Oct 21',
    statusType: 'delivered',
    date: '21 Oct 2026',
    image: require('../assests/hoodie.png'),
    rating: 4,
  },
];

// Recently viewed products
const RECENTLY_VIEWED = [
  {
    id: 'rec_rv1',
    name: 'Digital Sports Watch',
    brand: 'Chrono Tech',
    price: 1299,
    originalPrice: 2599,
    discount: '50% off',
    rating: 4.5,
    image: require('../assests/digitalwatch.png'),
  },
  {
    id: 'rec_rv2',
    name: 'AirPods Pro (2nd Gen)',
    brand: 'Apple',
    price: 20999,
    originalPrice: 24900,
    discount: '15% off',
    rating: 4.8,
    image: require('../assests/airpods.png'),
  },
  {
    id: 'rec_rv3',
    name: 'Arabica Roasted Coffee',
    brand: 'Blue Tokai',
    price: 749,
    originalPrice: 999,
    discount: '25% off',
    rating: 4.7,
    image: require('../assests/coffee.png'),
  },
  {
    id: 'rec_rv4',
    name: 'Kobo Pro Cricket Kit',
    brand: 'Kobo Pro',
    price: 2199,
    originalPrice: 4000,
    discount: '45% off',
    rating: 4.6,
    image: require('../assests/cricket.png'),
  },
];

// Supported languages
const LANGUAGES = [
  { id: 'en', name: 'English', native: 'English (UK/IN)' },
  { id: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { id: 'bn', name: 'Bengali', native: 'বাংলা' },
  { id: 'te', name: 'Telugu', native: 'తెలుగు' },
  { id: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { id: 'mr', name: 'Marathi', native: 'मराठी' },
];

const AccountScreen = ({ navigation }) => {
  const { totalItemCount: cartCount, addToCart, showToast, availableSuperCoins } = useCart();

  // User Profile State
  const [profile, setProfile] = useState({
    name: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    phone: '+91 98765 43210',
    gender: 'Male',
    dob: '14 August 1996',
  });

  // Modal Visibility States
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [addressesModal, setAddressesModal] = useState(false);
  const [ordersModal, setOrdersModal] = useState(false);
  const [couponsModal, setCouponsModal] = useState(false);
  const [languageModal, setLanguageModal] = useState(false);
  const [helpModal, setHelpModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [walletModal, setWalletModal] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

  // Edit profile form state
  const [editName, setEditName] = useState(profile.name);
  const [editEmail, setEditEmail] = useState(profile.email);
  const [editPhone, setEditPhone] = useState(profile.phone);
  const [editGender, setEditGender] = useState(profile.gender);

  // Addresses State
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  // Notification switches state
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [promoAlerts, setPromoAlerts] = useState(false);
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);

  // Wishlist preview items
  const [wishlistCount] = useState(12);

  // Handlers
  const handleSaveProfile = () => {
    if (!editName.trim()) {
      showToast('Name cannot be empty');
      return;
    }
    setProfile({
      ...profile,
      name: editName.trim(),
      email: editEmail.trim(),
      phone: editPhone.trim(),
      gender: editGender,
    });
    setEditProfileModal(false);
    showToast('Profile updated successfully!');
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id }))
    );
    showToast('Default delivery address updated!');
  };

  const handleCopyCoupon = (code) => {
    showToast(`Copied coupon code: ${code}`);
  };

  const handleAddRecentlyViewed = (item) => {
    addToCart(item, 1);
  };

  const handleConfirmLogout = () => {
    setLogoutModal(false);
    showToast('Logged out successfully');
  };

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
          <View>
            <Text style={styles.brandTitle}>
              ShopZ <Text style={styles.brandTitlePlus}>Plus</Text>
            </Text>
            <Text style={styles.headerSubtitle}>My Account & Preferences</Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.headerIconButton}
              activeOpacity={0.7}
              onPress={() => setCouponsModal(true)}
              accessibilityLabel="Coupons"
            >
              <Tag size={22} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.headerIconButton}
              activeOpacity={0.7}
              onPress={() => setHelpModal(true)}
              accessibilityLabel="Help Support"
            >
              <HelpCircle size={22} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.headerIconButton}
              activeOpacity={0.7}
              onPress={() => navigation?.navigate?.('Cart')}
              accessibilityLabel="Cart"
            >
              <ShoppingCart size={22} color="#FFFFFF" />
              {cartCount > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cartCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* User Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileRow}>
            <View style={styles.avatarWrap}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>
                  {profile.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .substring(0, 2)
                    .toUpperCase()}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.avatarBadge}
                activeOpacity={0.8}
                onPress={() => setEditProfileModal(true)}
              >
                <Camera size={12} color="#000000" />
              </TouchableOpacity>
            </View>

            <View style={styles.profileDetails}>
              <View style={styles.nameRow}>
                <Text style={styles.profileName} numberOfLines={1}>
                  {profile.name}
                </Text>
                <TouchableOpacity
                  style={styles.editPill}
                  activeOpacity={0.7}
                  onPress={() => {
                    setEditName(profile.name);
                    setEditEmail(profile.email);
                    setEditPhone(profile.phone);
                    setEditGender(profile.gender);
                    setEditProfileModal(true);
                  }}
                >
                  <Edit3 size={11} color="#000000" />
                  <Text style={styles.editPillText}>Edit</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.profileContact} numberOfLines={1}>
                {profile.phone}
              </Text>
              <Text style={styles.profileEmail} numberOfLines={1}>
                {profile.email}
              </Text>
            </View>
          </View>

          {/* Plus Member Banner Strip */}
          
          
        </View>

        {/* 4 Core Quick Actions (Flipkart style 2x2 grid) */}
        <View style={styles.quickActionsGrid}>
          <TouchableOpacity
            style={styles.quickActionBox}
            activeOpacity={0.7}
            onPress={() => setOrdersModal(true)}
          >
            <View style={[styles.quickIconWrap, styles.bgBlueLight]}>
              <Package size={22} color="#2563EB" />
            </View>
            <View style={styles.quickTextWrap}>
              <View style={styles.quickTitleRow}>
                <Text style={styles.quickTitle}>Orders</Text>
                <View style={styles.activeDotBadge}>
                  <Text style={styles.activeDotText}>3 Active</Text>
                </View>
              </View>
              <Text style={styles.quickSubtitle}>Track, return & buy again</Text>
            </View>
            <ChevronRight size={16} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionBox}
            activeOpacity={0.7}
            onPress={() =>
              showToast(`You have ${wishlistCount} saved wishlist items!`)
            }
          >
            <View style={[styles.quickIconWrap, styles.bgRedLight]}>
              <Heart size={22} color="#DC2626" />
            </View>
            <View style={styles.quickTextWrap}>
              <View style={styles.quickTitleRow}>
                <Text style={styles.quickTitle}>Wishlist</Text>
                <View style={[styles.activeDotBadge, styles.bgRedLight]}>
                  <Text style={[styles.activeDotText, styles.textRed]}>
                    {wishlistCount} Items
                  </Text>
                </View>
              </View>
              <Text style={styles.quickSubtitle}>Your saved favorites</Text>
            </View>
            <ChevronRight size={16} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionBox}
            activeOpacity={0.7}
            onPress={() => setCouponsModal(true)}
          >
            <View style={[styles.quickIconWrap, styles.bgYellowLight]}>
              <Tag size={22} color="#D97706" />
            </View>
            <View style={styles.quickTextWrap}>
              <View style={styles.quickTitleRow}>
                <Text style={styles.quickTitle}>Coupons</Text>
                <View style={[styles.activeDotBadge, styles.bgYellowLight]}>
                  <Text style={[styles.activeDotText, styles.textYellow]}>
                    3 Active
                  </Text>
                </View>
              </View>
              <Text style={styles.quickSubtitle}>Extra discounts & offers</Text>
            </View>
            <ChevronRight size={16} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionBox}
            activeOpacity={0.7}
            onPress={() => setHelpModal(true)}
          >
            <View style={[styles.quickIconWrap, styles.bgGreenLight]}>
              <Headphones size={22} color="#059669" />
            </View>
            <View style={styles.quickTextWrap}>
              <Text style={styles.quickTitle}>Help Center</Text>
              <Text style={styles.quickSubtitle}>24x7 Customer Support</Text>
            </View>
            <ChevronRight size={16} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Live Active Order Tracking Card */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionTitleWithIcon}>
              <Truck size={18} color="#2563EB" />
              <Text style={styles.sectionTitle}>Latest Order in Progress</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setOrdersModal(true)}
            >
              <Text style={styles.sectionActionLink}>All Orders (3) →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.liveOrderBox}>
            <Image
              source={PAST_ORDERS[0].image}
              style={styles.liveOrderThumb}
              resizeMode="contain"
            />
            <View style={styles.liveOrderInfo}>
              <View style={styles.liveStatusRow}>
                <View style={styles.liveGreenDot} />
                <Text style={styles.liveStatusText}>
                  {PAST_ORDERS[0].status}
                </Text>
              </View>
              <Text style={styles.liveProductName} numberOfLines={1}>
                {PAST_ORDERS[0].name}
              </Text>
              <Text style={styles.liveProductVariant}>
                {PAST_ORDERS[0].variant} • {PAST_ORDERS[0].price}
              </Text>
              <Text style={styles.deliveryPinText}>
                Delivery OTP: <Text style={styles.boldText}>{PAST_ORDERS[0].otp}</Text>
              </Text>
            </View>
          </View>

          {/* Shipment Step Indicator */}
          <View style={styles.shipmentStepsRow}>
            <View style={styles.stepItem}>
              <View style={[styles.stepCircle, styles.stepCircleCompleted]}>
                <Check size={12} color="#FFFFFF" />
              </View>
              <Text style={styles.stepTextActive}>Ordered</Text>
            </View>
            <View style={[styles.stepLine, styles.stepLineActive]} />
            <View style={styles.stepItem}>
              <View style={[styles.stepCircle, styles.stepCircleCompleted]}>
                <Check size={12} color="#FFFFFF" />
              </View>
              <Text style={styles.stepTextActive}>Packed</Text>
            </View>
            <View style={[styles.stepLine, styles.stepLineActive]} />
            <View style={styles.stepItem}>
              <View style={[styles.stepCircle, styles.stepCircleCurrent]}>
                <Truck size={12} color="#FFFFFF" />
              </View>
              <Text style={styles.stepTextActive}>Shipped</Text>
            </View>
            <View style={styles.stepLine} />
            <View style={styles.stepItem}>
              <View style={styles.stepCircle}>
                <MapPin size={12} color="#9CA3AF" />
              </View>
              <Text style={styles.stepTextInactive}>Delivery</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.trackDetailsBtn}
            activeOpacity={0.7}
            onPress={() => setSelectedOrderDetails(PAST_ORDERS[0])}
          >
            <Text style={styles.trackDetailsBtnText}>View Detailed Tracking</Text>
            <ChevronRight size={15} color="#2563EB" />
          </TouchableOpacity>
        </View>

        {/* Credit & Finance / Wallets */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>Credit & Payments</Text>

          <TouchableOpacity
            style={styles.menuRowItem}
            activeOpacity={0.7}
            onPress={() => setWalletModal(true)}
          >
            <View style={[styles.menuIconCircle, styles.bgYellowLight]}>
              <Wallet size={18} color="#D97706" />
            </View>
            <View style={styles.menuContent}>
              <View style={styles.menuTitleRow}>
                <Text style={styles.menuTitle}>ShopZ Pay Later</Text>
                <View style={styles.statusChipGreen}>
                  <Text style={styles.statusChipGreenText}>Active</Text>
                </View>
              </View>
              <Text style={styles.menuSub}>
                Approved Limit: ₹25,000 • Available: ₹18,450
              </Text>
            </View>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity
            style={styles.menuRowItem}
            activeOpacity={0.7}
            onPress={() =>
              showToast('ShopZ Axis Bank Card: 5% Unlimited Cashback!')
            }
          >
            <View style={[styles.menuIconCircle, styles.bgPurpleLight]}>
              <CreditCard size={18} color="#7C3AED" />
            </View>
            <View style={styles.menuContent}>
              <View style={styles.menuTitleRow}>
                <Text style={styles.menuTitle}>ShopZ Co-Branded Card</Text>
                <View style={styles.statusChipGold}>
                  <Text style={styles.statusChipGoldText}>5% Cashback</Text>
                </View>
              </View>
              <Text style={styles.menuSub}>
                Lifetime free credit card • No joining fee
              </Text>
            </View>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity
            style={styles.menuRowItem}
            activeOpacity={0.7}
            onPress={() =>
              showToast('ShopZ Gift Card Balance: ₹500.00 is ready for checkout!')
            }
          >
            <View style={[styles.menuIconCircle, styles.bgGreenLight]}>
              <Coins size={18} color="#059669" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Gift Cards & Wallet</Text>
              <Text style={styles.menuSub}>Balance: ₹500.00 • + Add Gift Card</Text>
            </View>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Account Settings & Preferences */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>Account Settings</Text>

          <TouchableOpacity
            style={styles.menuRowItem}
            activeOpacity={0.7}
            onPress={() => setAddressesModal(true)}
          >
            <View style={[styles.menuIconCircle, styles.bgBlueLight]}>
              <MapPin size={18} color="#2563EB" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Saved Delivery Addresses</Text>
              <Text style={styles.menuSub}>
                {addresses.length} saved addresses • {addresses.find((a) => a.isDefault)?.tag || 'HOME'} Default
              </Text>
            </View>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity
            style={styles.menuRowItem}
            activeOpacity={0.7}
            onPress={() => setLanguageModal(true)}
          >
            <View style={[styles.menuIconCircle, styles.bgOrangeLight]}>
              <Globe size={18} color="#EA580C" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Select App Language</Text>
              <Text style={styles.menuSub}>Current: {selectedLanguage}</Text>
            </View>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity
            style={styles.menuRowItem}
            activeOpacity={0.7}
            onPress={() =>
              showToast('Saved cards & UPI methods are 256-bit encrypted')
            }
          >
            <View style={[styles.menuIconCircle, styles.bgVioletLight]}>
              <ShieldCheck size={18} color="#6D28D9" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Saved Cards & UPI IDs</Text>
              <Text style={styles.menuSub}>HDFC Visa ending 4821 • rahul@okaxis</Text>
            </View>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Notifications & Communications */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>Notification Preferences</Text>

          <View style={styles.switchRowItem}>
            <View style={styles.switchLabelWrap}>
              <Text style={styles.switchTitle}>Order & Delivery Updates</Text>
              <Text style={styles.switchSubtitle}>
                Instant notifications for dispatch, out for delivery & OTP
              </Text>
            </View>
            <Switch
              value={orderAlerts}
              onValueChange={(val) => {
                setOrderAlerts(val);
                showToast(val ? 'Order alerts enabled' : 'Order alerts muted');
              }}
              trackColor={{ false: '#D1D5DB', true: '#000000' }}
              thumbColor={orderAlerts ? '#FFFFFF' : '#9CA3AF'}
            />
          </View>

          <View style={styles.menuDivider} />

          <View style={styles.switchRowItem}>
            <View style={styles.switchLabelWrap}>
              <Text style={styles.switchTitle}>WhatsApp Order Updates</Text>
              <Text style={styles.switchSubtitle}>
                Receive tracking links and digital invoices on WhatsApp
              </Text>
            </View>
            <Switch
              value={whatsappAlerts}
              onValueChange={(val) => {
                setWhatsappAlerts(val);
                showToast(val ? 'WhatsApp alerts enabled' : 'WhatsApp alerts disabled');
              }}
              trackColor={{ false: '#D1D5DB', true: '#000000' }}
              thumbColor={whatsappAlerts ? '#FFFFFF' : '#9CA3AF'}
            />
          </View>

          <View style={styles.menuDivider} />

          <View style={styles.switchRowItem}>
            <View style={styles.switchLabelWrap}>
              <Text style={styles.switchTitle}>Deals & Price Drop Alerts</Text>
              <Text style={styles.switchSubtitle}>
                Notify when wishlist items get discounted
              </Text>
            </View>
            <Switch
              value={promoAlerts}
              onValueChange={(val) => {
                setPromoAlerts(val);
                showToast(val ? 'Deals alerts enabled' : 'Deals alerts disabled');
              }}
              trackColor={{ false: '#D1D5DB', true: '#000000' }}
              thumbColor={promoAlerts ? '#FFFFFF' : '#9CA3AF'}
            />
          </View>
        </View>

        {/* Recently Viewed Products Horizontal List */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionHeading}>Recently Viewed</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => showToast('Browsing history clear')}
            >
              <Text style={styles.sectionActionLink}>Clear History</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recentListContent}
          >
            {RECENTLY_VIEWED.map((item) => (
              <View key={item.id} style={styles.recentItemCard}>
                <View style={styles.recentImageWrap}>
                  <Image
                    source={item.image}
                    style={styles.recentImage}
                    resizeMode="contain"
                  />
                  <View style={styles.recentDiscountTag}>
                    <Text style={styles.recentDiscountText}>{item.discount}</Text>
                  </View>
                </View>
                <Text style={styles.recentItemName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.recentItemBrand}>{item.brand}</Text>
                <View style={styles.recentPriceRow}>
                  <Text style={styles.recentItemPrice}>
                    ₹{item.price.toLocaleString('en-IN')}
                  </Text>
                  <Text style={styles.recentItemOriginal}>
                    ₹{item.originalPrice.toLocaleString('en-IN')}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.recentAddBtn}
                  activeOpacity={0.7}
                  onPress={() => handleAddRecentlyViewed(item)}
                >
                  <Plus size={13} color="#FFFFFF" />
                  <Text style={styles.recentAddBtnText}>Add</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* My Activity & Support */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionHeading}>My Activity</Text>

          <TouchableOpacity
            style={styles.menuRowItem}
            activeOpacity={0.7}
            onPress={() =>
              showToast('You have submitted 4 reviews with 94 helpful votes!')
            }
          >
            <View style={[styles.menuIconCircle, styles.bgYellowLight]}>
              <Star size={18} color="#D97706" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Reviews & Ratings</Text>
              <Text style={styles.menuSub}>4 reviews • Top 5% Contributor</Text>
            </View>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <View style={styles.menuDivider} />

          <TouchableOpacity
            style={styles.menuRowItem}
            activeOpacity={0.7}
            onPress={() =>
              showToast('2 answers published for community questions')
            }
          >
            <View style={[styles.menuIconCircle, styles.bgBlueLight]}>
              <MessageSquare size={18} color="#2563EB" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>Questions & Answers</Text>
              <Text style={styles.menuSub}>2 questions answered</Text>
            </View>
            <ChevronRight size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* Legal & App Details */}
        <View style={styles.legalSection}>
          <View style={styles.legalLinksRow}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => showToast('Terms of Use')}
            >
              <Text style={styles.legalLinkText}>Terms of Use</Text>
            </TouchableOpacity>
            <Text style={styles.legalBullet}>•</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => showToast('Privacy Policy')}
            >
              <Text style={styles.legalLinkText}>Privacy Policy</Text>
            </TouchableOpacity>
            <Text style={styles.legalBullet}>•</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => showToast('Grievance Redressal')}
            >
              <Text style={styles.legalLinkText}>Grievance</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.appVersionText}>
            ShopZ App v2.4.12 • Built with React Native
          </Text>
        </View>

        {/* Log Out Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          activeOpacity={0.8}
          onPress={() => setLogoutModal(true)}
        >
          <LogOut size={18} color="#DC2626" />
          <Text style={styles.logoutButtonText}>Log Out from All Devices</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* MODAL 1: Edit Profile */}
      <Modal
        visible={editProfileModal}
        transparent
        animationType="slide"
        onRequestClose={() => setEditProfileModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity
                onPress={() => setEditProfileModal(false)}
                style={styles.modalCloseBtn}
              >
                <X size={20} color="#111827" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <TextInput
                  style={styles.textInput}
                  value={editName}
                  onChangeText={setEditName}
                  placeholder="Enter your name"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email Address</Text>
                <TextInput
                  style={styles.textInput}
                  value={editEmail}
                  onChangeText={setEditEmail}
                  keyboardType="email-address"
                  placeholder="name@example.com"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Mobile Number</Text>
                <TextInput
                  style={styles.textInput}
                  value={editPhone}
                  onChangeText={setEditPhone}
                  keyboardType="phone-pad"
                  placeholder="+91 00000 00000"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Gender</Text>
                <View style={styles.genderOptionsRow}>
                  {['Male', 'Female', 'Other'].map((g) => (
                    <TouchableOpacity
                      key={g}
                      style={[
                        styles.genderPill,
                        editGender === g && styles.genderPillActive,
                      ]}
                      onPress={() => setEditGender(g)}
                    >
                      <Text
                        style={[
                          styles.genderPillText,
                          editGender === g && styles.genderPillTextActive,
                        ]}
                      >
                        {g}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <TouchableOpacity
                style={styles.primaryModalBtn}
                activeOpacity={0.8}
                onPress={handleSaveProfile}
              >
                <Text style={styles.primaryModalBtnText}>Save Changes</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* MODAL 2: Saved Addresses */}
      <Modal
        visible={addressesModal}
        transparent
        animationType="slide"
        onRequestClose={() => setAddressesModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCardLarge}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Saved Addresses</Text>
              <TouchableOpacity
                onPress={() => setAddressesModal(false)}
                style={styles.modalCloseBtn}
              >
                <X size={20} color="#111827" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {addresses.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.addressItemCard,
                    item.isDefault && styles.addressItemCardActive,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => handleSetDefaultAddress(item.id)}
                >
                  <View style={styles.addressHeaderRow}>
                    <View style={styles.addressTagRow}>
                      <View style={styles.addressTagPill}>
                        <Text style={styles.addressTagPillText}>{item.tag}</Text>
                      </View>
                      {item.isDefault && (
                        <View style={styles.defaultPill}>
                          <Check size={11} color="#059669" />
                          <Text style={styles.defaultPillText}>Default</Text>
                        </View>
                      )}
                    </View>
                    <View
                      style={[
                        styles.radioCircle,
                        item.isDefault && styles.radioCircleActive,
                      ]}
                    >
                      {item.isDefault && <View style={styles.radioDot} />}
                    </View>
                  </View>

                  <Text style={styles.addressName}>{item.name}</Text>
                  <Text style={styles.addressPhone}>{item.phone}</Text>
                  <Text style={styles.addressLines}>
                    {item.addressLine}, {item.cityStatePin}
                  </Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity
                style={styles.addAddressBtn}
                activeOpacity={0.8}
                onPress={() => {
                  showToast('Add new address form');
                }}
              >
                <Plus size={18} color="#000000" />
                <Text style={styles.addAddressBtnText}>Add New Delivery Address</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* MODAL 3: Order History */}
      <Modal
        visible={ordersModal}
        transparent
        animationType="slide"
        onRequestClose={() => setOrdersModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCardLarge}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>My Orders</Text>
              <TouchableOpacity
                onPress={() => setOrdersModal(false)}
                style={styles.modalCloseBtn}
              >
                <X size={20} color="#111827" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {PAST_ORDERS.map((ord) => (
                <TouchableOpacity
                  key={ord.id}
                  style={styles.orderListItem}
                  activeOpacity={0.8}
                  onPress={() => setSelectedOrderDetails(ord)}
                >
                  <Image
                    source={ord.image}
                    style={styles.orderListImage}
                    resizeMode="contain"
                  />
                  <View style={styles.orderListDetails}>
                    <Text style={styles.orderListStatus} numberOfLines={1}>
                      {ord.status}
                    </Text>
                    <Text style={styles.orderListName} numberOfLines={1}>
                      {ord.name}
                    </Text>
                    <Text style={styles.orderListVariant}>{ord.variant}</Text>
                    <View style={styles.orderListFooter}>
                      <Text style={styles.orderListPrice}>{ord.price}</Text>
                      <Text style={styles.orderListId}>{ord.id}</Text>
                    </View>
                  </View>
                  <ChevronRight size={18} color="#9CA3AF" />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* MODAL 4: Single Order Detailed Tracking */}
      <Modal
        visible={!!selectedOrderDetails}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedOrderDetails(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Order Details & Tracking</Text>
              <TouchableOpacity
                onPress={() => setSelectedOrderDetails(null)}
                style={styles.modalCloseBtn}
              >
                <X size={20} color="#111827" />
              </TouchableOpacity>
            </View>

            {selectedOrderDetails && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.modalProductHeader}>
                  <Image
                    source={selectedOrderDetails.image}
                    style={styles.modalProductThumb}
                    resizeMode="contain"
                  />
                  <View style={styles.modalProductInfo}>
                    <Text style={styles.modalProductName}>
                      {selectedOrderDetails.name}
                    </Text>
                    <Text style={styles.modalProductVariant}>
                      {selectedOrderDetails.variant}
                    </Text>
                    <Text style={styles.modalProductPrice}>
                      {selectedOrderDetails.price}
                    </Text>
                  </View>
                </View>

                <View style={styles.trackingTimelineBox}>
                  <Text style={styles.timelineTitle}>Tracking Journey</Text>

                  <View style={styles.timelineRow}>
                    <View style={styles.timelineLeft}>
                      <View style={[styles.timelineDot, styles.timelineDotActive]} />
                      <View style={styles.timelineVerticalLine} />
                    </View>
                    <View style={styles.timelineRight}>
                      <Text style={styles.timelineStatusTitle}>Order Confirmed</Text>
                      <Text style={styles.timelineStatusDesc}>
                        Received on {selectedOrderDetails.date}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.timelineRow}>
                    <View style={styles.timelineLeft}>
                      <View style={[styles.timelineDot, styles.timelineDotActive]} />
                      <View style={styles.timelineVerticalLine} />
                    </View>
                    <View style={styles.timelineRight}>
                      <Text style={styles.timelineStatusTitle}>Item Packed</Text>
                      <Text style={styles.timelineStatusDesc}>
                        Dispatched from Bengaluru fulfillment hub
                      </Text>
                    </View>
                  </View>

                  <View style={styles.timelineRow}>
                    <View style={styles.timelineLeft}>
                      <View style={[styles.timelineDot, styles.timelineDotActive]} />
                      <View style={styles.timelineVerticalLine} />
                    </View>
                    <View style={styles.timelineRight}>
                      <Text style={styles.timelineStatusTitle}>In Transit (Near Destination)</Text>
                      <Text style={styles.timelineStatusDesc}>
                        Koramangala Delivery Hub
                      </Text>
                    </View>
                  </View>

                  <View style={styles.timelineRow}>
                    <View style={styles.timelineLeft}>
                      <View
                        style={[
                          styles.timelineDot,
                          selectedOrderDetails.statusType === 'delivered'
                            ? styles.timelineDotActive
                            : styles.timelineDotPending,
                        ]}
                      />
                    </View>
                    <View style={styles.timelineRight}>
                      <Text style={styles.timelineStatusTitle}>
                        {selectedOrderDetails.statusType === 'delivered'
                          ? 'Delivered'
                          : 'Out for Delivery'}
                      </Text>
                      <Text style={styles.timelineStatusDesc}>
                        {selectedOrderDetails.status}
                      </Text>
                    </View>
                  </View>
                </View>

                {selectedOrderDetails.otp && (
                  <View style={styles.otpBanner}>
                    <ShieldCheck size={20} color="#059669" />
                    <View style={styles.otpBannerTextWrap}>
                      <Text style={styles.otpBannerTitle}>Delivery Verification OTP</Text>
                      <Text style={styles.otpBannerCode}>
                        {selectedOrderDetails.otp}
                      </Text>
                    </View>
                  </View>
                )}

                <TouchableOpacity
                  style={styles.primaryModalBtn}
                  activeOpacity={0.8}
                  onPress={() => {
                    setSelectedOrderDetails(null);
                    showToast('Contacting delivery agent...');
                  }}
                >
                  <Text style={styles.primaryModalBtnText}>Contact Delivery Agent</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* MODAL 5: Coupons & Promo Codes */}
      <Modal
        visible={couponsModal}
        transparent
        animationType="slide"
        onRequestClose={() => setCouponsModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCardLarge}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Available Coupons</Text>
              <TouchableOpacity
                onPress={() => setCouponsModal(false)}
                style={styles.modalCloseBtn}
              >
                <X size={20} color="#111827" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {Object.values(COUPON_CODES).map((item) => (
                <View key={item.code} style={styles.couponCard}>
                  <View style={styles.couponLeft}>
                    <View style={styles.couponBadge}>
                      <Tag size={14} color="#D97706" />
                      <Text style={styles.couponCodeText}>{item.code}</Text>
                    </View>
                    <Text style={styles.couponLabelText}>{item.label}</Text>
                    <Text style={styles.couponExpiryText}>
                      Valid till 30 Nov 2026
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.copyCouponBtn}
                    activeOpacity={0.7}
                    onPress={() => handleCopyCoupon(item.code)}
                  >
                    <Copy size={14} color="#000000" />
                    <Text style={styles.copyCouponBtnText}>Copy</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* MODAL 6: Language Selection */}
      <Modal
        visible={languageModal}
        transparent
        animationType="slide"
        onRequestClose={() => setLanguageModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Preferred Language</Text>
              <TouchableOpacity
                onPress={() => setLanguageModal(false)}
                style={styles.modalCloseBtn}
              >
                <X size={20} color="#111827" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {LANGUAGES.map((lang) => (
                <TouchableOpacity
                  key={lang.id}
                  style={[
                    styles.languageOption,
                    selectedLanguage === lang.name && styles.languageOptionActive,
                  ]}
                  activeOpacity={0.8}
                  onPress={() => {
                    setSelectedLanguage(lang.name);
                    setLanguageModal(false);
                    showToast(`Language set to ${lang.name}`);
                  }}
                >
                  <View>
                    <Text style={styles.languageNameText}>{lang.name}</Text>
                    <Text style={styles.languageNativeText}>{lang.native}</Text>
                  </View>
                  {selectedLanguage === lang.name && (
                    <CheckCircle2 size={20} color="#000000" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* MODAL 7: 24x7 Help Center */}
      <Modal
        visible={helpModal}
        transparent
        animationType="slide"
        onRequestClose={() => setHelpModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>ShopZ 24x7 Help Center</Text>
              <TouchableOpacity
                onPress={() => setHelpModal(false)}
                style={styles.modalCloseBtn}
              >
                <X size={20} color="#111827" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.helpPromoBox}>
                <Headphones size={28} color="#2563EB" />
                <Text style={styles.helpPromoTitle}>How can we assist you today?</Text>
                <Text style={styles.helpPromoSubtitle}>
                  Instant resolution for orders, returns, refunds & payments
                </Text>
              </View>

              <TouchableOpacity
                style={styles.helpActionItem}
                activeOpacity={0.7}
                onPress={() => {
                  setHelpModal(false);
                  showToast('Connecting with AI Customer Assistant...');
                }}
              >
                <MessageSquare size={18} color="#059669" />
                <View style={styles.helpActionTextWrap}>
                  <Text style={styles.helpActionTitle}>Chat with AI Assistant</Text>
                  <Text style={styles.helpActionSub}>Instant 24x7 answers</Text>
                </View>
                <ChevronRight size={18} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.helpActionItem}
                activeOpacity={0.7}
                onPress={() => {
                  setHelpModal(false);
                  showToast('Requesting callback to +91 98765 43210...');
                }}
              >
                <Phone size={18} color="#2563EB" />
                <View style={styles.helpActionTextWrap}>
                  <Text style={styles.helpActionTitle}>Request a Call Back</Text>
                  <Text style={styles.helpActionSub}>Average wait time: 2 mins</Text>
                </View>
                <ChevronRight size={18} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.helpActionItem}
                activeOpacity={0.7}
                onPress={() => {
                  setHelpModal(false);
                  showToast('Email support ticket opened: support@shopz.in');
                }}
              >
                <Mail size={18} color="#D97706" />
                <View style={styles.helpActionTextWrap}>
                  <Text style={styles.helpActionTitle}>Email Helpdesk</Text>
                  <Text style={styles.helpActionSub}>support@shopz.in</Text>
                </View>
                <ChevronRight size={18} color="#9CA3AF" />
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* MODAL 8: ShopZ Pay Later & Wallet Details */}
      <Modal
        visible={walletModal}
        transparent
        animationType="slide"
        onRequestClose={() => setWalletModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>ShopZ Pay Later</Text>
              <TouchableOpacity
                onPress={() => setWalletModal(false)}
                style={styles.modalCloseBtn}
              >
                <X size={20} color="#111827" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.walletCardGradient}>
                <Text style={styles.walletCardLabel}>AVAILABLE CREDIT LIMIT</Text>
                <Text style={styles.walletCardAmount}>₹18,450.00</Text>
                <View style={styles.walletTotalRow}>
                  <Text style={styles.walletTotalText}>Total Approved: ₹25,000</Text>
                  <Text style={styles.walletUsedText}>Used this month: ₹6,550</Text>
                </View>
              </View>

              <View style={styles.walletBillBox}>
                <View>
                  <Text style={styles.walletBillTitle}>Upcoming Bill</Text>
                  <Text style={styles.walletBillDue}>Due on 10 Nov 2026</Text>
                </View>
                <Text style={styles.walletBillAmount}>₹6,550.00</Text>
              </View>

              <TouchableOpacity
                style={styles.primaryModalBtn}
                activeOpacity={0.8}
                onPress={() => {
                  setWalletModal(false);
                  showToast('Bill paid successfully via UPI!');
                }}
              >
                <Text style={styles.primaryModalBtnText}>Pay Bill Now (₹6,550)</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* MODAL 9: Log Out Confirmation */}
      <Modal
        visible={logoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setLogoutModal(false)}
      >
        <View style={styles.modalOverlayCenter}>
          <View style={styles.alertCard}>
            <View style={styles.alertIconWrap}>
              <LogOut size={26} color="#DC2626" />
            </View>
            <Text style={styles.alertTitle}>Log Out of ShopZ?</Text>
            <Text style={styles.alertSubtitle}>
              You will need to sign in again to view your active orders and saved cart items.
            </Text>

            <View style={styles.alertActionsRow}>
              <TouchableOpacity
                style={styles.alertCancelBtn}
                activeOpacity={0.7}
                onPress={() => setLogoutModal(false)}
              >
                <Text style={styles.alertCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.alertConfirmBtn}
                activeOpacity={0.7}
                onPress={handleConfirmLogout}
              >
                <Text style={styles.alertConfirmText}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },

  /* Top App Bar */
  header: {
    backgroundColor: '#000000',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 14,
    marginTop:1,
    marginLeft:1,
    marginRight:1,
    
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.2,
  },
  brandTitlePlus: {
    color: '#FFB800',
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: '800',
  },
  headerSubtitle: {
    color: '#9CA3AF',
    fontSize: 11,
    marginTop: 2,
    fontWeight: '600',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIconButton: {
    padding: 6,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadge: {
    position: 'absolute',
    top: -2,
    right: -4,
    backgroundColor: '#EF4444',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '900',
  },

  /* Scroll View Body */
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 15,
    paddingBottom: 40,
  },

  /* User Profile Card */
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 2.5 },
    shadowOpacity: 0.08,
    shadowRadius: 7,
    elevation: 2,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarWrap: {
    position: 'relative',
    marginRight: 12,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFB800',
  },
  avatarText: {
    color: '#FFB800',
    fontSize: 24,
    fontWeight: '900',
  },
  avatarBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#FFB800',
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  profileDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  profileName: {
    fontSize: 17,
    fontWeight: '900',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  editPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  editPillText: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#111827',
  },
  profileContact: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4B5563',
    marginBottom: 1,
  },
  profileEmail: {
    fontSize: 11.5,
    fontWeight: '500',
    color: '#6B7280',
  },


  /* 4 Core Quick Actions (Flipkart style) */
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  quickActionBox: {
    width: '48.5%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1.5,
  },
  quickIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  bgBlueLight: {
    backgroundColor: '#EFF6FF',
  },
  bgRedLight: {
    backgroundColor: '#FEE2E2',
  },
  textRed: {
    color: '#DC2626',
  },
  bgYellowLight: {
    backgroundColor: '#FEF3C7',
  },
  textYellow: {
    color: '#B45309',
  },
  bgGreenLight: {
    backgroundColor: '#ECFDF5',
  },
  bgPurpleLight: {
    backgroundColor: '#EDE9FE',
  },
  bgOrangeLight: {
    backgroundColor: '#FFF7ED',
  },
  bgVioletLight: {
    backgroundColor: '#F5F3FF',
  },
  quickTextWrap: {
    flex: 1,
  },
  quickTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 1,
  },
  quickTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
  },
  activeDotBadge: {
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 6,
  },
  activeDotText: {
    fontSize: 8.5,
    fontWeight: '900',
    color: '#2563EB',
  },
  quickSubtitle: {
    fontSize: 9.5,
    fontWeight: '500',
    color: '#6B7280',
  },

  /* General Section Card */
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1.5 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 10,
    letterSpacing: -0.2,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionTitle: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#111827',
  },
  sectionActionLink: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#2563EB',
  },

  /* Live Order Box */
  liveOrderBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  liveOrderThumb: {
    width: 55,
    height: 55,
    marginRight: 10,
  },
  liveOrderInfo: {
    flex: 1,
  },
  liveStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 2,
  },
  liveGreenDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  liveStatusText: {
    fontSize: 11.5,
    fontWeight: '900',
    color: '#059669',
  },
  liveProductName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 1,
  },
  liveProductVariant: {
    fontSize: 10.5,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 2,
  },
  deliveryPinText: {
    fontSize: 10.5,
    fontWeight: '600',
    color: '#374151',
  },
  boldText: {
    fontWeight: '900',
    color: '#111827',
  },

  /* Shipment Steps Timeline */
  shipmentStepsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  stepItem: {
    alignItems: 'center',
  },
  stepCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },
  stepCircleCompleted: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  stepCircleCurrent: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 4,
    marginBottom: 15,
  },
  stepLineActive: {
    backgroundColor: '#10B981',
  },
  stepTextActive: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#111827',
  },
  stepTextInactive: {
    fontSize: 9.5,
    fontWeight: '500',
    color: '#9CA3AF',
  },
  trackDetailsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 7,
    backgroundColor: '#EFF6FF',
    borderRadius: 8,
  },
  trackDetailsBtnText: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#2563EB',
  },

  /* Menu Rows */
  menuRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  menuIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  menuContent: {
    flex: 1,
    marginRight: 6,
  },
  menuTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 1,
  },
  menuTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
  },
  menuSub: {
    fontSize: 11,
    fontWeight: '500',
    color: '#6B7280',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 4,
  },
  statusChipGreen: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  statusChipGreenText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#059669',
  },
  statusChipGold: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 6,
  },
  statusChipGoldText: {
    fontSize: 9,
    fontWeight: '900',
    color: '#B45309',
  },

  /* Switch row item */
  switchRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  switchLabelWrap: {
    flex: 1,
    marginRight: 12,
  },
  switchTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 2,
  },
  switchSubtitle: {
    fontSize: 10.5,
    fontWeight: '500',
    color: '#6B7280',
    lineHeight: 14,
  },

  /* Recently viewed horizontal list */
  recentListContent: {
    gap: 10,
    paddingVertical: 4,
  },
  recentItemCard: {
    width: 124,
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  recentImageWrap: {
    height: 80,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
    position: 'relative',
  },
  recentImage: {
    width: '100%',
    height: '100%',
  },
  recentDiscountTag: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#10B981',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 4,
  },
  recentDiscountText: {
    color: '#FFFFFF',
    fontSize: 8.5,
    fontWeight: '900',
  },
  recentItemName: {
    fontSize: 11,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 1,
  },
  recentItemBrand: {
    fontSize: 9.5,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 4,
  },
  recentPriceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  recentItemPrice: {
    fontSize: 11,
    fontWeight: '900',
    color: '#111827',
  },
  recentItemOriginal: {
    fontSize: 9,
    fontWeight: '600',
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  recentAddBtn: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 4,
    borderRadius: 6,
  },
  recentAddBtnText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },

  /* Legal info */
  legalSection: {
    alignItems: 'center',
    marginVertical: 16,
  },
  legalLinksRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  legalLinkText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#6B7280',
  },
  legalBullet: {
    fontSize: 11,
    color: '#9CA3AF',
  },
  appVersionText: {
    fontSize: 10,
    fontWeight: '500',
    color: '#9CA3AF',
  },

  /* Logout button */
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#FEE2E2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 12,
    paddingVertical: 12,
    marginBottom: 20,
  },
  logoutButtonText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#DC2626',
  },
  bottomSpacer: {
    height: 30,
  },

  /* Modal Generic Styles */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalOverlayCenter: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 18,
    maxHeight: '80%',
  },
  modalCardLarge: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 18,
    maxHeight: '88%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#111827',
  },
  modalCloseBtn: {
    padding: 4,
  },

  /* Input fields */
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '800',
    color: '#374151',
    marginBottom: 5,
  },
  textInput: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    color: '#111827',
  },
  genderOptionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  genderPill: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  genderPillActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  genderPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4B5563',
  },
  genderPillTextActive: {
    color: '#FFFFFF',
  },
  primaryModalBtn: {
    backgroundColor: '#000000',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 10,
  },
  primaryModalBtnText: {
    color: '#FFFFFF',
    fontSize: 13.5,
    fontWeight: '800',
  },

  /* Addresses in Modal */
  addressItemCard: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  addressItemCardActive: {
    borderColor: '#000000',
    backgroundColor: '#F3F4F6',
  },
  addressHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  addressTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addressTagPill: {
    backgroundColor: '#E5E7EB',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  addressTagPillText: {
    fontSize: 9.5,
    fontWeight: '900',
    color: '#374151',
  },
  defaultPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  defaultPillText: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#059669',
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: '#9CA3AF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: '#000000',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000000',
  },
  addressName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 1,
  },
  addressPhone: {
    fontSize: 11.5,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 3,
  },
  addressLines: {
    fontSize: 11.5,
    fontWeight: '400',
    color: '#6B7280',
    lineHeight: 16,
  },
  addAddressBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#9CA3AF',
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 6,
    marginBottom: 12,
  },
  addAddressBtnText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#000000',
  },

  /* Order History in Modal */
  orderListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  orderListImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  orderListDetails: {
    flex: 1,
    marginRight: 6,
  },
  orderListStatus: {
    fontSize: 11.5,
    fontWeight: '900',
    color: '#059669',
    marginBottom: 1,
  },
  orderListName: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 1,
  },
  orderListVariant: {
    fontSize: 10,
    color: '#6B7280',
    marginBottom: 2,
  },
  orderListFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orderListPrice: {
    fontSize: 11.5,
    fontWeight: '900',
    color: '#111827',
  },
  orderListId: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '600',
  },

  /* Tracking modal details */
  modalProductHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 10,
    marginBottom: 14,
  },
  modalProductThumb: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  modalProductInfo: {
    flex: 1,
  },
  modalProductName: {
    fontSize: 13.5,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 2,
  },
  modalProductVariant: {
    fontSize: 11,
    color: '#6B7280',
    marginBottom: 3,
  },
  modalProductPrice: {
    fontSize: 13,
    fontWeight: '900',
    color: '#111827',
  },
  trackingTimelineBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 12,
    marginBottom: 12,
  },
  timelineTitle: {
    fontSize: 13,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 10,
  },
  timelineRow: {
    flexDirection: 'row',
  },
  timelineLeft: {
    alignItems: 'center',
    width: 20,
    marginRight: 8,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  timelineDotActive: {
    backgroundColor: '#10B981',
  },
  timelineDotPending: {
    backgroundColor: '#D1D5DB',
  },
  timelineVerticalLine: {
    width: 2,
    height: 32,
    backgroundColor: '#10B981',
  },
  timelineRight: {
    flex: 1,
    paddingBottom: 16,
  },
  timelineStatusTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#111827',
  },
  timelineStatusDesc: {
    fontSize: 10,
    color: '#6B7280',
    marginTop: 1,
  },
  otpBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 10,
    padding: 10,
    gap: 8,
    marginBottom: 10,
  },
  otpBannerTextWrap: {
    flex: 1,
  },
  otpBannerTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#065F46',
  },
  otpBannerCode: {
    fontSize: 16,
    fontWeight: '900',
    color: '#065F46',
    letterSpacing: 2,
  },

  /* Coupons in modal */
  couponCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
    padding: 12,
    marginBottom: 10,
  },
  couponLeft: {
    flex: 1,
    marginRight: 10,
  },
  couponBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  couponCodeText: {
    fontSize: 13,
    fontWeight: '900',
    color: '#B45309',
    letterSpacing: 0.5,
  },
  couponLabelText: {
    fontSize: 11.5,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  couponExpiryText: {
    fontSize: 9.5,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  copyCouponBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    borderWidth: 1,
    borderColor: '#F59E0B',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  copyCouponBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#000000',
  },

  /* Language Modal */
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  languageOptionActive: {
    backgroundColor: '#F9FAFB',
  },
  languageNameText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
  },
  languageNativeText: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
  },

  /* Help Modal */
  helpPromoBox: {
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  helpPromoTitle: {
    fontSize: 14,
    fontWeight: '900',
    color: '#1E3A8A',
    marginTop: 6,
    marginBottom: 2,
  },
  helpPromoSubtitle: {
    fontSize: 11,
    color: '#3B82F6',
    textAlign: 'center',
  },
  helpActionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    gap: 10,
  },
  helpActionTextWrap: {
    flex: 1,
  },
  helpActionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#111827',
  },
  helpActionSub: {
    fontSize: 11,
    color: '#6B7280',
  },

  /* Wallet Modal */
  walletCardGradient: {
    backgroundColor: '#000000',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  walletCardLabel: {
    color: '#FFB800',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  walletCardAmount: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '900',
    marginBottom: 10,
  },
  walletTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.15)',
    paddingTop: 8,
  },
  walletTotalText: {
    color: '#D1D5DB',
    fontSize: 10.5,
    fontWeight: '600',
  },
  walletUsedText: {
    color: '#F87171',
    fontSize: 10.5,
    fontWeight: '600',
  },
  walletBillBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FECACA',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  walletBillTitle: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#991B1B',
  },
  walletBillDue: {
    fontSize: 10.5,
    color: '#B91C1C',
  },
  walletBillAmount: {
    fontSize: 16,
    fontWeight: '900',
    color: '#991B1B',
  },

  /* Logout Dialog */
  alertCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '88%',
    alignItems: 'center',
  },
  alertIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 6,
  },
  alertSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 18,
    lineHeight: 17,
  },
  alertActionsRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
  },
  alertCancelBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
  },
  alertCancelText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#374151',
  },
  alertConfirmBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#DC2626',
    alignItems: 'center',
  },
  alertConfirmText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#FFFFFF',
  },
});

export default AccountScreen;
