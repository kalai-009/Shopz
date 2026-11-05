import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { CATEGORIES_LIST } from '../data/categoriesData';

const Categories = ({ selectedCategoryId, onSelectCategory }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.categoryRow}>
        {CATEGORIES_LIST.map((item) => {
          const CategoryIcon = item.Icon;
          const isSelected = selectedCategoryId === item.id;

          return (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              onPress={() => onSelectCategory && onSelectCategory(isSelected ? null : item.id)}
              style={styles.categoryTouchArea}
            >
              <View style={styles.categoryItem}>
                <View
                  style={[
                    styles.iconCircle,
                    isSelected && styles.iconCircleActive,
                  ]}
                >
                  <CategoryIcon
                    size={24}
                    color="#000000"
                    strokeWidth={isSelected ? 2.6 : 1.8}
                  />
                </View>

                <Text
                  style={[
                    styles.categoryText,
                    isSelected && styles.categoryTextActive,
                  ]}
                  numberOfLines={1}
                >
                  {item.name}
                </Text>

                {/* Active Indicator Bar */}
                {isSelected && <View style={styles.activeDot} />}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexGrow: 0,
  },
  contentContainer: {
    alignItems: 'center',
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 6,
  },
  categoryTouchArea: {
    marginHorizontal: 4,
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    position: 'relative',
  },
  iconCircle: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: 'transparent',
  },
  iconCircleActive: {
    transform: [{ scale: 1.15 }],
  },
  categoryText: {
    fontSize: 11,
    color: '#000000',
    marginTop: 4,
    fontWeight: '600',
    textAlign: 'center',
  },
  categoryTextActive: {
    fontWeight: '900',
    color: '#000000',
  },
  activeDot: {
    width: 16,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#000000',
    marginTop: 3,
  },
});

export default Categories;
