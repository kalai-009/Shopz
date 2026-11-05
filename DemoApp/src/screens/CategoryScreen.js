import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {
  Search,
  Mic,
  X,
  ShoppingCart,
  Bell,
  Sparkles,
  ChevronRight,
  ArrowRight,
  Star,
  Zap,
  Flame,
  ShieldCheck,
  Tag,
  Heart,
  Smartphone,
  Shirt,
  Laptop,
  Watch,
  Home,
  Tv,
  Gamepad2,
  Dumbbell,
  ShoppingBag,
  Baby,
  Tablet,
  Headphones,
  Briefcase,
  Camera,
  Monitor,
  Keyboard,
  HardDrive,
  Speaker,
  Bed,
  UtensilsCrossed,
  Lamp,
  Package,
  Wrench,
  Clock,
  Wind,
  Smile,
  Droplets,
  HeartPulse,
  RotateCw,
  Cpu,
  Puzzle,
  Radio,
  Bike,
  Palette,
  Rocket,
  Trophy,
  Coffee,
  Leaf,
  Gift,
  Footprints,
  Scissors,
  Sun,
  Layers,
  Check,
  Plus,
  Minus,
} from 'lucide-react-native';
import { useCart } from '../context/CartContext';

const CATEGORIES_DATA = [
  {
    id: 'mobiles',
    name: 'Mobiles',
    Icon: Smartphone,
    badge: 'HOT',
    badgeColor: '#EF4444',
    banner: {
      badge: '5G LAUNCHFEST',
      BadgeIcon: Zap,
      title: 'Flagship 5G Mobiles',
      subtitle: 'Snapdragon 8 Gen 3 & Bionic A17 Pro',
      discount: 'UP TO 40% OFF',
      bankOffer: '+ Flat ₹5,000 Instant Bank Off',
      bgColor: '#1E3A8A',
      accentColor: '#38BDF8',
      BannerIcon: Smartphone,
    },
    subcategories: [
      { id: 'm1', name: '5G Mobiles', Icon: Smartphone, bgTint: '#EBF5FF', iconColor: '#2563EB' },
      { id: 'm2', name: 'Flagships', Icon: Zap, bgTint: '#FEF3C7', iconColor: '#D97706' },
      { id: 'm3', name: 'Tablets', Icon: Tablet, bgTint: '#F3E8FF', iconColor: '#7C3AED' },
      { id: 'm4', name: 'Cases & Covers', Icon: ShieldCheck, bgTint: '#ECFDF5', iconColor: '#059669' },
      { id: 'm5', name: 'Headphones', Icon: Headphones, bgTint: '#FCE7F3', iconColor: '#DB2777' },
      { id: 'm6', name: 'Smart Watches', Icon: Watch, bgTint: '#EFF6FF', iconColor: '#1D4ED8' },
      { id: 'm7', name: 'Power Banks', Icon: Layers, bgTint: '#FFFBEB', iconColor: '#B45309' },
      { id: 'm8', name: 'Chargers', Icon: RotateCw, bgTint: '#F0FDF4', iconColor: '#16A34A' },
      { id: 'm9', name: 'Accessories', Icon: Flame, bgTint: '#FFF1F2', iconColor: '#E11D48' },
    ],
    deals: [
      {
        id: 'deal_mob_1',
        name: 'Galaxy S24 Ultra 5G',
        brand: 'Samsung',
        rating: 4.9,
        reviews: '3.4k',
        price: '₹1,29,999',
        originalPrice: '₹1,44,999',
        discount: '10% off',
        image: require('../assests/samsung.png'),
      },
      {
        id: 'deal_mob_2',
        name: 'OnePlus 12 5G (16GB RAM)',
        brand: 'OnePlus',
        rating: 4.8,
        reviews: '2.1k',
        price: '₹64,999',
        originalPrice: '₹69,999',
        discount: '7% off',
        image: require('../assests/oneplus.png'),
      },
    ],
    brands: [
      { name: 'Samsung', discount: 'Up to 35% Off' },
      { name: 'Apple', discount: 'Flat ₹5,000 Off' },
      { name: 'OnePlus', discount: 'Up to 25% Off' },
      { name: 'Xiaomi', discount: 'Min 20% Off' },
    ],
  },
  {
    id: 'fashion',
    name: 'Fashion',
    Icon: Shirt,
    badge: 'SALE',
    badgeColor: '#F59E0B',
    banner: {
      badge: 'FASHION CARNIVAL',
      BadgeIcon: Flame,
      title: 'Wardrobe Refresh',
      subtitle: 'Top Brands for Men, Women & Kids',
      discount: 'MIN 50% - 80% OFF',
      bankOffer: 'Free Delivery on First Order',
      bgColor: '#581C87',
      accentColor: '#F472B6',
      BannerIcon: Shirt,
    },
    subcategories: [
      { id: 'f1', name: "Men's Tops", Icon: Shirt, bgTint: '#EEF2FF', iconColor: '#4F46E5' },
      { id: 'f2', name: 'Ethnic Wear', Icon: Sparkles, bgTint: '#FDF2F8', iconColor: '#DB2777' },
      { id: 'f3', name: 'Jeans & Pants', Icon: Scissors, bgTint: '#ECFEFF', iconColor: '#0891B2' },
      { id: 'f4', name: 'Sneakers', Icon: Footprints, bgTint: '#FEF3C7', iconColor: '#D97706' },
      { id: 'f5', name: 'Watches', Icon: Watch, bgTint: '#F3E8FF', iconColor: '#9333EA' },
      { id: 'f6', name: 'Bags & Luggage', Icon: Briefcase, bgTint: '#ECFDF5', iconColor: '#059669' },
      { id: 'f7', name: 'Hoodies', Icon: Flame, bgTint: '#FFF1F2', iconColor: '#E11D48' },
      { id: 'f8', name: 'Kids Fashion', Icon: Baby, bgTint: '#F0FDF4', iconColor: '#16A34A' },
      { id: 'f9', name: 'Winterwear', Icon: Tag, bgTint: '#FFFBEB', iconColor: '#B45309' },
    ],
    deals: [
      {
        id: 'deal_fash_1',
        name: 'Urban Oversized Hoodie',
        brand: 'Zara Streetwear',
        rating: 4.6,
        reviews: '1.2k',
        price: '₹2,499',
        originalPrice: '₹4,999',
        discount: '50% off',
        image: require('../assests/hoodie.png'),
      },
      {
        id: 'deal_fash_2',
        name: 'Classic Slim Fit Denim',
        brand: "Levi's",
        rating: 4.5,
        reviews: '890',
        price: '₹1,899',
        originalPrice: '₹3,999',
        discount: '52% off',
       image: require('../assests/classicfit.png'),
      },
    ],
    brands: [
      { name: 'Zara', discount: 'Min 40% Off' },
      { name: "Levi's", discount: 'Flat 50% Off' },
      { name: 'Nike', discount: 'Min 30% Off' },
      { name: 'H&M', discount: 'Under ₹999' },
    ],
  },
  {
    id: 'electronics',
    name: 'Electronics',
    Icon: Laptop,
    badge: 'DEALS',
    badgeColor: '#10B981',
    banner: {
      badge: 'TECH EXPLOSION',
      BadgeIcon: Sparkles,
      title: 'Laptops & Audio Pro',
      subtitle: 'High Performance for Work & Play',
      discount: 'UP TO 50% OFF',
      bankOffer: 'Up to 12 Months No Cost EMI',
      bgColor: '#064E3B',
      accentColor: '#34D399',
      BannerIcon: Laptop,
    },
    subcategories: [
      { id: 'e1', name: 'Laptops', Icon: Laptop, bgTint: '#ECFDF5', iconColor: '#059669' },
      { id: 'e2', name: 'Earbuds & Audio', Icon: Headphones, bgTint: '#EEF2FF', iconColor: '#4F46E5' },
      { id: 'e3', name: 'Smartwatches', Icon: Watch, bgTint: '#FDF2F8', iconColor: '#DB2777' },
      { id: 'e4', name: 'Gaming Gear', Icon: Gamepad2, bgTint: '#F3E8FF', iconColor: '#7C3AED' },
      { id: 'e5', name: 'Cameras', Icon: Camera, bgTint: '#FFFBEB', iconColor: '#D97706' },
      { id: 'e6', name: 'Monitors', Icon: Monitor, bgTint: '#ECFEFF', iconColor: '#0891B2' },
      { id: 'e7', name: 'Keyboards', Icon: Keyboard, bgTint: '#F0FDF4', iconColor: '#16A34A' },
      { id: 'e8', name: 'SSDs & Storage', Icon: HardDrive, bgTint: '#FFF1F2', iconColor: '#E11D48' },
      { id: 'e9', name: 'Speakers', Icon: Speaker, bgTint: '#EBF5FF', iconColor: '#2563EB' },
    ],
    deals: [
      {
        id: 'deal_elec_1',
        name: 'AirPods Pro (2nd Gen)',
        brand: 'Apple',
        rating: 4.8,
        reviews: '8.1k',
        price: '₹20,999',
        originalPrice: '₹24,900',
        discount: '15% off',
        image: require('../assests/airpods.png'),
      },
      {
        id: 'deal_elec_2',
        name: 'MacBook Air M3 15-inch',
        brand: 'Apple',
        rating: 4.9,
        reviews: '1.4k',
        price: '₹1,14,900',
        originalPrice: '₹1,34,900',
        discount: '14% off',
         image: require('../assests/laptop.png'),
      },
    ],
    brands: [
      { name: 'Apple', discount: 'Flat ₹10,000 Off' },
      { name: 'Sony', discount: 'Min 25% Off' },
      { name: 'Dell', discount: 'Up to 30% Off' },
      { name: 'Asus', discount: 'ROG Fest' },
    ],
  },
  {
    id: 'watches',
    name: 'Watches',
    Icon: Watch,
    badge: 'NEW',
    badgeColor: '#8B5CF6',
    banner: {
      badge: 'PREMIUM CURATION',
      BadgeIcon: ShieldCheck,
      title: 'Smart & Luxury Time',
      subtitle: 'AMOLED Displays & Sapphire Glass',
      discount: 'STARTING @ ₹899',
      bankOffer: 'Includes 1-Year Brand Warranty',
      bgColor: '#7C2D12',
      accentColor: '#FBBF24',
      BannerIcon: Watch,
    },
    subcategories: [
      { id: 'w1', name: 'Smart Watches', Icon: Watch, bgTint: '#FEF3C7', iconColor: '#D97706' },
      { id: 'w2', name: 'Fitness Bands', Icon: HeartPulse, bgTint: '#FDF2F8', iconColor: '#DB2777' },
      { id: 'w3', name: 'Analog Timers', Icon: Clock, bgTint: '#EEF2FF', iconColor: '#4F46E5' },
      { id: 'w4', name: 'Luxury Chrono', Icon: Sparkles, bgTint: '#ECFDF5', iconColor: '#059669' },
      { id: 'w5', name: 'Rugged GPS', Icon: ShieldCheck, bgTint: '#F3E8FF', iconColor: '#7C3AED' },
      { id: 'w6', name: 'Sports Bands', Icon: Trophy, bgTint: '#FFF1F2', iconColor: '#E11D48' },
    ],
    deals: [
      {
        id: 'deal_wat_1',
        name: 'Ultra Pro Fitness Watch',
        brand: 'Garmin Tech',
        rating: 4.9,
        reviews: '950',
        price: '₹34,999',
        originalPrice: '₹42,999',
        discount: '18% off',
        image: require('../assests/watch.png'),
      },
      {
        id: 'deal_wat_2',
        name: 'Vintage Chrono Digital',
        brand: 'Casio',
        rating: 4.7,
        reviews: '3.1k',
        price: '₹2,495',
        originalPrice: '₹3,495',
        discount: '28% off',
        image: require('../assests/digitalwatch.png'),
      },
    ],
    brands: [
      { name: 'Garmin', discount: 'Pro Series' },
      { name: 'Titan', discount: 'Min 20% Off' },
      { name: 'Fossil', discount: 'Flat 40% Off' },
      { name: 'Casio', discount: 'Heritage Line' },
    ],
  },
  {
    id: 'beauty',
    name: 'Beauty',
    Icon: Sparkles,
    badge: 'POPULAR',
    badgeColor: '#EC4899',
    banner: {
      badge: 'GLOW & GLAMOUR',
      BadgeIcon: Sparkles,
      title: 'Luxury Skincare & Scents',
      subtitle: 'Dermat-Approved Formulations',
      discount: 'FLAT 40% OFF',
      bankOffer: 'Free Samples on Orders above ₹999',
      bgColor: '#831843',
      accentColor: '#F43F5E',
      BannerIcon: Sparkles,
    },
    subcategories: [
      { id: 'b1', name: 'Serums & Oils', Icon: Droplets, bgTint: '#FDF2F8', iconColor: '#DB2777' },
      { id: 'b2', name: 'Hair Care', Icon: Wind, bgTint: '#EEF2FF', iconColor: '#4F46E5' },
      { id: 'b3', name: 'Perfumes', Icon: Sparkles, bgTint: '#FEF3C7', iconColor: '#D97706' },
      { id: 'b4', name: 'Makeup Kits', Icon: Smile, bgTint: '#FFF1F2', iconColor: '#E11D48' },
      { id: 'b5', name: 'Men Grooming', Icon: Scissors, bgTint: '#ECFDF5', iconColor: '#059669' },
      { id: 'b6', name: 'Sunscreen', Icon: Sun, bgTint: '#FFFBEB', iconColor: '#B45309' },
    ],
    deals: [
      {
        id: 'deal_bea_1',
        name: 'Lipstick',
        brand: 'The Ordinary',
        rating: 4.8,
        reviews: '5.2k',
        price: '₹699',
        originalPrice: '₹1,099',
        discount: '36% off',
        image: require('../assests/lipstick.png'),
      },
      {
        id: 'deal_bea_2',
        name: 'make up kit',
        brand: 'Dior',
        rating: 4.9,
        reviews: '1.8k',
        price: '₹8,499',
        originalPrice: '₹10,500',
        discount: '19% off',
        image: require('../assests/makeupkit.png'),
        
      },
    ],
    brands: [
      { name: 'The Ordinary', discount: 'Bestseller' },
      { name: 'Dior', discount: 'Luxury Scents' },
      { name: "L'Oreal", discount: 'Min 30% Off' },
      { name: 'Maybelline', discount: 'Under ₹499' },
    ],
  },
 
   
    
   
  
  {
    id: 'appliances',
    name: 'Appliances',
    Icon: Tv,
    badge: '50%',
    badgeColor: '#2563EB',
    banner: {
      badge: 'BIG APPLIANCES',
      BadgeIcon: Zap,
      title: 'Smart TVs & Inverter ACs',
      subtitle: '5-Star Energy Rating & Smart Control',
      discount: 'UP TO 55% OFF',
      bankOffer: 'Exchange Bonus up to ₹7,000',
      bgColor: '#1F2937',
      accentColor: '#60A5FA',
      BannerIcon: Tv,
    },
    subcategories: [
      { id: 'a1', name: 'Smart OLED TVs', Icon: Tv, bgTint: '#EEF2FF', iconColor: '#2563EB' },
      { id: 'a2', name: 'Inverter ACs', Icon: Wind, bgTint: '#ECFEFF', iconColor: '#0891B2' },
      { id: 'a3', name: 'Washing Mach.', Icon: RotateCw, bgTint: '#ECFDF5', iconColor: '#059669' },
      { id: 'a4', name: 'Microwaves', Icon: Flame, bgTint: '#FFF1F2', iconColor: '#E11D48' },
      { id: 'a5', name: 'Water Filters', Icon: Droplets, bgTint: '#EBF5FF', iconColor: '#3B82F6' },
      { id: 'a6', name: 'Inverters', Icon: Cpu, bgTint: '#FEF3C7', iconColor: '#D97706' },
    ],
    deals: [
      {
        id: 'deal_app_1',
        name: '55" Cinema 4K OLED Smart TV',
        brand: 'LG Display',
        rating: 4.8,
        reviews: '1.9k',
        price: '₹74,990',
        originalPrice: '₹1,19,990',
        discount: '37% off',
        image: require('../assests/smartTV.png'), 
 
         },
      {
        id: 'deal_app_2',
        name: '5-Star Inverter AC 1.5 Ton',
        brand: 'Voltas',
        rating: 4.5,
        reviews: '3.6k',
        price: '₹31,990',
        originalPrice: '₹56,990',
        discount: '43% off',
        image: require('../assests/AC.png'),
      },
    ],
    brands: [
      { name: 'LG', discount: 'OLED Festival' },
      { name: 'Samsung', discount: 'Up to 40% Off' },
      { name: 'Voltas', discount: 'Flat ₹15,000 Off' },
      { name: 'Dyson', discount: 'Pure Cool' },
    ],
  },
  {
    id: 'toys',
    name: 'Toys',
    Icon: Gamepad2,
    badge: null,
    badgeColor: '#7C3AED',
    banner: {
      badge: 'KIDS CARNIVAL',
      BadgeIcon: Sparkles,
      title: 'Toys, LEGO & STEM Kits',
      subtitle: 'Safe, Creative & Interactive',
      discount: 'UP TO 60% OFF',
      bankOffer: 'Free Gift Pack on ₹1,499+',
      bgColor: '#4C1D95',
      accentColor: '#A78BFA',
      BannerIcon: Gamepad2,
    },
    subcategories: [
      { id: 't1', name: 'Board Games', Icon: Puzzle, bgTint: '#F3E8FF', iconColor: '#7C3AED' },
      { id: 't2', name: 'RC Vehicles', Icon: Radio, bgTint: '#EEF2FF', iconColor: '#4F46E5' },
      { id: 't3', name: 'Baby Care', Icon: Baby, bgTint: '#FEF3C7', iconColor: '#D97706' },
      { id: 't4', name: 'Kids Cycles', Icon: Bike, bgTint: '#ECFDF5', iconColor: '#059669' },
      { id: 't5', name: 'Art & Craft', Icon: Palette, bgTint: '#FFF1F2', iconColor: '#E11D48' },
      { id: 't6', name: 'STEM Science', Icon: Rocket, bgTint: '#EBF5FF', iconColor: '#2563EB' },
    ],
    deals: [
      {
        id: 'deal_toy_1',
        name: 'NASA Mars Rover LEGO Set',
        brand: 'LEGO',
        rating: 4.9,
        reviews: '620',
        price: '₹3,299',
        originalPrice: '₹4,499',
        discount: '26% off',
        image: require('../assests/ranger.png'),
      },
      {
        id: 'deal_toy_2',
        name: '4WD Rock Crawler RC Monster',
        brand: 'StuntX',
        rating: 4.6,
        reviews: '1.1k',
        price: '₹1,499',
        originalPrice: '₹2,999',
        discount: '50% off',
        image: require('../assests/rcmonster.png'),
      },
    ],
    brands: [
      { name: 'LEGO', discount: 'Collector Ed.' },
      { name: 'Hot Wheels', discount: 'Packs @ ₹499' },
      { name: 'Hasbro', discount: 'Min 25% Off' },
      { name: 'Nerf', discount: 'Top Blasters' },
    ],
  },
  {
    id: 'sports',
    name: 'Sports',
    Icon: Trophy,
    badge: 'FIT',
    badgeColor: '#DC2626',
    banner: {
      badge: 'PRO ATHLETES ',
      BadgeIcon: Trophy,
      title: 'Gear & Nutrition for Peak Performance',
      subtitle: 'Gear up for your personal best',
      discount: 'MIN 35% OFF',
      bankOffer: 'Flat ₹500 off with Fitness Pass',
      bgColor: '#7F1D1D',
      accentColor: '#F87171',
      BannerIcon: Trophy,
    },
    subcategories: [
      { id: 's1', name: 'Gym Weights', Icon: Dumbbell, bgTint: '#FFF1F2', iconColor: '#DC2626' },
      { id: 's2', name: 'Yoga Mats', Icon: Heart, bgTint: '#FDF2F8', iconColor: '#DB2777' },
      { id: 's3', name: 'Running Shoes', Icon: Footprints, bgTint: '#EEF2FF', iconColor: '#4F46E5' },
      { id: 's4', name: 'Cricket & Kits', Icon: Trophy, bgTint: '#FEF3C7', iconColor: '#D97706' },
      { id: 's5', name: 'Proteins & Shakes', Icon: ShieldCheck, bgTint: '#ECFDF5', iconColor: '#059669' },
      { id: 's6', name: 'Sports Bottles', Icon: Coffee, bgTint: '#EBF5FF', iconColor: '#2563EB' },
    ],
    deals: [
      {
        id: 'deal_spo_1',
        name: 'Cricket Bat & Ball Set',
        brand: 'Kobo Pro',
        rating: 4.7,
        reviews: '840',
        price: '₹2,199',
        originalPrice: '₹4,000',
        discount: '45% off',
        image: require('../assests/cricket.png'),
      },
      {
        id: 'deal_spo_2',
        name: 'FootBall',
        brand: 'One8',
        rating: 4.8,
        reviews: '4.9k',
        price: '₹2,899',
        originalPrice: '₹3,699',
        discount: '21% off',
        image: require('../assests/football.png'),
      },
    ],
    brands: [
      { name: 'one8', discount: 'Authentic 100%' },
      { name: 'Decathlon', discount: 'Min 20% Off' },
      { name: 'Boldfit', discount: 'Flat 40% Off' },
      { name: 'Nivia', discount: 'Balls & Gear' },
    ],
  },
  {
    id: 'grocery',
    name: 'Grocery',
    Icon: ShoppingBag,
    badge: '15m',
    badgeColor: '#16A34A',
    banner: {
      badge: 'SUPER SAVER BASKET',
      BadgeIcon: Zap,
      title: 'Daily Essentials & Fresh',
      subtitle: 'Fast delivery straight to your door',
      discount: 'UP TO 30% OFF',
      bankOffer: 'Flat ₹100 Cashback on UPI',
      bgColor: '#065F46',
      accentColor: '#34D399',
      BannerIcon: ShoppingBag,
    },
    subcategories: [
      { id: 'g1', name: 'Daily Staples', Icon: ShoppingBag, bgTint: '#ECFDF5', iconColor: '#059669' },
      { id: 'g2', name: 'Coffee & Tea', Icon: Coffee, bgTint: '#FEF3C7', iconColor: '#D97706' },
      { id: 'g3', name: 'Organic Foods', Icon: Leaf, bgTint: '#F0FDF4', iconColor: '#16A34A' },
      { id: 'g4', name: 'Chocolates', Icon: Gift, bgTint: '#FFF1F2', iconColor: '#E11D48' },
      { id: 'g5', name: 'Dry Fruits', Icon: Sparkles, bgTint: '#F3E8FF', iconColor: '#7C3AED' },
      { id: 'g6', name: 'Breakfast', Icon: Sun, bgTint: '#FFFBEB', iconColor: '#B45309' },
    ],
    deals: [
      {
        id: 'deal_gro_1',
        name: 'Organic California Almonds 500g',
        brand: 'FarmFresh',
        rating: 4.8,
        reviews: '3.1k',
        price: '₹449',
        originalPrice: '₹699',
        discount: '35% off',
        image: require('../assests/almond.png'),
      },
      {
        id: 'deal_gro_2',
        name: 'Arabica Artisan Roast Coffee',
        brand: 'Blue Tokai',
        rating: 4.7,
        reviews: '1.5k',
        price: '₹399',
        originalPrice: '₹550',
        discount: '27% off',
        image: require('../assests/coffee.png'),
      },
    ],
    brands: [
      { name: 'Tata Tea', discount: 'Min 15% Off' },
      { name: 'Blue Tokai', discount: 'Artisan Roast' },
      { name: 'Fortune', discount: 'Packs @ Deals' },
      { name: 'Nestle', discount: 'Combos' },
    ],
  },
];

