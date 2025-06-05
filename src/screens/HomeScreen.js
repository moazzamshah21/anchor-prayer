import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Header navigation={navigation} />
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 20,
          paddingHorizontal: 16,
          backgroundColor: 'white',
        }}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: 'white' }}
      >
        {/* Verse of the Day Section */}
        <View style={[styles.PageTitleView, { marginTop: 20, backgroundColor: 'white' }]}>
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

        {/* Main Content */}
        <View style={{ marginTop: 30, backgroundColor: 'white' }}>
          {/* First Row */}
          <View style={[styles.HomeItemView, { backgroundColor: 'white' }]}>
            <View style={[styles.HomeItemMainLayer, { backgroundColor: 'white' }]}>
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
            <View style={[styles.HomeItemMainLayer, { backgroundColor: 'white' }]}>
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
          <View style={[styles.HomeItemView, { marginTop: 20, backgroundColor: 'white' }]}>
            <View style={[styles.HomeItemMainLayer, { backgroundColor: 'white' }]}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddPrayerScreen', {
                    prayerType: 'personal'
                  });
                }}>
                <Image
                  source={require('../../assets/images/add-a-prayer-icon.png')}
                  style={{ width: 150, height: 150 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.HomeItemMainLayer, { backgroundColor: 'white' }]}>
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
                  style={{ width: 150, height: 150 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={{
          marginTop: 40,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
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
    </SafeAreaView>
  );
};

export default HomeScreen;