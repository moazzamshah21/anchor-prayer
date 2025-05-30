import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import styles from '../styles/HomeStyle';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { GUIDED_PRAYER_LIST } from '../utils/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation, route }) => {
  const myPrayerList = useSelector(state => state.CommonReducer.myPrayerList);
  const [verseOfTheDay, setVerseOfTheDay] = useState({
    text: '',
    reference: ''
  });

  const getRandomVerse = () => {
    let allPrayers = [];
    GUIDED_PRAYER_LIST.forEach(category => {
      category.subCategories?.forEach(subCategory => {
        subCategory.subCategories?.forEach(subSubCategory => {
          subSubCategory.prayers?.forEach(prayer => {
            allPrayers.push({
              text: prayer.body,
              reference: prayer.title
            });
          });
        });
      });
    });

    if (allPrayers.length > 0) {
      const randomIndex = Math.floor(Math.random() * allPrayers.length);
      return allPrayers[randomIndex];
    } else {
      return {
        text: 'For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope.',
        reference: 'Jeremiah 29:11'
      };
    }
  };

  const checkAndUpdateVerse = async () => {
    try {
      const storedData = await AsyncStorage.getItem('verseData');
      const now = new Date();
      const gmtPlus1Offset = 60 * 60 * 1000;
      const nowGMTPlus1 = new Date(now.getTime() + gmtPlus1Offset);
      const midnightGMTPlus1 = new Date(nowGMTPlus1);
      midnightGMTPlus1.setHours(0, 0, 0, 0);

      if (storedData) {
        const { verse, lastUpdated } = JSON.parse(storedData);
        const lastUpdatedDate = new Date(lastUpdated);
        if (lastUpdatedDate < midnightGMTPlus1) {
          const newVerse = getRandomVerse();
          await AsyncStorage.setItem('verseData', JSON.stringify({
            verse: newVerse,
            lastUpdated: midnightGMTPlus1.toISOString()
          }));
          setVerseOfTheDay(newVerse);
        } else {
          setVerseOfTheDay(verse);
        }
      } else {
        const newVerse = getRandomVerse();
        await AsyncStorage.setItem('verseData', JSON.stringify({
          verse: newVerse,
          lastUpdated: midnightGMTPlus1.toISOString()
        }));
        setVerseOfTheDay(newVerse);
      }
    } catch (error) {
      console.error('Error handling verse of the day:', error);
      setVerseOfTheDay(getRandomVerse());
    }
  };

  useEffect(() => {
    checkAndUpdateVerse();
    const interval = setInterval(() => {
      checkAndUpdateVerse();
    }, 3600000); // hourly
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header navigation={navigation} />
      <ScrollView
        contentContainerStyle={[
          styles.ScrollViewContentContainerStyle,
          { 
            flexGrow: 1,
            justifyContent: 'space-between',
            paddingBottom: 20
          }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.MainContainer}>
          {/* Verse of the Day Section */}
          <View style={[styles.PageTitleView, { marginTop: 20 }]}>
            <Text style={styles.PageMainTitle}>Verse of the day</Text>
            {verseOfTheDay.text && (
              <>
                <Text style={styles.PageSubTitle}>
                  {verseOfTheDay.text}
                </Text>
                <Text style={styles.BibleReference}>
                  {verseOfTheDay.reference}
                </Text>
              </>
            )}
          </View>

          {/* Main Content - Takes remaining space */}
          <View style={{ flex: 1, justifyContent: 'center' }}>
            {/* First Row */}
            <View style={styles.HomeItemView}>
              <View style={styles.HomeItemMainLayer}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('MyPrayerScreen');
                  }}>
                  <Image
                    source={require('../../assets/images/my-prayer-icon.png')}
                    style={{ width: 150, height: 150 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.HomeItemMainLayer}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('GuidedPrayerScreen');
                  }}>
                  <Image
                    source={require('../../assets/images/guided-prayer-icon.png')}
                    style={{ width: 150, height: 150 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Second Row */}
            <View style={styles.HomeItemView}>
              <View style={styles.HomeItemMainLayer}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('AddPrayerScreen');
                  }}>
                  <Image
                    source={require('../../assets/images/add-a-prayer-icon.png')}
                    style={{ width: 150, height: 150 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.HomeItemMainLayer}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('GuidedPrayerDetailScreen', {
                      categoryData: {
                        name: 'Meditation',
                        items: GUIDED_PRAYER_LIST.find(cat => cat.name === 'Meditation')?.subCategories || []
                      }
                    });
                  }}>
                  <Image
                    source={require('../../assets/images/meditation-icon.png')}
                    style={{ width: 150, height: 150, maxHeight: 150, maxWidth: 150 }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        {/* Footer - Pushed to bottom */}
        <View style={{
          padding: 16,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 'auto' // This ensures it stays at the bottom
        }}>
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
    </>
  );
};

export default HomeScreen;