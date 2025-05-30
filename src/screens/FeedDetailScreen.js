import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import BackHeader from '../components/BackHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
import RestClient from '../services/RestClient';

const {width} = Dimensions.get('window');

const FeedDetailScreen = ({navigation, route}) => {
  const {feedId, feedData} = route.params;
  const [feed, setFeed] = useState(feedData || null);
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedDetails = async () => {
    try {
      setLoading(true);
      
      if (!feedData) {
        const feedResponse = await RestClient.Get(`/feed/get-feed/${feedId}`);
        if (feedResponse.success) {
          setFeed(feedResponse.data);
        }
      }
      
      const prayersResponse = await RestClient.Get(`/prayer/get-by-feed/${feedId}`);
      
      if (prayersResponse.success) {
        setPrayers(prayersResponse.data || []);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedDetails();
  }, [feedId]);

  if (loading && !feed) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={ThemeColors.PRIMARY} />
      </View>
    );
  }

  return (
    <React.Fragment>
      <BackHeader navigation={navigation} title="Feed Details" />
      
      <ScrollView
        contentContainerStyle={{
          ...styles.ScrollViewContentContainerStyle,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          {/* Banner Image */}
          <ImageBackground
            source={feed.imageUrl ? {uri: feed.imageUrl} : require('../../assets/images/selected.png')}
            style={styles.bannerImage}
            resizeMode="cover">
            <View style={styles.bannerOverlay} />
          </ImageBackground>
          
          {/* Feed Title Section */}
          <View style={styles.feedHeader}>
            <Image
              source={require('../../assets/images/simple.png')}
              style={styles.feedIcon}
              resizeMode="contain"
            />
            <Text style={styles.feedTitle}>{feed.title || 'Feed Title'}</Text>
            <Text style={styles.feedSubtitle}>PRAYERS</Text>
          </View>
          
          {/* Feed Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.feedDescription}>
              {feed.description || 'No description available'}
            </Text>
          </View>

          {/* Prayer List */}
          <View style={styles.prayersContainer}>
            {prayers.map((prayer, index) => (
              <TouchableOpacity
                key={index}
                style={styles.prayerItem}
                onPress={() => navigation.navigate('PrayerDetailScreen', {prayerId: prayer._id})}>
                <View style={styles.prayerLeft}>
                  <Image
                    source={prayer.image ? {uri: prayer.image} : require('../../assets/images/blackbook.png')}
                    style={styles.prayerImage}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.prayerRight}>
                  <Text style={styles.prayerTitle}>{prayer.title}</Text>
                  <Text style={styles.prayerDescription} numberOfLines={2}>
                    {prayer.descriptions}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
            
            {prayers.length === 0 && (
              <View style={styles.noPrayers}>
                <Text style={styles.noPrayersText}>No prayers available</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* Add Prayer Button */}
      <TouchableOpacity
        style={styles.addButton}
        // onPress={() => navigation.navigate('CreateFeedPrayersScreen', {feedId})}>
        onPress={() => navigation.navigate('AddPrayerScreen', {feedId})}>

        <Image
                  source={require('../../assets/images/add-a-prayer-icon.png')}
                  style={{ width: 150, height: 150 }}
                  resizeMode="contain"
        />
      </TouchableOpacity>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ScrollViewContentContainerStyle: {
    paddingBottom: 20,
  backgroundColor: ThemeColors.WHITE,
  flexGrow: 1,
  },
  MainContainer: {
    flex: 1,
    backgroundColor: ThemeColors.WHITE,
  },
  bannerImage: {
    width: width,
    height: width - 150,
    alignSelf: 'center',
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  feedHeader: {
    alignItems: 'center',
    marginTop: -60,
  },
  feedIcon: {
    width: 120,
    height: 120,
  },
  feedTitle: {
    fontFamily: ThemeFonts.BOLD,
    fontSize: 22,
    color: ThemeColors.DARK,
    marginTop: 5,
    textAlign: 'center',
  },
  feedSubtitle: {
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 16,
    color: ThemeColors.DARK_GRAY,
    marginTop: 5,
    textAlign: 'center',
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  feedDescription: {
    fontFamily: ThemeFonts.REGULAR,
    fontSize: 16,
    color: ThemeColors.DARK_GRAY,
    lineHeight: 24,
    textAlign: 'center',
  },
  prayersContainer: {
    marginBottom: 20,
    width: '100%',
  },
  prayerItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  prayerLeft: {
    width: 90,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prayerImage: {
    width: 20,
    height: 14,
  },
  prayerRight: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -7,
  },
  prayerTitle: {
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 16,
    color: ThemeColors.DARK,
    marginBottom: 5,
  },
  prayerDescription: {
    fontFamily: ThemeFonts.REGULAR,
    fontSize: 14,
    color: ThemeColors.DARK_GRAY,
    lineHeight: 20,
  },
  noPrayers: {
    padding: 20,
    alignItems: 'center',
  },
  noPrayersText: {
    fontFamily: ThemeFonts.REGULAR,
    fontSize: 16,
    color: ThemeColors.DARK_GRAY,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: ThemeColors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default FeedDetailScreen;