import React, {useState, useRef, useEffect, createRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,
  TextInput,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Modal,
  SafeAreaView
} from 'react-native';
import styles from '../styles/ActiveGroupStyle';
import BackHeader from '../components/BackHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
import GroupService from '../services/Group/GroupService';
import {showMessage} from 'react-native-flash-message';
import RestClient from '../services/RestClient';
import {useSelector} from 'react-redux';

const {width, height} = Dimensions.get('window');

const ActiveGroupScreen = ({navigation, route}) => {
  const { groupId } = route.params;
  const contactList = useSelector(state => state.GroupReducer.contactList);
  const actionSheetRef = createRef();
  const [groupDetail, setGroupDetail] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [prayers, setPrayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [likeLoading, setLikeLoading] = useState({});
  const [commentLoading, setCommentLoading] = useState({});
  
  // Add Members State
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);
  const [verifiedIds, setVerifiedIds] = useState([]);
  const [verifiedNames, setVerifiedNames] = useState([]);
  const [membersListFromApi, setMembersListFromApi] = useState([]);

  const onLoadGroupDetail = async () => {
    var response = await GroupService.getGroupDetail(groupId);
    if (response?.success) {
      setGroupDetail(response?.data);
      setIsLike(response?.data?.isLike);
    } else {
      showMessage({
        message: response?.message,
        type: 'danger',
      });
    }
  };

  const fetchGroupPrayers = async () => {
    try {
      setLoading(true);
      const prayersResponse = await RestClient.Get(
        `/prayer/get-prayer-by-group-id?id=${groupId}`
      );
      
      if (prayersResponse?.success) {
        const prayersWithLikeStatus = prayersResponse.data.map(prayer => ({
          ...prayer,
          isLiked: prayer.isLiked || prayer.isLike || false,
          comments: (prayer.comments || []).map(comment => ({
            ...comment,
            name: comment.name || 'You'
          }))
        }));
        setPrayers(prayersWithLikeStatus || []);
      }
    } catch (error) {
      console.error('Error fetching group prayers:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle comment updates from GroupPrayerDetailScreen
  useEffect(() => {
    if (route.params?.updatedPrayerId && route.params?.newComment) {
      setPrayers(prevPrayers => 
        prevPrayers.map(prayer => {
          if (prayer._id === route.params.updatedPrayerId) {
            return {
              ...prayer,
              commentCount: (prayer.commentCount || 0) + 1,
              comments: [...(prayer.comments || []), route.params.newComment]
            };
          }
          return prayer;
        })
      );
      
      // Clear the params to avoid duplicate updates
      navigation.setParams({
        updatedPrayerId: undefined,
        newComment: undefined
      });
    }
  }, [route.params?.updatedPrayerId, route.params?.newComment]);

  const loadMorePrayers = async () => {
    if (currentPage >= totalPages) return;
    
    try {
      const nextPage = currentPage + 1;
      const prayersResponse = await RestClient.Get(
        `/prayer/get-prayers-by-type?type=group&groupId=${groupId}&page=${nextPage}&limit=10`
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
        title: prayerData.title,
        description: prayerData.description,
        imageBase64: prayerData.imageBase64 || '',
        type: 'group',
        groupId: prayerData.groupId,
      });
      
      if (response?.success) {
        fetchGroupPrayers();
        showMessage({
          message: 'Prayer added successfully',
          type: 'success',
        });
      } else {
        showMessage({
          message: response?.message || 'Failed to add prayer',
          type: 'danger',
        });
      }
    } catch (error) {
      console.error('Error adding prayer:', error);
      showMessage({
        message: 'Failed to add prayer. Please try again.',
        type: 'danger',
      });
    }
  };

  const handleLikePrayer = async (prayerId) => {
    try {
      setLikeLoading(prev => ({...prev, [prayerId]: true}));
      const response = await RestClient.Post('/prayer/like', {
        prayerId: prayerId
      });
      
      if (response.success) {
        setPrayers(prayers.map(prayer => {
          if (prayer._id === prayerId) {
            return {
              ...prayer,
              isLiked: true,
              isLike: true,
              likeCount: prayer.likeCount + 1
            };
          }
          return prayer;
        }));
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
      const response = await RestClient.Post('/prayer/dislike', {
        prayerId: prayerId
      });
      
      if (response.success) {
        setPrayers(prayers.map(prayer => {
          if (prayer._id === prayerId) {
            return {
              ...prayer,
              isLiked: false,
              isLike: false,
              likeCount: Math.max(0, prayer.likeCount - 1)
            };
          }
          return prayer;
        }));
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

  const handleAddComment = async (prayerId, commentText) => {
    try {
      setCommentLoading(prev => ({...prev, [prayerId]: true}));
      const response = await RestClient.Post('/prayer/add-comment', {
        prayerId: prayerId,
        comment: commentText
      });
      
      if (response.success) {
        setPrayers(prayers.map(prayer => {
          if (prayer._id === prayerId) {
            const newComment = {
              userId: response.data?.userId || 'unknown',
              name: response.data?.name || 'You',
              email: response.data?.email || '',
              comment: commentText,
              createdAt: new Date().toISOString()
            };
            
            return {
              ...prayer,
              commentCount: (prayer.commentCount || 0) + 1,
              comments: [...(prayer.comments || []), newComment]
            };
          }
          return prayer;
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding comment:', error);
      showMessage({
        message: 'Failed to add comment',
        type: 'danger',
      });
      return false;
    } finally {
      setCommentLoading(prev => ({...prev, [prayerId]: false}));
    }
  };
  
  const onPressLikeDisLike = async () => {
    if (!isLike) {
      var payload = {
        groupId: groupId,
      };
      var response = await GroupService.LikeGroup(payload);
      if (response?.success) {
        setIsLike(true);
      } else {
        showMessage({
          message: response?.message,
          type: 'danger',
        });
      }
    } else {
      var payload = {
        groupId: groupId,
      };
      var response = await GroupService.DisLikeGroup(payload);
      if (response?.success) {
        setIsLike(false);
      } else {
        showMessage({
          message: response?.message,
          type: 'danger',
        });
      }
    }
  };

  const onPressApproveBtn = async (id) => {
    try {
      var payload = {
        groupId: groupId,
        requesterId: id,
      };
      
      var response = await GroupService.Approve(payload);
      
      if (response?.success) {
        setGroupDetail(prev => {
          const updatedRequestedUsers = prev.requestedUsers.filter(user => user._id !== id);
          const approvedUser = prev.requestedUsers.find(user => user._id === id);
          const updatedUsers = approvedUser 
            ? [...prev.users, approvedUser]
            : prev.users;
            
          return {
            ...prev,
            requestedUsers: updatedRequestedUsers,
            users: updatedUsers
          };
        });
        
        showMessage({
          message: response?.message || 'Request approved successfully',
          type: 'success',
        });
      } else {
        showMessage({
          message: response?.message || 'Failed to approve request',
          type: 'danger',
        });
      }
    } catch (error) {
      console.error('Approval error:', error);
      showMessage({
        message: error.response?.data?.message || 'Internal server error',
        type: 'danger',
      });
    }
  };

  const renderRequestedUsers = ({item, index}) => {
    const isAlreadyMember = groupDetail?.users?.some(user => user._id === item._id);
    
    if (isAlreadyMember) {
      return null;
    }

    return (
      <View key={`${index}`} style={styles.ContactRenderItemView}>
        <View style={{marginLeft: 10}}>
          <Text style={styles.NameTextItem}>{item?.fullName}</Text>
          <Text style={styles.ContactTextItem}>
            {item?.phoneNumber}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            onPressApproveBtn(item?._id);
          }}
          style={styles.ApproveBtnView}>
          <Text style={styles.ApproveBtnText}>Approve</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const usersWithColors = groupDetail?.users?.map(user => ({
    ...user,
    color: getRandomColor(),
  }));

  useEffect(() => {
    onLoadGroupDetail();
    fetchGroupPrayers();
  }, [groupId]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <BackHeader navigation={navigation} title="Group Details" />
      
      {/* Fixed Group Detail Section */}
      <View style={localStyles.fixedHeader}>
        <View style={{marginTop: 10, paddingHorizontal: 15}}>
          <Text style={styles.LoginDetailsHeading}>{groupDetail?.name}</Text>
        </View>
        
        <View style={styles.ActiveGroupItem}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.NameTExt}>{groupDetail?.name}</Text>
              <Text style={styles.DescText}>{groupDetail?.description || 'Group Prayers'}</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={onPressLikeDisLike}
                style={[styles.GrayRound, isLike && {backgroundColor: '#FFEEEE'}]}>
                {isLike ? (
                  <AntDesign
                    name="heart"
                    style={{color: 'red'}}
                    size={15}
                  />
                ) : (
                  <Image
                    source={require('../../assets/images/heart.png')}
                    style={{width: 14, height: 14}}
                    resizeMode="contain"
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity style={[styles.GrayRound, {marginLeft: 5}]}>
                <Image
                  source={require('../../assets/images/farward.png')}
                  style={{width: 14, height: 14}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={styles.GrayRound}>
                <AntDesign
                  name="logout"
                  style={{color: ThemeColors.DARK_GRAY}}
                  size={15}
                />
              </TouchableOpacity>
              {/* {groupDetail?.isAdmin && (
                <TouchableOpacity
                  onPress={() => {
                    OpenCommentSheet();
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      OpenCommentSheet();
                    }}
                    style={[styles.GrayRound, {marginLeft: 5}]}>
                    <Ionicons
                      name="notifications-outline"
                      style={{color: ThemeColors.DARK_GRAY}}
                      size={15}
                    />
                  </TouchableOpacity>
                  {groupDetail?.requestedUsers?.length > 0 && (
                    <View
                      style={{
                        position: 'absolute',
                        width: 15,
                        height: 15,
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'red',
                        top: -5,
                        right: -2,
                      }}>
                      <Text>{groupDetail?.requestedUsers?.length}</Text>
                    </View>
                  )}
                </TouchableOpacity>
              )} */}
            </View>
          </View>
          <View style={localStyles.creatorContainer}>
            <View style={localStyles.creatorInfo}>
              <View style={localStyles.creatorInitial}>
                <Text style={localStyles.creatorInitialText}>
                  {groupDetail?.adminName?.charAt(0) || 'A'}
                </Text>
              </View>
              <View style={localStyles.creatorTextContainer}>
                <Text style={localStyles.creatorName}>{groupDetail?.adminName || 'Admin'}</Text>
                <Text style={localStyles.creatorRole}>Group Creator</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Scrollable Prayers List */}
      <ScrollView 
        style={localStyles.scrollContainer}
        contentContainerStyle={{paddingBottom: 100}}
        showsVerticalScrollIndicator={false}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            loadMorePrayers();
          }
        }}
        scrollEventThrottle={400}
      >
        <View style={localStyles.prayersContainer}>
          <Text style={localStyles.sectionTitle}>Group Prayers</Text>
          
          {prayers.map((prayer, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('GroupPrayerDetailScreen', {
                prayerData: {
                  id: prayer._id,
                  userId: prayer.userId,
                  name: prayer.name,
                  email: prayer.email,
                  title: prayer.title,
                  description: prayer.description,
                  likeCount: prayer.likeCount,
                  commentCount: prayer.commentCount,
                  comments: prayer.comments || [],
                  isLiked: prayer.isLiked || prayer.isLike || false
                },
                title: groupDetail.name,
                onCommentAdded: (newComment) => {
                  setPrayers(prevPrayers => 
                    prevPrayers.map(p => {
                      if (p._id === prayer._id) {
                        return {
                          ...p,
                          commentCount: (p.commentCount || 0) + 1,
                          comments: [...(p.comments || []), newComment]
                        };
                      }
                      return p;
                    })
                  );
                }
              })}
              activeOpacity={0.8}
            >
              <View style={localStyles.prayerItem}>
                <View style={{justifyContent: 'center', flexGrow: 1}}>
                  <Text style={localStyles.prayerTitle}>{prayer?.title}</Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={require('../../assets/images/like.png')}
                      style={localStyles.likeIcon}
                      resizeMode="contain"
                    />
                    <Text style={localStyles.likeCountText}>
                      {prayer?.likeCount || 0} people like this
                    </Text>
                  </View>
                </View>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => !likeLoading[prayer._id] && handleLikeDislike(prayer._id, prayer.isLiked)}
                    style={[localStyles.actionButton, prayer.isLiked && {backgroundColor: '#FFEEEE'}]}
                    disabled={likeLoading[prayer._id]}>
                    {likeLoading[prayer._id] ? (
                      <ActivityIndicator size="small" color="#D7443E" />
                    ) : prayer.isLiked ? (
                      <AntDesign name="heart" style={{color: '#D7443E'}} size={20} />
                    ) : (
                      <Image
                        source={require('../../assets/images/heart.png')}
                        style={localStyles.heartIcon}
                        resizeMode="contain"
                      />
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('GroupPrayerDetailScreen', {
                      prayerData: {
                        id: prayer._id,
                        userId: prayer.userId,
                        name: prayer.name,
                        email: prayer.email,
                        title: prayer.title,
                        description: prayer.description,
                        likeCount: prayer.likeCount,
                        commentCount: prayer.commentCount,
                        comments: prayer.comments || [],
                        isLiked: prayer.isLiked || prayer.isLike || false
                      },
                      title: groupDetail.name,
                      onCommentAdded: (newComment) => {
                        setPrayers(prevPrayers => 
                          prevPrayers.map(p => {
                            if (p._id === prayer._id) {
                              return {
                                ...p,
                                commentCount: (p.commentCount || 0) + 1,
                                comments: [...(p.comments || []), newComment]
                              };
                            }
                            return p;
                          })
                        );
                      }
                    })}
                    style={[localStyles.actionButton, {marginLeft: 10}]}>
                    {commentLoading[prayer._id] ? (
                      <ActivityIndicator size="small" color="#000" />
                    ) : (
                      <Image
                        source={require('../../assets/images/message1.png')}
                        style={localStyles.messageIcon}
                        resizeMode="contain"
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
          
          {prayers.length === 0 && !loading && (
            <View style={localStyles.noPrayers}>
              <Text style={localStyles.noPrayersText}>No prayers available for this group</Text>
            </View>
          )}
          
          {loading && prayers.length > 0 && (
            <ActivityIndicator size="small" color={ThemeColors.PRIMARY} />
          )}
        </View>
      </ScrollView>

      <View style={{alignItems: 'center', paddingBottom: 10}}>
        <Text style={styles.LogoText}>
          Designed by:{'\n'}digitalsoftwarelabs.com
        </Text>
      </View>

      <TouchableOpacity
        style={localStyles.addButton}
        onPress={() => navigation.navigate('GroupAddPrayerScreen', {
          groupId: groupId,
          onAddPrayer: (prayerData) => handleAddPrayer({
            ...prayerData,
            groupId: groupId,
            type: 'group'
          })
        })}>
        <Image
          source={require('../../assets/images/add-a-prayer-icon.png')}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  fixedHeader: {
    backgroundColor: '#fff',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  prayersContainer: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: ThemeFonts.BOLD,
    fontSize: 18,
    color: ThemeColors.DARK,
    marginBottom: 15,
  },
  prayerItem: {
    borderRadius: 15,
    borderColor: ThemeColors.BLACK,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
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
  creatorContainer: {
    marginTop: 15,
  },
  creatorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  creatorInitial: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ThemeColors.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  creatorInitialText: {
    color: '#fff',
    fontSize: 18,
    fontFamily: ThemeFonts.BOLD,
  },
  creatorTextContainer: {
    flexDirection: 'column',
  },
  creatorName: {
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 14,
    color: ThemeColors.DARK,
  },
  creatorRole: {
    fontFamily: ThemeFonts.REGULAR,
    fontSize: 12,
    color: ThemeColors.DARK_GRAY,
  },
});

export default ActiveGroupScreen;