import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import {
  Smartphone,
  Shirt,
  Laptop,
  Watch,
  Zap,
  Flame,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react-native';

const BANNER_DATA = [
  {
    id: '1',
    badge: 'SUPER SAVER DEAL',
    BadgeIcon: Zap,
    title: 'Flagship Smartphones',
    subtitle: 'Latest 5G Phones with Pro Cameras',
    discount: 'UP TO 40% OFF',
    bankOffer: '+ Flat ₹2,500 Instant Bank Off',
    cta: 'Shop Now',
    bgColor: '#1E3A8A',
    accentColor: '#38BDF8',
    MainIcon: Smartphone,
  },
  {
    id: '2',
    badge: 'TRENDING FASHION',
    BadgeIcon: Flame,
    title: 'Mega Wardrobe Refresh',
    subtitle: 'Top Brands • Men, Women & Kids',
    discount: 'MIN 50% - 80% OFF',
    bankOffer: 'Free Shipping On First Order',
    cta: 'Explore Trends',
    bgColor: '#581C87',
    accentColor: '#F472B6',
    MainIcon: Shirt,
  },
  {
    id: '3',
    badge: 'BESTSELLER TECH',
    BadgeIcon: Sparkles,
    title: 'Laptops & Workstations',
    subtitle: 'High Performance for Creators & Pros',
    discount: 'FLAT ₹15,000 OFF',
    bankOffer: 'Up to 12 Months No-Cost EMI',
    cta: 'Grab Deals',
    bgColor: '#064E3B',
    accentColor: '#34D399',
    MainIcon: Laptop,
  },
  {
    id: '4',
    badge: 'SPECIAL CURATION',
    BadgeIcon: ShieldCheck,
    title: 'Smart Watches & Audio',
    subtitle: 'Track Fitness • Studio Quality Audio',
    discount: 'STARTING @ ₹899',
    bankOffer: 'Includes 1-Year Brand Warranty',
    cta: 'View Products',
    bgColor: '#7C2D12',
    accentColor: '#FBBF24',
    MainIcon: Watch,
  },
];

const Carousel = () => {
  const { width: screenWidth } = useWindowDimensions();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef(null);
  const isInteracting = useRef(false);

  // Auto-scroll every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isInteracting.current && scrollRef.current) {
        const nextIndex = (activeIndex + 1) % BANNER_DATA.length;
        scrollRef.current.scrollTo({
          x: nextIndex * screenWidth,
          animated: true,
        });
        setActiveIndex(nextIndex);
      }
    }, 3500);

    return () => clearInterval(timer);
  }, [activeIndex, screenWidth]);

  const onScroll = (event) => {
    const slide = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    if (slide >= 0 && slide < BANNER_DATA.length && slide !== activeIndex) {
      setActiveIndex(slide);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onTouchStart={() => {
          isInteracting.current = true;
        }}
        onTouchEnd={() => {
          setTimeout(() => {
            isInteracting.current = false;
          }, 2000);
        }}
        style={{ width: screenWidth }}
      >
        {BANNER_DATA.map((item) => {
          const BadgeIcon = item.BadgeIcon;
          const MainIcon = item.MainIcon;

          return (
            <View
              key={item.id}
              style={[styles.slideContainer, { width: screenWidth }]}
            >
              <View style={[styles.card, { backgroundColor: item.bgColor }]}>
                {/* Left content area */}
                <View style={styles.cardContent}>
                  {/* Badge */}
                  <View style={styles.badgeRow}>
                    <BadgeIcon size={12} color={item.accentColor} />
                    <Text
                      style={[styles.badgeText, { color: item.accentColor }]}
                    >
                      {item.badge}
                    </Text>
                  </View>

                  {/* Title & subtitle */}
                  <Text style={styles.title} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.subtitle} numberOfLines={1}>
                    {item.subtitle}
                  </Text>

                  {/* Discount tag */}
                  <View style={styles.discountContainer}>
                    <Text style={styles.discountText}>{item.discount}</Text>
                  </View>

                  {/* Bank offer strip */}
                  <Text style={styles.bankOfferText} numberOfLines={1}>
                    {item.bankOffer}
                  </Text>

                  {/* CTA Button */}
                  <TouchableOpacity
                    style={[
                      styles.ctaButton,
                      { backgroundColor: item.accentColor },
                    ]}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.ctaText}>{item.cta}</Text>
                    <ArrowRight size={13} color="#000000" />
                  </TouchableOpacity>
                </View>

                {/* Right Illustration Icon container */}
                <View style={styles.iconGraphicContainer}>
                  <View
                    style={[
                      styles.iconCircleOuter,
                      { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                    ]}
                  >
                    <View
                      style={[
                        styles.iconCircleInner,
                        { borderColor: item.accentColor },
                      ]}
                    >
                      <MainIcon size={46} color="#FFFFFF" strokeWidth={1.7} />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {/* Pagination Indicators */}
      <View style={styles.paginationRow}>
        {BANNER_DATA.map((_, index) => {
          const isActive = index === activeIndex;
          return (
            <View
              key={index}
              style={[
                styles.dot,
                isActive ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
  slideContainer: {
    paddingHorizontal: 14,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 165,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
    paddingRight: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
  },
  title: {
    fontSize: 17,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
    marginBottom: 6,
  },
  discountContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 5,
    marginBottom: 5,
  },
  discountText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  bankOfferText: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    marginBottom: 8,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    gap: 5,
  },
  ctaText: {
    color: '#000000',
    fontSize: 11,
    fontWeight: '800',
  },
  iconGraphicContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleOuter: {
    width: 86,
    height: 86,
    borderRadius: 43,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircleInner: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1.5,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    gap: 6,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    width: 22,
    backgroundColor: '#000000',
  },
  inactiveDot: {
    width: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
});

export default Carousel;
