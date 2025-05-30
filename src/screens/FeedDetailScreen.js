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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchFeedDetails = async () => {
    try {
      setLoading(true);
      
      if (!feedData) {
        const feedResponse = await RestClient.Get(`/feed/get-feed/${feedId}`);
        if (feedResponse.success) {
          setFeed(feedResponse.data);
        }
      }
      
      // Fetch prayers specific to this feed
      const prayersResponse = await RestClient.Get(
        `/prayer/get-prayer-by-feed-id?id=${feedId}&page=${currentPage}&limit=10`
      );
      
      if (prayersResponse.success) {
        setPrayers(prayersResponse.data || []);
        setCurrentPage(prayersResponse.currentPage || 1);
        setTotalPages(prayersResponse.totalPages || 1);
      }
    } finally {
      setLoading(false);
    }
  };

  const loadMorePrayers = async () => {
    if (currentPage >= totalPages) return;
    
    try {
      const nextPage = currentPage + 1;
      const prayersResponse = await RestClient.Get(
        `/prayer/get-prayer-by-feed-id?id=${feedId}&page=${nextPage}&limit=10`
      );
      
      if (prayersResponse.success) {
        setPrayers([...prayers, ...prayersResponse.data]);
        setCurrentPage(nextPage);
        setTotalPages(prayersResponse.totalPages || 1);
      }
    } catch (error) {
      console.error('Error loading more prayers:', error);
    }
  };

  const handleAddPrayer = async (prayerData) => {
    try {
      const response = await RestClient.Post('/prayer/add-pray', {
        ...prayerData,
        type: 'feed',
        groupId: feedId // Using feedId as groupId since it's a feed-specific prayer
      });
      
      if (response.success) {
        // Refresh the prayers list
        setCurrentPage(1);
        fetchFeedDetails();
      }
    } catch (error) {
      console.error('Error adding prayer:', error);
    }
  };

  useEffect(() => {
    fetchFeedDetails();
  }, [feedId, currentPage]);

  if (loading && !feed) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={ThemeColors.PRIMARY} />
      </View>
    );
  }

  return (
    <React.Fragment>
      <BackHeader navigation={navigation} title={feed.title || 'Feed Details'} />
      
      <ScrollView
        contentContainerStyle={{
          ...styles.ScrollViewContentContainerStyle,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            loadMorePrayers();
          }
        }}>
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
              Description
            </Text>
            <Text style={styles.feedDescription}>
              {feed.description || 'No description available'}
            </Text>
          </View>

          {/* Prayer List */}
          <View style={styles.prayersContainer}>
            {prayers.map((prayer, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('FeedPrayerDetailScreen', {
                  prayerData: {
                    id: prayer._id,
                    userId: prayer.userId,
                    name: prayer.name,
                    email: prayer.email,
                    title: prayer.title,
                    imageUrl: prayer.imageUrl,
                    description: prayer.description,
                    likeCount: prayer.likeCount,
                    commentCount: prayer.commentCount,
                    comments: prayer.comments,
                    isLiked: prayer.isLiked
                  },
                  title: feed.title
                })}
                activeOpacity={0.8}
              >
                <View style={styles.prayerItem}>
                  <View style={{justifyContent: 'center', flexGrow: 1}}>
                    <Text style={styles.prayerTitle}>{prayer?.title}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={require('../../assets/images/like.png')}
                        style={styles.likeIcon}
                        resizeMode="contain"
                      />
                      <Text style={styles.likeCountText}>
                        {prayer?.likeCount || 0} people like this
                      </Text>
                    </View>
                  </View>
                  <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => {
                        // LikeAndDislikePrayer(prayer?._id, isHearted);
                      }}
                      style={styles.actionButton}>
                      {prayer?.isLiked ? (
                        <AntDesign name="heart" style={{color: '#D7443E'}} size={20} />
                      ) : (
                        <Image
                          source={require('../../assets/images/heart.png')}
                          style={styles.heartIcon}
                          resizeMode="contain"
                        />
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => navigation.navigate('FeedPrayerDetailScreen', {
                        prayerData: {
                          id: prayer._id,
                          userId: prayer.userId,
                          name: prayer.name,
                          email: prayer.email,
                          title: prayer.title,
                          imageUrl: prayer.imageUrl,
                          description: prayer.description,
                          likeCount: prayer.likeCount,
                          commentCount: prayer.commentCount,
                          comments: prayer.comments,
                          isLiked: prayer.isLiked
                        },
                        title: feed.title
                      })}
                      style={[styles.actionButton, {marginLeft: 10}]}>
                      <Image
                        source={require('../../assets/images/message1.png')}
                        style={styles.messageIcon}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity>
                      <ImageBackground
                        source={require('../../assets/images/bggreen.png')}
                        style={styles.prayButtonBackground}
                        resizeMode="contain">
                        <Text style={styles.prayButtonText}>Pray</Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            
            {prayers.length === 0 && (
              <View style={styles.noPrayers}>
                <Text style={styles.noPrayersText}>No prayers available for this feed</Text>
              </View>
            )}
            
            {loading && prayers.length > 0 && (
              <ActivityIndicator size="small" color={ThemeColors.PRIMARY} />
            )}
          </View>
        </View>
      </ScrollView>

      {/* Add Prayer Button */}
      <TouchableOpacity
      style={styles.addButton}
      onPress={() => navigation.navigate('AddFeedPrayerScreen', {
        feedId,
        feedData: feed, // Send the entire feed object
        onAddPrayer: handleAddPrayer
      })}>
      <Image
        source={require('../../assets/images/add-a-prayer-icon.png')}
        style={{ width: 120, height: 120 }}
        resizeMode="contain"
      />
    </TouchableOpacity>
    </React.Fragment>
  );
};

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
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
    marginTop: 10,
    marginBottom: 20,
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
    borderRadius: 15,
    borderColor: ThemeColors.BLACK,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 30,
    alignSelf: 'center',
    paddingHorizontal: 15,
    height: 70,
    marginVertical: 8,
  },
  prayerTitle: {
    fontSize: 12,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
  },
  likeIcon: {
    width: 10,
    height: 10,
    marginLeft: -2,
  },
  likeCountText: {
    fontSize: 10,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
    marginLeft: 5,
  },
  actionButton: {
    backgroundColor: '#F0EFEF',
    borderRadius: 20,
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartIcon: {
    width: 20,
    height: 20,
  },
  messageIcon: {
    width: 20,
    height: 20,
  },
  prayButtonBackground: {
    width: 85,
    height: 85,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prayButtonText: {
    fontSize: 14,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
    textAlign: 'center',
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