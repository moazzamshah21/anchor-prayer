import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ImageBackground, 
  Image, 
  Dimensions,
  Animated,
  TextInput,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import HeaderBlack from '../components/HeaderBlack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ThemeColors } from '../utils/Theme';
import RestClient from '../services/RestClient';

const { width, height } = Dimensions.get('window');

const GroupPrayerDetailScreen = ({ navigation, route }) => {
  const { prayerData, title } = route.params;
  const [isVisible, setIsVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(prayerData.comments || []);
  const [loading, setLoading] = useState(false);
  const headerAnim = useRef(new Animated.Value(-100)).current;
  const scrollViewRef = useRef();

  // Fetch comments when component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await RestClient.Get(`/prayer/get-comments?prayerId=${prayerData.id}`);
        if (response.success) {
          setComments(response.data || []);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    
    fetchComments();
  }, [prayerData.id]);

  useEffect(() => {
    if (isVisible) {
      animateHeader(true);
      const timer = setTimeout(() => {
        animateHeader(false);
        setIsVisible(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const animateHeader = (show) => {
    Animated.timing(headerAnim, {
      toValue: show ? 0 : -100,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const showHeader = () => {
    setIsVisible(true);
  };

  const handleOnPressBack = () => {
    navigation.goBack();
  };

  const handleSubmitComment = async () => {
    if (commentText.trim() === '' || loading) return;
    
    try {
      setLoading(true);
      const response = await RestClient.Post('/prayer/add-comment', {
        prayerId: prayerData.id,
        comment: commentText
      });
      
      if (response.success) {
        // Create new comment with fallback values
        const newComment = {
          userId: response.data?.userId || 'unknown',
          name: response.data?.name || 'Anonymous',
          email: response.data?.email || '',
          comment: commentText,
          createdAt: new Date().toISOString()
        };
        
        setComments([...comments, newComment]);
        setCommentText('');
        
        // Scroll to bottom after adding comment
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
      showMessage({
        message: 'Failed to add comment',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >
      <View style={styles.MainContainer}>
        <ImageBackground 
          source={require('../../assets/images/gradient-background.png')}
          style={{ width: '100%', height: '100%' }}
        >
          {/* Header */}
          <Animated.View style={[styles.header, { transform: [{ translateY: headerAnim }] }]}>
            <View style={styles.headerContainer}>
              <View style={styles.headerIconBox}>
                <TouchableOpacity onPress={handleOnPressBack}>
                  <FontAwesome5 name="angle-left" style={{ color: 'white' }} size={25} />
                </TouchableOpacity>
              </View>
              <View style={styles.headerContentBox}>
                <Text style={styles.headerText}>{title}</Text>
                <Text style={styles.headerSubText}>Group Prayer</Text>
              </View>
              <View style={styles.headerIconBox}>
                <TouchableOpacity onPress={() => navigation.navigate('PrayerTimerScreen')}>
                  <Ionicons name="timer-outline" style={{ color: 'white' }} size={25} />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>

          {/* Content */}
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            onTouchStart={showHeader}
          >
            <View style={styles.prayerContainer}>
              <Image
                source={require('../../assets/images/pray2.png')}
                style={styles.prayerIcon}
                resizeMode="contain"
              />
              <Text style={styles.prayerTitle}>{prayerData.title}</Text>
              <Text style={styles.prayerDescription}>{prayerData.description}</Text>
              
              {/* Like and Comment Count */}
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <AntDesign 
                    name={prayerData.isLiked ? "heart" : "hearto"} 
                    size={20} 
                    color={prayerData.isLiked ? ThemeColors.PRIMARY : ThemeColors.WHITE} 
                  />
                  <Text style={styles.statText}>{prayerData.likeCount || 0}</Text>
                </View>
                
                <View style={styles.statItem}>
                  <Ionicons
                    name="chatbubble-outline"
                    size={20}
                    color={ThemeColors.WHITE}
                  />
                  <Text style={styles.statText}>{comments.length}</Text>
                </View>
              </View>
            </View>

            {/* Comments Section */}
            <View style={styles.commentsSection}>
              <Text style={styles.commentsTitle}>Comments ({comments.length})</Text>
              
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <View key={`${comment.userId}-${index}`} style={styles.commentItem}>
                    <Text style={styles.commentUser}>
                      {comment.name || 'Anonymous'}
                    </Text>
                    <Text style={styles.commentText}>{comment.comment}</Text>
                    <Text style={styles.commentTime}>
                      {new Date(comment.createdAt).toLocaleString()}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noCommentsText}>No comments yet</Text>
              )}
            </View>
          </ScrollView>

          {/* Comment Input */}
          <View style={styles.commentInputContainer}>
            <TextInput
              style={styles.commentInput}
              placeholder="Write a comment..."
              placeholderTextColor="#999"
              value={commentText}
              onChangeText={setCommentText}
              multiline
              editable={!loading}
            />
            <TouchableOpacity 
              style={[styles.commentSubmitButton, loading && { opacity: 0.7 }]}
              onPress={handleSubmitComment}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.commentSubmitText}>Post</Text>
              )}
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 10,
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  headerIconBox: {
    width: 40,
    alignItems: 'center',
  },
  headerContentBox: {
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerSubText: {
    color: 'white',
    fontSize: 14,
  },
  contentContainer: {
    paddingTop: 80,
    paddingBottom: 80,
    paddingHorizontal: 20,
  },
  prayerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  prayerIcon: {
    width: 108,
    height: 84,
    marginBottom: 20,
  },
  prayerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  prayerDescription: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  statText: {
    color: 'white',
    marginLeft: 5,
    fontSize: 16,
  },
  commentsSection: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    paddingTop: 20,
  },
  commentsTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  commentItem: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  commentUser: {
    color: ThemeColors.PRIMARY,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentText: {
    color: 'white',
    fontSize: 14,
    lineHeight: 20,
  },
  commentTime: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
    marginTop: 5,
  },
  noCommentsText: {
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    marginVertical: 20,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  commentInput: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: Platform.OS === 'ios' ? 10 : 8,
    maxHeight: 100,
    color: 'black',
  },
  commentSubmitButton: {
    marginLeft: 10,
    backgroundColor: ThemeColors.PRIMARY,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  commentSubmitText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default GroupPrayerDetailScreen;