import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';
import styles from '../styles/GuidedPrayerStyle';
import HeaderBlack from '../components/HeaderBlack';

const GuidedPrayerDetailScreen = ({ navigation, route }) => {
  const { categoryData } = route.params;

  if (!categoryData?.items?.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No items available</Text>
      </View>
    );
  }

  const handlePress = (item) => {
    if (item.subCategories) {
      navigation.navigate('GuidedPrayerDetailScreen', {
        categoryData: {
          name: item.name,
          items: item.subCategories
        }
      });
    } else if (item.prayers) {
      navigation.navigate('PrayerListScreen', {
        prayers: item.prayers,
        title: `${categoryData.name} > ${item.name}`
      });
    }
  };

  // Function to split items into pairs for grid layout
  const chunkArray = (array, chunkSize) => {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const itemPairs = chunkArray(categoryData.items, 2);

  return (
    <React.Fragment>
      <HeaderBlack 
        Name={categoryData.name.toUpperCase()} 
        navigation={navigation} 
        showBackButton={true}
      />
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          {itemPairs.map((pair, index) => (
            <View key={index} style={styles.HomeItemView}>
              {pair.map((item) => (
                <View key={item.name} style={styles.HomeItemMainLayer}>
                  <TouchableOpacity onPress={() => handlePress(item)}>
                    <ImageBackground
                      source={require('../../assets/images/bg.png')}
                      style={{
                        width: 190,
                        height: 190,
                        justifyContent: 'center',
                      }}
                      resizeMode="contain">
                      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.AddictionText}>{item.name}</Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ))}
        </View>
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <Image
            source={require('../../assets/images/anchor.png')}
            style={{ width: 37, height: 45 }}
            resizeMode="contain"
          />
          <Text style={styles.LogoText}>
            Designed by:{'\n'}digitalsoftwarelabs.com
          </Text>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default GuidedPrayerDetailScreen;