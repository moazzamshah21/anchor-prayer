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
import RestClient from '../services/RestClient';

const {width} = Dimensions.get('window');

const ActivePrayerScreen = ({navigation, route}) => {
  const {name} = route.params;
  const [prayers, setPrayers] = useState([]);
  const [feedImages, setFeedImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch personal prayers with pagination
      const prayerResponse = await PrayerService.GetPrayersByType(
        'personal', // Hardcoded to fetch personal prayers
        page,
        limit
      );
      
      if (prayerResponse?.success) {
        // If page is 1, replace the prayers, otherwise append to existing prayers
        setPrayers(prevPrayers => 
          page === 1 ? prayerResponse?.data : [...prevPrayers, ...prayerResponse?.data]
        );
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

  const loadMorePrayers = () => {
    if (!loading) {
      setPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]); // Refetch when page changes

  if (loading && page === 1) {
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
        Name={'PERSONAL PRAYERS'} // Changed header title
        navigation={navigation}
        noModal={true}
      />
      
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 20,
        }}
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        onScroll={({nativeEvent}) => {
          // Implement infinite scroll
          if (isCloseToBottom(nativeEvent)) {
            loadMorePrayers();
          }
        }}
        scrollEventThrottle={400}
      >
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
          
          <Text style={styles.ActiveHeading}>Personal Prayers</Text>
          {/* <Text style={styles.ActiveHeadingSub}>APPLICATION</Text> */}

          <View style={{width: '100%'}}>
            {prayers?.map((item, index) => (
              <ActivePrayerItem
                key={`${item._id}-${index}`} // Better key using unique ID
                item={item}
                index={index}
                navigation={navigation}
              />
            ))}
          </View>

          {loading && page > 1 && (
            <ActivityIndicator size="small" style={{marginVertical: 10}} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

// Helper function to check if scroll is near bottom
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

export default ActivePrayerScreen;