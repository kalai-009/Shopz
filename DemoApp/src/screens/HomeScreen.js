import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import FlipkartHeader from '../components/FlipkartHeader';
import Categories from '../components/Categories';
import Carousel from '../components/Carousel';
import NewArrivals from '../components/NewArrivals';
import CategoryItemsView from '../components/CategoryItemsView';
import { CATEGORIES_LIST } from '../data/categoriesData';

const HomeScreen = ({ navigation }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const selectedCategory = useMemo(() => {
    return CATEGORIES_LIST.find((c) => c.id === selectedCategoryId) || null;
  }, [selectedCategoryId]);

  return (
    <View style={styles.container}>
      <FlipkartHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Categories
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={(id) => setSelectedCategoryId(id)}
        />

        {selectedCategory ? (
          <CategoryItemsView
            category={selectedCategory}
            onClear={() => setSelectedCategoryId(null)}
            navigation={navigation}
          />
        ) : (
          <>
            <Carousel />
            <NewArrivals />
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange',
  },
  scrollContent: {
    paddingBottom: 32,
  },
});

export default HomeScreen;
