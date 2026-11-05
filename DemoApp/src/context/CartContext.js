import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';

// Price parser helper that handles both numeric (129999) and formatted string ('₹1,29,999')
export const parsePrice = (priceVal) => {
  if (typeof priceVal === 'number') return priceVal;
  if (!priceVal) return 0;
  const cleaned = String(priceVal).replace(/[^0-9]/g, '');
  return parseInt(cleaned, 10) || 0;
};

// Available coupons dictionary
export const COUPON_CODES = {
  SHOPZ500: { code: 'SHOPZ500', discount: 500, minOrder: 2000, label: 'Flat ₹500 off on orders above ₹2,000' },
  SUPER10: { code: 'SUPER10', discountPercent: 10, maxDiscount: 1500, minOrder: 1000, label: '10% instant discount up to ₹1,500' },
  SAVE200: { code: 'SAVE200', discount: 200, minOrder: 999, label: 'Flat ₹200 off on orders above ₹999' },
};

// Initial sample cart items
const INITIAL_CART_ITEMS = [
  {
    id: 'na_1',
    name: 'Galaxy S24 Ultra 5G',
    brand: 'Samsung',
    spec: 'Titanium Black • 12GB RAM • 256GB Storage',
    seller: 'SuperComNet (ShopZ Assured)',
    price: 129999,
    originalPrice: 144999,
    discount: '10% off',
    rating: 4.9,
    reviews: '3.4k',
    quantity: 1,
    deliveryDate: 'Tomorrow, by 11 AM',
    image: require('../assests/samsung.png'),
    inStock: true,
  },
  {
    id: 'na_2',
    name: 'AirPods Pro (2nd Gen)',
    brand: 'Apple',
    spec: 'Active Noise Cancellation • MagSafe Case (USB-C)',
    seller: 'IndiFlash Electronics (ShopZ Assured)',
    price: 20999,
    originalPrice: 24900,
    discount: '15% off',
    rating: 4.8,
    reviews: '8.1k',
    quantity: 1,
    deliveryDate: 'Tomorrow, by 2 PM',
    image: require('../assests/airpods.png'),
    inStock: true,
  },
  {
    id: 'na_3',
    name: 'Urban Oversized Hoodie',
    brand: 'Zara Streetwear',
    spec: 'Size: L • Color: Heather Charcoal • 100% Cotton',
    seller: 'Zara Apparels Direct',
    price: 2499,
    originalPrice: 4999,
    discount: '50% off',
    rating: 4.6,
    reviews: '1.2k',
    quantity: 1,
    deliveryDate: 'Thu, 3 PM',
    image: require('../assests/hoodie.png'),
    inStock: true,
  },
];

