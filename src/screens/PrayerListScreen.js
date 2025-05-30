import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import styles from '../styles/PrayerListStyle';
import HeaderBlack from '../components/HeaderBlack';
import { ThemeColors } from '../utils/Theme';

const { width } = Dimensions.get('window');

const PrayerListScreen = ({ navigation, route }) => {
  const { prayers, title } = route.params;
  const [selectedPray, setSelectedPray] = useState(null);

  if (!prayers?.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No prayers available</Text>
      </View>
    );
  }

  const handlePress = (prayer, index) => {
    setSelectedPray(index);
    navigation.navigate('PrayerDetailScreen', {
      prayerData: prayer,
      title: prayer.title
    });
  };
  const handleBackPress = () => {
    navigation.goBack(); // This will only go back one screen
  };

  return (
    <React.Fragment>
      <HeaderBlack 
        Name={title.toUpperCase()} 
        navigation={navigation} 
        showBackButton={true} 
        onBackPress={handleBackPress} // Pass the custom back handler
      />
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          <View style={{ marginTop: 30 }}>
            <Text style={styles.LoginDetailsHeading}>
              What do you want to pray for?
            </Text>
          </View>

          <View style={{
            margin: 20,
            backgroundColor: 'transparent',
            paddingHorizontal: 20,
          }}>
            {prayers.map((item, index) => (
              <TouchableOpacity
                key={index.toString()}
                onPress={() => handlePress(item, index)}
                style={styles.AllPrayersItemTwo}>
                <Text style={styles.HeadingAllPrayer}>{item.title}</Text>
                {/* <View
                  style={[
                    styles.EmptyRoundView,
                    {
                      backgroundColor: selectedPray === index ? '#ABD6DF' : ThemeColors.WHITE,
                    },
                  ]}
                /> */}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* <TouchableOpacity
          onPress={() => {
            // Add your prayer action here if needed
          }}
          style={styles.PrayBtn}>
          <ImageBackground
            source={require('../../assets/images/round1.png')}
            style={{
              width: 101,
              height: 101,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            resizeMode="contain">
            <Text style={styles.MinuteText}>PRAY</Text>
          </ImageBackground>
        </TouchableOpacity> */}

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

export default PrayerListScreen;