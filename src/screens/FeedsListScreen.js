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
        <ActivityIndicator size="large" color={ThemeColors.PRIMARY} />
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
    <React.Fragment>
      <BackHeader navigation={navigation} title="Feeds" />
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[ThemeColors.PRIMARY]}
          />
        }>
        <View style={styles.MainContainer}>
          <View style={{marginTop: 20, paddingHorizontal: 20}}>
            <View style={styles.SearchFieldView}>
              <AntDesign
                name="search1"
                style={{color: ThemeColors.DARK_GRAY}}
                size={20}
              />
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '85%',
                }}>
                <TextInput
                  placeholder="Search For Feed"
                  placeholderTextColor={ThemeColors?.DARK_GRAY}
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    textAlign: 'center',
                    fontFamily: ThemeFonts.MEDIUM,
                    color: ThemeColors?.DARK_GRAY,
                    width: '100%',
                    paddingLeft: 20,
                  }}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
            </View>
          </View>

          <View style={{marginTop: 50}}>
            {filteredFeeds.length > 0 ? (
              filteredFeeds.map((feed, index) => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('FeedDetailScreen', { 
                      feedId: feed._id,
                      feedData: feed
                    });
                  }}
                  key={`index-${index}`}
                  style={{
                    paddingHorizontal: 20,
                    flexDirection: 'row',
                    marginTop: -15,
                  }}>
                  <ImageBackground
                    source={require('../../assets/images/round2.png')}
                    style={{
                      width: 90,
                      height: 90,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    resizeMode="contain">
                    <Image
                      source={require('../../assets/images/blackbook.png')}
                      style={{
                        width: 20,
                        height: 14,
                        marginTop: -5,
                      }}
                      resizeMode="contain"
                    />
                  </ImageBackground>
                  <View
                    style={{
                      justifyContent: 'center',
                      marginTop: -7,
                    }}>
                    <Text style={styles.HelloText}>
                      {feed.title || 'Hello Family'}
                    </Text>
                    {/* <View style={{flexDirection: 'row'}}>
                      <Image
                        source={require('../../assets/images/fillheart.png')}
                        style={{
                          width: 10,
                          height: 10,
                        }}
                        resizeMode="contain"
                      />
                      <Image
                        source={require('../../assets/images/like.png')}
                        style={{
                          width: 10,
                          height: 10,
                          marginLeft: -2,
                        }}
                        resizeMode="contain"
                      />
                      <Text style={styles.ViewedText}>
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
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default FeedsListScreen;