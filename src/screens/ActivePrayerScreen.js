import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import styles from '../styles/ActivePrayerStyle';
import HeaderBlack from '../components/HeaderBlack';
import PrayerService from '../services/Prayer/PrayerService';
import {showMessage} from 'react-native-flash-message';
import ActivePrayerItem from '../components/ActivePrayerItem';
import RestClient from '../services/RestClient'; // Import your RestClient

const {width} = Dimensions.get('window');

const ActivePrayerScreen = ({navigation, route}) => {
  const {name} = route.params;
  const [prayers, setPrayers] = useState([]);
  const [feedImages, setFeedImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch prayers
      const prayerResponse = await PrayerService.GetPrayersByType(name, 1, 10);
      if (prayerResponse?.success) {
        setPrayers(prayerResponse?.data);
      } else {
        showMessage({
          message: prayerResponse?.message || 'Failed to load prayers',
          type: 'danger',
        });
      }

      // Fetch feed images using RestClient
      const feedResponse = await RestClient.Get('/feed/get-all-feeds?page=1&limit=10');
      if (feedResponse?.success) {
        setFeedImages(feedResponse.data);
      } else {
        showMessage({
          message: feedResponse?.message || 'Failed to load feed images',
          type: 'danger',
        });
      }
    } catch (error) {
      showMessage({
        message: 'Network error. Please try again.',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <HeaderBlack
        lessThenIcon
        Name={'ACTIVE PRAYERS'}
        navigation={navigation}
        noModal={true}
      />
      
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          {/* Feed Image Banner - Using the first feed image */}
          {feedImages.length > 0 && (
            <Image
              source={{uri: feedImages[0].image}}
              style={{
                width: width,
                height: width - 150,
                alignSelf: 'center',
              }}
              resizeMode="cover"
            />
          )}

          <View style={{alignItems: 'flex-start'}}>
            <Image
              source={require('../../assets/images/simple.png')}
              style={{
                width: 120,
                height: 120,
                marginTop: -60,
              }}
              resizeMode="contain"
            />
          </View>
          
          <Text style={styles.ActiveHeading}>Active Prayers</Text>
          {/* <Text style={styles.ActiveHeadingSub}>APPLICATION</Text> */}

          <View style={{width: '100%'}}>
            {prayers?.map((item, index) => (
              <ActivePrayerItem
                key={index}
                item={item}
                index={index}
                navigation={navigation}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ActivePrayerScreen;