const CategoryScreen = ({ navigation, route }) => {
  const [selectedId, setSelectedId] = useState(route?.params?.categoryId || 'mobiles');
  const [searchQuery, setSearchQuery] = useState('');
  const [wishlist, setWishlist] = useState({});
  const { addToCart, updateQuantity, isInCart, getItemQuantity, totalItemCount: cartCount } = useCart();

  useEffect(() => {
    if (route?.params?.categoryId) {
      setSelectedId(route?.params?.categoryId);
    }
  }, [route?.params?.categoryId]);

  const activeCategory = useMemo(() => {
    return (
      CATEGORIES_DATA.find((item) => item.id === selectedId) ||
      CATEGORIES_DATA[0]
    );
  }, [selectedId]);

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filtered subcategories if search query is entered
  const filteredSubcategories = useMemo(() => {
    if (!searchQuery.trim()) {
      return activeCategory.subcategories;
    }
    const query = searchQuery.toLowerCase().trim();
    return activeCategory.subcategories.filter((sub) =>
      sub.name.toLowerCase().includes(query)
    );
  }, [activeCategory, searchQuery]);

  const BannerIcon = activeCategory.banner.BannerIcon;
  const BadgeIcon = activeCategory.banner.BadgeIcon;

  return (
    <View style={styles.container}>
      {/* Top Header */}
      
      <View style={styles.header}>
      
        <View style={styles.headerTopRow}>
          <View>
            <Text style={styles.brandTitle}>
              ShopZ <Text style={styles.brandTitlePlus}>Plus</Text>
            </Text>
            <Text style={styles.headerSubtitle}>
              Explore All Categories & Deals
            </Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.headerIconButton}
              activeOpacity={0.7}
              accessibilityLabel="Notifications"
            >
              <Bell size={22} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.headerIconButton}
              activeOpacity={0.7}
              accessibilityLabel="Cart"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={() => navigation?.navigate('Cart')}
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

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={18} color="#666666" />
          <TextInput
            style={styles.searchInput}
            placeholder={`Search within ${activeCategory.name} & more...`}
            placeholderTextColor="#888888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 ? (
            <TouchableOpacity
              onPress={() => setSearchQuery('')}
              style={styles.searchClearBtn}
              activeOpacity={0.7}
            >
              <X size={16} color="#666666" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity activeOpacity={0.7} style={styles.searchClearBtn}>
              <Mic size={18} color="#000000" />
            </TouchableOpacity>
          )}
          
        </View>
       
      </View>

      {/* Main Split Layout: Left Vertical Icons Rail + Right Dashboard */}
      <View style={styles.body}>
        {/* Left Vertical Category Rail */}
        <View style={styles.verticalRail}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.verticalRailContent}
          >
            {CATEGORIES_DATA.map((cat) => {
              const IconComponent = cat.Icon;
              const isSelected = cat.id === selectedId;

              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.verticalItem,
                    isSelected && styles.verticalItemActive,
                  ]}
                  onPress={() => {
                    setSelectedId(cat.id);
                    setSearchQuery('');
                  }}
                  activeOpacity={0.75}
                >
                  {/* Active Indicator Bar on Left Edge */}
                  {isSelected && <View style={styles.activeIndicatorBar} />}
                  {isSelected && <View style={styles.activeItemTriangle} />}

                  {/* Category Icon Container */}
                  <View
                    style={[
                      styles.iconCircle,
                      isSelected
                        ? styles.iconCircleActive
                        : styles.iconCircleInactive,
                    ]}
                  >
                    <IconComponent
                      size={22}
                      color={isSelected ? '#FFFFFF' : '#374151'}
                      strokeWidth={isSelected ? 2.3 : 1.8}
                    />

                    {/* Optional Badge */}
                    {cat.badge && (
                      <View
                        style={[
                          styles.categoryBadge,
                          { backgroundColor: cat.badgeColor },
                        ]}
                      >
                        <Text style={styles.categoryBadgeText}>
                          {cat.badge}
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Category Label */}
                  <Text
                    style={[
                      styles.categoryName,
                      isSelected
                        ? styles.categoryNameActive
                        : styles.categoryNameInactive,
                    ]}
                    numberOfLines={2}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Right Category Dashboard Area */}
        <View style={styles.dashboardContainer}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.dashboardContent}
          >
            {/* Category Promo Hero Banner */}
            <View
              style={[
                styles.promoBanner,
                { backgroundColor: activeCategory.banner.bgColor },
              ]}
            >
              <View style={styles.promoTextContainer}>
                <View style={styles.promoBadgeRow}>
                  <BadgeIcon
                    size={11}
                    color={activeCategory.banner.accentColor}
                  />
                  <Text
                    style={[
                      styles.promoBadgeText,
                      { color: activeCategory.banner.accentColor },
                    ]}
                  >
                    {activeCategory.banner.badge}
                  </Text>
                </View>

                <Text style={styles.promoTitle} numberOfLines={1}>
                  {activeCategory.banner.title}
                </Text>
                <Text style={styles.promoSubtitle} numberOfLines={1}>
                  {activeCategory.banner.subtitle}
                </Text>

                <View style={styles.promoDiscountContainer}>
                  <Text style={styles.promoDiscountText}>
                    {activeCategory.banner.discount}
                  </Text>
                </View>

                <Text style={styles.promoBankOffer} numberOfLines={1}>
                  {activeCategory.banner.bankOffer}
                </Text>

                <TouchableOpacity
                  style={[
                    styles.promoCtaBtn,
                    { backgroundColor: activeCategory.banner.accentColor },
                  ]}
                  activeOpacity={0.8}
                >
                  <Text style={styles.promoCtaText}>Explore Deals</Text>
                  <ArrowRight size={12} color="#000000" />
                </TouchableOpacity>
              </View>

              <View style={styles.promoGraphicWrap}>
                <View style={styles.promoGraphicCircleOuter}>
                  <View
                    style={[
                      styles.promoGraphicCircleInner,
                      { borderColor: activeCategory.banner.accentColor },
                    ]}
                  >
                    <BannerIcon size={36} color="#FFFFFF" strokeWidth={1.8} />
                  </View>
                </View>
              </View>
            </View>

            {/* Subcategories Section */}
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionHeaderTitleWrap}>
                <Text style={styles.sectionHeading}>
                  {activeCategory.name} Categories
                </Text>
                <View style={styles.countBadge}>
                  <Text style={styles.countBadgeText}>
                    {filteredSubcategories.length}
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={styles.filterChip} activeOpacity={0.7}>
                <Text style={styles.filterChipText}>All Deals</Text>
                <ChevronRight size={12} color="#666666" />
              </TouchableOpacity>
            </View>

            {/* Subcategories Grid */}
            <View style={styles.subcategoriesGrid}>
              {filteredSubcategories.map((sub) => {
                const SubIcon = sub.Icon;

                return (
                  <TouchableOpacity
                    key={sub.id}
                    style={styles.subcategoryCard}
                    activeOpacity={0.7}
                  >
                    <View
                      style={[
                        styles.subcategoryIconWrap,
                        { backgroundColor: sub.bgTint },
                      ]}
                    >
                      <SubIcon
                        size={22}
                        color={sub.iconColor}
                        strokeWidth={1.9}
                      />
                    </View>
                    <Text style={styles.subcategoryTitle} numberOfLines={2}>
                      {sub.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Trending Deals in this Category */}
            <View style={styles.dealsSection}>
              <View style={styles.sectionHeaderRow}>
                <View style={styles.sectionHeaderTitleWrap}>
                  <Sparkles size={16} color="#000000" />
                  <Text style={styles.sectionHeading}>Trending Deals</Text>
                </View>

                <TouchableOpacity activeOpacity={0.7}>
                  <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.dealsGrid}>
                {activeCategory.deals.map((item) => {
                  const isFavorited = !!wishlist[item.id];
                  const isAdded = isInCart(item.id, item.name);
                  const qty = getItemQuantity(item.id, item.name);
                  const FallbackIcon = item.FallbackIcon;

                  return (
                    <View key={item.id} style={styles.dealCard}>
                      {/* Product Image / Icon Container */}
                      <View style={styles.dealImageArea}>
                        {item.image ? (
                          <Image
                            source={item.image}
                            style={styles.dealProductImage}
                            resizeMode="contain"
                          />
                        ) : (
                          <View
                            style={[
                              styles.dealFallbackIconWrap,
                              { backgroundColor: item.iconBg || '#F3F4F6' },
                            ]}
                          >
                            {FallbackIcon && (
                              <FallbackIcon
                                size={44}
                                color="#000000"
                                strokeWidth={1.6}
                              />
                            )}
                          </View>
                        )}

                        {/* Wishlist Button */}
                        <TouchableOpacity
                          style={styles.dealWishlistBtn}
                          activeOpacity={0.8}
                          onPress={() => toggleWishlist(item.id)}
                        >
                          <Heart
                            size={14}
                            color={isFavorited ? '#EF4444' : '#000000'}
                            fill={isFavorited ? '#EF4444' : 'none'}
                          />
                        </TouchableOpacity>
                      </View>

                      {/* Product Details */}
                      <View style={styles.dealDetails}>
                        <Text style={styles.dealBrand}>{item.brand}</Text>
                        <Text style={styles.dealName} numberOfLines={1}>
                          {item.name}
                        </Text>

                        {/* Rating row */}
                        <View style={styles.dealRatingRow}>
                          <View style={styles.ratingBadge}>
                            <Text style={styles.ratingBadgeText}>
                              {item.rating}
                            </Text>
                            <Star size={8.5} color="#FFFFFF" fill="#FFFFFF" />
                          </View>
                          <Text style={styles.dealReviewsText}>
                            ({item.reviews})
                          </Text>
                        </View>

                        {/* Pricing */}
                        <View style={styles.dealPricingRow}>
                          <Text style={styles.dealCurrentPrice}>
                            {item.price}
                          </Text>
                          <Text style={styles.dealOriginalPrice}>
                            {item.originalPrice}
                          </Text>
                        </View>
                        <Text style={styles.dealDiscountTag}>
                          {item.discount}
                        </Text>

                        {/* Add to Cart / Quantity Stepper */}
                        {isAdded ? (
                          <View style={styles.dealStepperRow}>
                            <TouchableOpacity
                              style={styles.dealStepperBtn}
                              onPress={() => updateQuantity(item.id, qty - 1)}
                              activeOpacity={0.7}
                            >
                              <Minus size={11} color="#FFFFFF" strokeWidth={3} />
                            </TouchableOpacity>

                            <Text style={styles.dealStepperQty}>{qty}</Text>

                            <TouchableOpacity
                              style={styles.dealStepperBtn}
                              onPress={() => addToCart(item, 1)}
                              activeOpacity={0.7}
                            >
                              <Plus size={11} color="#FFFFFF" strokeWidth={3} />
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <TouchableOpacity
                            style={styles.dealAddToCartBtn}
                            activeOpacity={0.8}
                            onPress={() => addToCart(item)}
                          >
                            <ShoppingCart size={12} color="#FFFFFF" />
                            <Text style={styles.dealAddToCartText}>
                              Add
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Popular Brands in this Category */}
            <View style={styles.brandsSection}>
              <Text style={styles.brandsSectionHeading}>
                Popular in {activeCategory.name}
              </Text>
              <View style={styles.brandsRow}>
                {activeCategory.brands.map((brand, idx) => (
                  <View key={idx} style={styles.brandChip}>
                    <Text style={styles.brandChipName}>{brand.name}</Text>
                    <Text style={styles.brandChipDiscount}>
                      {brand.discount}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    
  },

  /* Header styles */
  header: {
    backgroundColor: '#000000',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 14,
    margin:10,
    
  },
  headerTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  brandTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: -0.3,
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
    top: -1,
    right: -3,
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
  searchContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 12.5,
    color: '#111827',
    paddingVertical: 4,
  },
  searchClearBtn: {
    padding: 4,
  },

  /* Body split layout */
  body: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
  },

  /* Left vertical icons sidebar */
  verticalRail: {
    width: 86,
    backgroundColor: 'yellow',
    borderRightWidth: 1,
    borderRightColor: 'black',
  },
  verticalRailContent: {
    paddingVertical: 6,
  },
  verticalItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    position: 'relative',
    borderBottomWidth: 0.5,
    borderBottomColor: '#E5E7EB',
  },
  verticalItemActive: {
    marginRight: 10,
    backgroundColor: '#F3F4F6',
  },
  activeItemTriangle: {
    position: 'absolute',
    right: -10,
    top: '50%',
    marginTop: -10,
    width: 0,
    height: 0,
    borderTopWidth: 10,
    borderBottomWidth: 10,
    borderLeftWidth: 10,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#F3F4F6',
    zIndex: 1,
  },
  activeIndicatorBar: {
    position: 'absolute',
    left: 0,
    top: 10,
    bottom: 10,
    width: 4,
    backgroundColor: '#000000',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  iconCircleActive: {
    backgroundColor: '#000000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  iconCircleInactive: {
    backgroundColor: 'white',
  },
  categoryBadge: {
    position: 'absolute',
    top: -4,
    right: -6,
    paddingHorizontal: 4,
    paddingVertical: 1.5,
    borderRadius: 6,
    zIndex: 10,
  },
  categoryBadgeText: {
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '900',
  },
  categoryName: {
    fontSize: 10.5,
    marginTop: 6,
    textAlign: 'center',
    paddingHorizontal: 2,
  },
  categoryNameActive: {
    color: '#000000',
    fontWeight: '800',
  },
  categoryNameInactive: {
    color: '#4B5563',
    fontWeight: '600',
  },

  /* Right Dashboard */
  dashboardContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  dashboardContent: {
    padding: 12,
    paddingBottom: 40,
  },

  /* Hero Promo Banner */
  promoBanner: {
    borderRadius: 14,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 140,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 14,
  },
  promoTextContainer: {
    flex: 1,
    paddingRight: 6,
  },
  promoBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 3,
  },
  promoBadgeText: {
    fontSize: 9.5,
    fontWeight: '900',
    letterSpacing: 0.4,
  },
  promoTitle: {
    fontSize: 15,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  promoSubtitle: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.85)',
    marginTop: 2,
    marginBottom: 5,
  },
  promoDiscountContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 4,
  },
  promoDiscountText: {
    color: '#000000',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  promoBankOffer: {
    fontSize: 9.5,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    marginBottom: 6,
  },
  promoCtaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    gap: 4,
  },
  promoCtaText: {
    color: '#000000',
    fontSize: 10,
    fontWeight: '800',
  },
  promoGraphicWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoGraphicCircleOuter: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoGraphicCircleInner: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1.5,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Section Headings */
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 4,
  },
  sectionHeaderTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: '900',
    color: '#111827',
  },
  countBadge: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 10,
  },
  countBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#4B5563',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  filterChipText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#4B5563',
  },
  viewAllText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#000000',
  },

  /* Subcategories 3-column Grid */
  subcategoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  subcategoryCard: {
    width: '31%',
    backgroundColor: '#FAFAFA',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  subcategoryIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  subcategoryTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    lineHeight: 13,
  },

  /* Deals section */
  dealsSection: {
    marginBottom: 16,
  },
  dealsGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  dealCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  dealImageArea: {
    height: 100,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: 8,
  },
  dealProductImage: {
    width: '100%',
    height: '100%',
  },
  dealFallbackIconWrap: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dealWishlistBtn: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  dealDetails: {
    padding: 8,
  },
  dealBrand: {
    fontSize: 9,
    fontWeight: '800',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  dealName: {
    fontSize: 11.5,
    fontWeight: '800',
    color: '#111827',
    marginTop: 2,
  },
  dealRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
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
  ratingBadgeText: {
    color: '#FFFFFF',
    fontSize: 8.5,
    fontWeight: '800',
  },
  dealReviewsText: {
    fontSize: 8.5,
    color: '#6B7280',
    fontWeight: '500',
  },
  dealPricingRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
    marginTop: 5,
  },
  dealCurrentPrice: {
    fontSize: 12,
    fontWeight: '900',
    color: '#000000',
  },
  dealOriginalPrice: {
    fontSize: 9.5,
    color: '#9CA3AF',
    textDecorationLine: 'line-through',
  },
  dealDiscountTag: {
    fontSize: 9.5,
    fontWeight: '800',
    color: '#16A34A',
    marginTop: 1,
  },
  dealAddToCartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
    paddingVertical: 5,
    borderRadius: 6,
    marginTop: 6,
    gap: 4,
  },
  dealAddToCartBtnActive: {
    backgroundColor: '#16A34A',
  },
  dealAddToCartText: {
    color: '#FFFFFF',
    fontSize: 9.5,
    fontWeight: '800',
  },
  dealStepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#16A34A',
    borderRadius: 6,
    marginTop: 6,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  dealStepperBtn: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dealStepperQty: {
    color: '#FFFFFF',
    fontSize: 10.5,
    fontWeight: '900',
  },

  /* Popular Brands section */
  brandsSection: {
    marginTop: 4,
  },
  brandsSectionHeading: {
    fontSize: 12.5,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 8,
  },
  brandsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  brandChip: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  brandChipName: {
    fontSize: 10.5,
    fontWeight: '800',
    color: '#111827',
  },
  brandChipDiscount: {
    fontSize: 9,
    fontWeight: '700',
    color: '#16A34A',
    marginTop: 1,
  },
});

export default CategoryScreen;
