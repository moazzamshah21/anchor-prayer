import React, {useState, useEffect, useCallback} from 'react';
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
  const [likeLoading, setLikeLoading] = useState({});
  const [commentLoading, setCommentLoading] = useState({});

  const fetchFeedDetails = useCallback(async () => {
    try {
      setLoading(true);
      
      if (!feedData) {
        const feedResponse = await RestClient.Get(`/feed/get-feed/${feedId}`);
        if (feedResponse.success) {
          setFeed(feedResponse.data);
        }
      }
      
      const prayersResponse = await RestClient.Get(
        `/prayer/get-prayer-by-feed-id?id=${feedId}&page=${currentPage}&limit=10`
      );
      
      if (prayersResponse.success) {
        const normalizedPrayers = prayersResponse.data.map(prayer => ({
          ...prayer,
          isLiked: prayer.isLiked || prayer.isLike || false,
          comments: prayer.comments || []
        }));
        
        if (currentPage === 1) {
          setPrayers(normalizedPrayers);
        } else {
          setPrayers(prev => [...prev, ...normalizedPrayers]);
        }
        
        setCurrentPage(prayersResponse.currentPage || 1);
        setTotalPages(prayersResponse.totalPages || 1);
      }
    } finally {
      setLoading(false);
    }
  }, [feedId, currentPage, feedData]);

  const loadMorePrayers = async () => {
    if (currentPage >= totalPages) return;
    setCurrentPage(prev => prev + 1);
  };

  const handleAddPrayer = async (prayerData) => {
    try {
      const response = await RestClient.Post('/prayer/add-pray', {
        ...prayerData,
        type: 'feed',
        groupId: feedId
      });
      
      if (response.success) {
        setCurrentPage(1);
        fetchFeedDetails();
      }
    } catch (error) {
      console.error('Error adding prayer:', error);
    }
  };

  const handleLikePrayer = async (prayerId) => {
    try {
      setLikeLoading(prev => ({...prev, [prayerId]: true}));
      const response = await RestClient.Post('/prayer/like', {prayerId});
      
      if (response.success) {
        setPrayers(prevPrayers => 
          prevPrayers.map(prayer => {
            if (prayer._id === prayerId) {
              return {
                ...prayer,
                isLiked: true,
                likeCount: (prayer.likeCount || 0) + 1
              };
            }
            return prayer;
          })
        );
      }
    } catch (error) {
      console.error('Error liking prayer:', error);
    } finally {
      setLikeLoading(prev => ({...prev, [prayerId]: false}));
    }
  };
  
  const handleDislikePrayer = async (prayerId) => {
    try {
      setLikeLoading(prev => ({...prev, [prayerId]: true}));
      const response = await RestClient.Post('/prayer/dislike', {prayerId});
      
      if (response.success) {
        setPrayers(prevPrayers => 
          prevPrayers.map(prayer => {
            if (prayer._id === prayerId) {
              return {
                ...prayer,
                isLiked: false,
                likeCount: Math.max(0, (prayer.likeCount || 0) - 1)
              };
            }
            return prayer;
          })
        );
      }
    } catch (error) {
      console.error('Error disliking prayer:', error);
    } finally {
      setLikeLoading(prev => ({...prev, [prayerId]: false}));
    }
  };
  
  const handleLikeDislike = (prayerId, isLiked) => {
    if (isLiked) {
      handleDislikePrayer(prayerId);
    } else {
      handleLikePrayer(prayerId);
    }
  };

  const handleAddComment = useCallback(async (prayerId, commentText) => {
    try {
      setCommentLoading(prev => ({...prev, [prayerId]: true}));
      const response = await RestClient.Post('/prayer/add-comment', {
        prayerId,
        comment: commentText
      });
  
      if (response.success) {
        const newComment = response.data?.comment || {
          userId: "unknown",
          name: "You",
          email: "",
          comment: commentText,
          createdAt: new Date().toISOString()
        };
        
        setPrayers(prevPrayers => 
          prevPrayers.map(prayer => {
            if (prayer._id === prayerId) {
              return {
                ...prayer,
                comments: [...(prayer.comments || []), newComment]
              };
            }
            return prayer;
          })
        );
        
        return {success: true};
      }
      return {success: false};
    } catch (error) {
      console.error('Error adding comment:', error);
      return {success: false};
    } finally {
      setCommentLoading(prev => ({...prev, [prayerId]: false}));
    }
  }, []);

  useEffect(() => {
    fetchFeedDetails();
  }, [fetchFeedDetails]);

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
          <ImageBackground
            source={feed.imageUrl ? {uri: feed.imageUrl} : require('../../assets/images/selected.png')}
            style={styles.bannerImage}
            resizeMode="cover">
            <View style={styles.bannerOverlay} />
          </ImageBackground>
          
          <View style={styles.feedHeader}>
            <Image
              source={require('../../assets/images/simple.png')}
              style={styles.feedIcon}
              resizeMode="contain"
            />
            <Text style={styles.feedTitle}>{feed.title || 'Feed Title'}</Text>
            <Text style={styles.feedSubtitle}>PRAYERS</Text>
          </View>
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.feedDescription}>
              {feed.description || 'No description available'}
            </Text>
          </View>

          <View style={styles.prayersContainer}>
            {prayers.map((prayer) => (
              <TouchableOpacity
                key={prayer._id}
                onPress={() => navigation.navigate('FeedPrayerDetailScreen', {
                  prayerData: {
                    ...prayer,
                    comments: prayer.comments || []
                  },
                  title: feed.title,
                  onAddComment: (commentText) => handleAddComment(prayer._id, commentText)
                })}
                activeOpacity={0.8}
              >
                <View style={styles.prayerItem}>
                  <View style={{justifyContent: 'center', flexGrow: 1}}>
                    <Text style={styles.prayerTitle}>{prayer.title}</Text>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        source={require('../../assets/images/like.png')}
                        style={styles.likeIcon}
                        resizeMode="contain"
                      />
                      <Text style={styles.likeCountText}>
                        {prayer.likeCount || 0} people like this
                      </Text>
                    </View>
                  </View>
                  <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => !likeLoading[prayer._id] && handleLikeDislike(prayer._id, prayer.isLiked)}
                      style={styles.actionButton}
                      disabled={likeLoading[prayer._id]}>
                      {likeLoading[prayer._id] ? (
                        <ActivityIndicator size="small" color="#D7443E" />
                      ) : prayer.isLiked ? (
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
                          ...prayer,
                          comments: prayer.comments || []
                        },
                        title: feed.title,
                        onAddComment: (commentText) => handleAddComment(prayer._id, commentText)
                      })}
                      style={[styles.actionButton, {marginLeft: 10}]}>
                      {commentLoading[prayer._id] ? (
                        <ActivityIndicator size="small" color="#000" />
                      ) : (
                        <Image
                          source={require('../../assets/images/message1.png')}
                          style={styles.messageIcon}
                          resizeMode="contain"
                        />
                      )}
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

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddFeedPrayerScreen', {
          feedId,
          feedData: feed,
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