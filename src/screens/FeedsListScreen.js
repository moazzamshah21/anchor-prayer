import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import styles from '../styles/FeedsListStyle';
import BackHeader from '../components/BackHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
import RestClient from '../services/RestClient';

const {width} = Dimensions.get('window');

const FeedsListScreen = ({navigation, route}) => {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const fetchFeeds = async () => {
    try {
      setError(null);
      const response = await RestClient.Get('/feed/get-all-feeds?page=1&limit=100');
      
      if (response.success) {
        setFeeds(response.data || []);
      } else {
        setError(response.message || 'Failed to fetch feeds');
      }
    } catch (err) {
      setError(err.message || 'Network request failed');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFeeds();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchFeeds();
  };

  const filteredFeeds = feeds.filter(feed => {
    if (!feed) return false;
    const searchLower = searchQuery.toLowerCase();
    return (
      (feed.title?.toLowerCase().includes(searchLower)) ||
      (feed.description?.toLowerCase().includes(searchLower))
    );
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={ThemeColors.PRIMARY || '#6DA75B'} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchFeeds} style={styles.retryButton}>
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <BackHeader navigation={navigation} title="Feeds" />
      
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[ThemeColors.PRIMARY || '#6DA75B']}
            tintColor={ThemeColors.PRIMARY || '#6DA75B'}
            progressBackgroundColor="#FFFFFF"
          />
        }
      >
        {/* Search Section */}
        <View style={styles.searchContainer}>
          <View style={styles.searchField}>
            <AntDesign
              name="search1"
              style={styles.searchIcon}
              size={20}
            />
            <TextInput
              placeholder="Search For Feed"
              placeholderTextColor={ThemeColors.DARK_GRAY || '#333333'}
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Feeds List */}
        <View style={styles.feedsListContainer}>
          {filteredFeeds.length > 0 ? (
            filteredFeeds.map((feed) => (
              <TouchableOpacity
                key={feed._id}
                onPress={() => navigation.navigate('FeedDetailScreen', { 
                  feedId: feed._id,
                  feedData: feed
                })}
                style={styles.feedItem}
              >
                <View style={styles.feedIconContainer}>
                  <ImageBackground
                    source={require('../../assets/images/round2.png')}
                    style={styles.feedIconBackground}
                    resizeMode="contain"
                  >
                    <Image
                      source={require('../../assets/images/blackbook.png')}
                      style={styles.feedIcon}
                      resizeMode="contain"
                    />
                  </ImageBackground>
                </View>
                
                <View style={styles.feedTextContainer}>
                  <Text style={styles.feedTitle} numberOfLines={1}>
                    {feed.title || 'Hello Family'}
                  </Text>
                  {/* <View style={styles.feedStatsContainer}>
                    <Image
                      source={require('../../assets/images/fillheart.png')}
                      style={styles.heartIcon}
                      resizeMode="contain"
                    />
                    <Image
                      source={require('../../assets/images/like.png')}
                      style={styles.likeIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.viewedText}>
                      {feed.likesCount || '1.5K'} people viewed
                    </Text>
                  </View> */}
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.noResults}>
              <Text style={styles.noResultsText}>
                {searchQuery ? 'No matching feeds found' : 'No feeds available'}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default FeedsListScreen;