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
  Platform
} from 'react-native';
import HeaderBlack from '../components/HeaderBlack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ThemeColors } from '../utils/Theme';

const { width, height } = Dimensions.get('window');

const FeedPrayerDetailScreen = ({ navigation, route }) => {
  const { prayerData, title, onAddComment } = route.params;
  const [isVisible, setIsVisible] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(prayerData.comments || []);
  const headerAnim = useRef(new Animated.Value(-100)).current;
  const scrollViewRef = useRef();

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
    if (commentText.trim() === '') return;
    
    try {
      const success = await onAddComment(commentText);
      if (success && success.data && success.data.comment) {
        const newComment = {
          userId: success.data.comment.userId,
          name: success.data.comment.name,
          email: success.data.comment.email,
          comment: success.data.comment.comment,
          createdAt: success.data.comment.createdAt
        };
        
        setComments([...comments, newComment]);
        setCommentText('');
        
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 100);
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
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
                <Text style={styles.headerSubText}>Prayer Details</Text>
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
                    name="heart" 
                    size={20} 
                    color={ThemeColors.WHITE} 
                  />
                  <Text style={styles.statText}>{prayerData.likeCount || 0}</Text>
                </View>
                
                <View style={styles.statItem}>
                  <Image
                    source={require('../../assets/images/message1.png')}
                    style={styles.commentIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.statText}>{comments.length}</Text>
                </View>
              </View>
            </View>

            {/* Comments Section */}
            <View style={styles.commentsSection}>
              <Text style={styles.commentsTitle}>Comments ({comments.length})</Text>
              
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <View key={`${comment.userId}-${comment.createdAt}`} style={styles.commentItem}>
                    <Text style={styles.commentUser}>{comment.name}</Text>
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
            />
            <TouchableOpacity 
              style={styles.commentSubmitButton}
              onPress={handleSubmitComment}
            >
              <Text style={styles.commentSubmitText}>Post</Text>
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
  commentIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
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
    paddingVertical: 10,
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

export default FeedPrayerDetailScreen;