// Initial sample saved items
const INITIAL_SAVED_ITEMS = [
  {
    id: 'saved_1',
    name: 'Ultra Pro GPS Fitness Smartwatch',
    brand: 'Garmin Tech',
    spec: 'AMOLED Always-On • Heart Rate & SpO2 • 7 Days Battery',
    seller: 'Garmin Tech India',
    price: 34999,
    originalPrice: 42999,
    discount: '18% off',
    rating: 4.9,
    reviews: '950',
    quantity: 1,
    deliveryDate: 'Delivery in 2 Days',
    image: require('../assests/watch.png'),
  },
];

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);
  const [savedItems, setSavedItems] = useState(INITIAL_SAVED_ITEMS);

  // Coupons & Loyalty
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [useSuperCoins, setUseSuperCoins] = useState(false);
  const availableSuperCoins = 150;

  // Global toast feedback
  const [toastMessage, setToastMessage] = useState('');
  const [toastTimer, setToastTimer] = useState(null);

  const showToast = useCallback((msg) => {
    if (toastTimer) clearTimeout(toastTimer);
    setToastMessage(msg);
    const timer = setTimeout(() => {
      setToastMessage('');
    }, 2800);
    setToastTimer(timer);
  }, [toastTimer]);

  const hideToast = useCallback(() => {
    setToastMessage('');
  }, []);

  // Check if item is in cart
  const isInCart = useCallback((productId, productName) => {
    return cartItems.some(
      (item) => item.id === productId || (productName && item.name?.toLowerCase() === productName?.toLowerCase())
    );
  }, [cartItems]);

  // Get quantity of specific item
  const getItemQuantity = useCallback((productId, productName) => {
    const item = cartItems.find(
      (i) => i.id === productId || (productName && i.name?.toLowerCase() === productName?.toLowerCase())
    );
    return item ? item.quantity : 0;
  }, [cartItems]);

  // Add product to cart
  const addToCart = useCallback((product, qty = 1) => {
    if (!product || (!product.id && !product.name)) return { success: false };

    const parsedCurrentPrice = parsePrice(product.price);
    const parsedOriginalPrice = parsePrice(product.originalPrice || product.price);

    let isNew = false;
    let finalQty = 1;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id || (product.name && item.name?.toLowerCase() === product.name?.toLowerCase())
      );

      if (existingIndex > -1) {
        // Already in cart - increment quantity up to max 5
        const existingItem = prev[existingIndex];
        if (existingItem.quantity >= 5) {
          showToast(`Maximum limit of 5 reached for "${product.name}"`);
          finalQty = 5;
          return prev;
        }

        finalQty = Math.min(existingItem.quantity + qty, 5);
        showToast(`Updated quantity of "${product.name}" (${finalQty})`);
        return prev.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: finalQty } : item
        );
      } else {
        // Add new item to cart
        isNew = true;
        finalQty = Math.min(qty, 5);
        showToast(`Added "${product.name}" to Cart!`);

        const newItem = {
          id: product.id || `prod_${Date.now()}`,
          name: product.name,
          brand: product.brand || 'ShopZ Brand',
          spec: product.spec || (product.brand ? `${product.brand} Official Edition` : 'Standard Edition'),
          seller: product.seller || 'Verified ShopZ Seller (ShopZ Assured)',
          price: parsedCurrentPrice,
          originalPrice: parsedOriginalPrice,
          discount: product.discount || (parsedOriginalPrice > parsedCurrentPrice ? `${Math.round(((parsedOriginalPrice - parsedCurrentPrice) / parsedOriginalPrice) * 100)}% off` : ''),
          rating: product.rating || 4.7,
          reviews: product.reviews || '1.5k',
          quantity: finalQty,
          deliveryDate: product.deliveryDate || 'Tomorrow, by 11 AM',
          image: product.image,
          inStock: true,
        };

        return [newItem, ...prev];
      }
    });

    return { success: true, isNew, quantity: finalQty };
  }, [showToast]);

  // Remove item from cart
  const removeFromCart = useCallback((productId) => {
    setCartItems((prev) => {
      const target = prev.find((i) => i.id === productId);
      if (target) {
        showToast(`Removed "${target.name}" from Cart`);
      }
      return prev.filter((i) => i.id !== productId);
    });
  }, [showToast]);

  // Update item quantity
  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (newQuantity > 5) {
      showToast('Maximum quantity of 5 reached per item');
      newQuantity = 5;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, [removeFromCart, showToast]);

  const incrementQuantity = useCallback((productId) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === productId) {
          if (item.quantity >= 5) {
            showToast('Maximum quantity of 5 reached per item');
            return item;
          }
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  }, [showToast]);

  const decrementQuantity = useCallback((productId) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.id === productId);
      if (!item) return prev;

      if (item.quantity <= 1) {
        showToast(`Removed "${item.name}" from Cart`);
        return prev.filter((i) => i.id !== productId);
      }

      return prev.map((i) =>
        i.id === productId ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  }, [showToast]);

  // Save for later
  const saveForLater = useCallback((product) => {
    setCartItems((prev) => prev.filter((i) => i.id !== product.id));
    setSavedItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev;
      return [{ ...product, quantity: 1 }, ...prev];
    });
    showToast(`Moved "${product.name}" to Saved for Later`);
  }, [showToast]);

  // Move back to cart from saved
  const moveToCart = useCallback((product) => {
    setSavedItems((prev) => prev.filter((i) => i.id !== product.id));
    addToCart(product, 1);
  }, [addToCart]);

  // Remove saved item
  const removeSavedItem = useCallback((productId) => {
    setSavedItems((prev) => prev.filter((i) => i.id !== productId));
    showToast('Removed from Saved for Later');
  }, [showToast]);

  // Clear cart
  const clearCart = useCallback(() => {
    setCartItems([]);
    setAppliedCoupon(null);
  }, []);

  // Restore sample demo items
  const restoreDemoItems = useCallback(() => {
    setCartItems(INITIAL_CART_ITEMS);
    setSavedItems(INITIAL_SAVED_ITEMS);
    setAppliedCoupon(null);
    setUseSuperCoins(false);
    showToast('Sample cart items restored!');
  }, [showToast]);

  // Calculated values
  const totalItemCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const totalMRP = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.originalPrice * item.quantity, 0);
  }, [cartItems]);

  const totalSellingPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const mrpDiscount = totalMRP - totalSellingPrice;

  // Coupon handling
  const applyCoupon = useCallback((codeToApply) => {
    const code = (codeToApply || '').trim().toUpperCase();
    setCouponError('');

    if (!code) {
      setCouponError('Please enter a coupon code.');
      return false;
    }

    const matchedCoupon = COUPON_CODES[code];
    if (!matchedCoupon) {
      setCouponError('Invalid code. Try SHOPZ500, SUPER10, or SAVE200');
      return false;
    }

    if (totalSellingPrice < (matchedCoupon.minOrder || 0)) {
      setCouponError(`Add items worth ₹${(matchedCoupon.minOrder - totalSellingPrice).toLocaleString('en-IN')} more to apply this coupon.`);
      return false;
    }

    setAppliedCoupon(matchedCoupon);
    showToast(`Coupon ${code} applied successfully!`);
    return true;
  }, [totalSellingPrice, showToast]);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
    setCouponError('');
    showToast('Coupon removed');
  }, [showToast]);

  const couponDiscount = useMemo(() => {
    if (!appliedCoupon) return 0;
    if (appliedCoupon.discount) return appliedCoupon.discount;
    if (appliedCoupon.discountPercent) {
      const calculated = (totalSellingPrice * appliedCoupon.discountPercent) / 100;
      return Math.min(calculated, appliedCoupon.maxDiscount || calculated);
    }
    return 0;
  }, [appliedCoupon, totalSellingPrice]);

  const superCoinsDeduction = useSuperCoins ? Math.min(50, availableSuperCoins) : 0;
  const deliveryCharges = totalSellingPrice >= 499 || cartItems.length === 0 ? 0 : 40;
  const packagingFee = cartItems.length > 0 ? 29 : 0;

  const finalPayable = Math.max(
    0,
    totalSellingPrice - couponDiscount - superCoinsDeduction + deliveryCharges + packagingFee
  );

  const totalSavings =
    mrpDiscount +
    couponDiscount +
    superCoinsDeduction +
    (deliveryCharges === 0 && cartItems.length > 0 ? 40 : 0);

  const value = {
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
    toastMessage,
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    isInCart,
    getItemQuantity,
    saveForLater,
    moveToCart,
    removeSavedItem,
    clearCart,
    restoreDemoItems,
    applyCoupon,
    removeCoupon,
    setUseSuperCoins,
    showToast,
    hideToast,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
