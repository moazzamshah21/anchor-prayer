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
  Modal
} from 'react-native';
import styles from '../styles/ActiveGroupStyle';
import BackHeader from '../components/BackHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
import GroupService from '../services/Group/GroupService';
import {showMessage} from 'react-native-flash-message';
import ActionSheet from 'react-native-actions-sheet';
import Octicons from 'react-native-vector-icons/Octicons';
import RestClient from '../services/RestClient';
import {useSelector} from 'react-redux';

const {width} = Dimensions.get('window');

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
        `/prayer/get-prayers-by-type?type=group&groupId=${groupId}&page=${currentPage}&limit=10`
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
      const response = await RestClient.Post('/prayer/add-pray', prayerData);
      
      if (response.success) {
        setCurrentPage(1);
        fetchGroupPrayers();
      }
    } catch (error) {
      console.error('Error adding prayer:', error);
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
            return {
              ...prayer,
              commentCount: prayer.commentCount + 1,
              comments: [...(prayer.comments || []), response.data.comment]
            };
          }
          return prayer;
        }));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding comment:', error);
      return false;
    } finally {
      setCommentLoading(prev => ({...prev, [prayerId]: false}));
    }
  };

  // Add Members Functions
  const getAllMembers = async () => {
    var payload = {
      phoneNumberList: contactList,
    };
    var response = await GroupService.FindMembersByPhoneNumber(payload);
    if (response?.success) {
      setMembersListFromApi(response?.data);
    } else {
      showMessage({
        message: response?.message,
        type: 'danger',
      });
    }
  };

  const handleVerifyToggle = (item) => {
    setVerifiedIds(prev => {
      if (prev.includes(item?._id)) {
        return prev.filter(verifiedId => verifiedId !== item?._id);
      } else {
        return [...prev, item?._id];
      }
    });
    setVerifiedNames(prev => {
      if (prev.includes(item.fullName)) {
        return prev.filter(name => name !== item.fullName);
      } else {
        return [...prev, item.fullName];
      }
    });
  };

  const handleAddSelectedMembers = async () => {
    try {
      const response = await GroupService.addMembersToGroup(groupId, verifiedIds);
      if (response?.success) {
        showMessage({
          message: 'Members added successfully',
          type: 'success',
        });
        setVerifiedIds([]);
        setVerifiedNames([]);
        onLoadGroupDetail();
        setShowAddMembersModal(false);
      } else {
        showMessage({
          message: response?.message,
          type: 'danger',
        });
      }
    } catch (error) {
      console.error('Error adding members:', error);
    }
  };

  const renderContacts = ({item, index}) => {
    const isVerified = verifiedIds.includes(item._id);
    return (
      <View key={`${index}`} style={localStyles.contactRenderItemView}>
        <View style={{marginLeft: 10}}>
          <Text style={localStyles.contactNameTextItem}>{item?.fullName}</Text>
          <Text style={localStyles.contactPhoneTextItem}>{item?.phoneNumber}</Text>
        </View>
        <TouchableOpacity onPress={() => handleVerifyToggle(item)}>
          <Octicons
            name="verified"
            style={{
              color: ThemeColors.BLACK,
              backgroundColor: isVerified ? '#4CBB17' : undefined,
              borderRadius: 30,
            }}
            size={25}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const onPressLikeDisLike = async () => {
    if (isLike == false) {
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

  const OpenCommentSheet = () => {
    actionSheetRef.current?.setModalVisible(true);
  };

  const CloseCommentSheet = () => {
    actionSheetRef.current?.setModalVisible(false);
  };

  // Update the onPressApproveBtn function to properly update state
const onPressApproveBtn = async (id) => {
  try {
    var payload = {
      groupId: groupId,
      requesterId: id,
    };
    
    var response = await GroupService.Approve(payload);
    
    if (response?.success) {
      // Update the local state to reflect the approval
      setGroupDetail(prev => {
        // Remove the approved user from requestedUsers
        const updatedRequestedUsers = prev.requestedUsers.filter(user => user._id !== id);
        
        // Find the approved user in requestedUsers
        const approvedUser = prev.requestedUsers.find(user => user._id === id);
        
        // Add them to the users list if found
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


  // Update the renderRequestedUsers function to check if user is already a member
const renderRequestedUsers = ({item, index}) => {
  // Check if this user is already in the group members list
  const isAlreadyMember = groupDetail?.users?.some(user => user._id === item._id);
  
  if (isAlreadyMember) {
    return null; // Don't render anything for already approved members
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
    <React.Fragment>
      <BackHeader navigation={navigation} title="Group Details" />
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}
        onScroll={({nativeEvent}) => {
          if (isCloseToBottom(nativeEvent)) {
            loadMorePrayers();
          }
        }}>
        <View style={styles.MainContainer}>
          <View style={{marginTop: 30}}>
            <Text style={styles.LoginDetailsHeading}>{groupDetail?.name}</Text>
          </View>
          <View>
            <View style={styles.ActiveGroupItem}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={styles.NameTExt}>{groupDetail?.name}</Text>
                  <Text style={styles.DescText}>{groupDetail?.description || 'Group Prayers'}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={onPressLikeDisLike}
                    style={styles.GrayRound}>
                    {isLike == false ? (
                      <Image
                        source={require('../../assets/images/heart.png')}
                        style={{width: 14, height: 14}}
                        resizeMode="contain"
                      />
                    ) : (
                      <AntDesign
                        name="heart"
                        style={{color: 'red'}}
                        size={15}
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
                  {groupDetail?.isAdmin && (
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
                  )}
                </View>
              </View>
              <View
                style={{
                  marginTop: 15,
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                }}>
                <TouchableOpacity onPress={() => setShowAddMembersModal(true)}>
                  <ImageBackground
                    source={require('../../assets/images/round1.png')}
                    style={{
                      width: 83,
                      height: 83,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    resizeMode="contain">
                    <Text style={styles.PrayNowText}>Add{'\n'}Members</Text>
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity>
                  <ImageBackground
                    source={require('../../assets/images/round1.png')}
                    style={{
                      width: 83,
                      height: 83,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    resizeMode="contain">
                    <Text style={styles.PrayNowText}>Listen{'\n'}Pray</Text>
                  </ImageBackground>
                </TouchableOpacity>
                <TouchableOpacity>
                  <ImageBackground
                    source={require('../../assets/images/round1.png')}
                    style={{
                      width: 83,
                      height: 83,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    resizeMode="contain">
                    <Text style={styles.PrayNowText}>Exit{'\n'}Group</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={{
                marginTop: 25,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={styles.GreenRoundView}>
                <Text style={styles.AText}>A</Text>
              </View>
              <Text style={styles.AdamNameText}>{groupDetail?.adminName}</Text>
              <Text style={styles.AdamDescText}>Group Creator</Text>
            </TouchableOpacity>
            <ScrollView horizontal>
              <View
                style={{
                  marginTop: 15,
                  flexDirection: 'row',
                  width: width,
                  justifyContent: 'center',
                }}>
                {usersWithColors?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setIsSelected(!isSelected);
                      }}
                      style={[
                        styles.ColorsRoundView,
                        {
                          backgroundColor: item?.color,
                          borderColor: '#FFA200',
                          borderWidth: isSelected ? 2 : 0,
                        },
                      ]}>
                      <Text style={styles.BText}>
                        {item?.fullName?.charAt(0)}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>

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
                      imageUrl: prayer.imageUrl,
                      description: prayer.description,
                      likeCount: prayer.likeCount,
                      commentCount: prayer.commentCount,
                      comments: prayer.comments,
                      isLiked: prayer.isLiked
                    },
                    title: groupDetail.name,
                    onAddComment: (commentText) => handleAddComment(prayer._id, commentText),
                    onLikeDislike: () => handleLikeDislike(prayer._id, prayer.isLiked)
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
                        style={localStyles.actionButton}
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
                            imageUrl: prayer.imageUrl,
                            description: prayer.description,
                            likeCount: prayer.likeCount,
                            commentCount: prayer.commentCount,
                            comments: prayer.comments,
                            isLiked: prayer.isLiked
                          },
                          title: groupDetail.name,
                          onAddComment: (commentText) => handleAddComment(prayer._id, commentText),
                          onLikeDislike: () => handleLikeDislike(prayer._id, prayer.isLiked)
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
          </View>
        </View>
        <View style={{alignItems: 'center', marginBottom: 10}}>
          <Text style={styles.LogoText}>
            Designed by:{'\n'}digitalsoftwarelabs.com
          </Text>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={localStyles.addButton}
        onPress={() => navigation.navigate('GroupAddPrayerScreen', {
          groupId,
          onAddPrayer: handleAddPrayer
        })}>
        <Image
          source={require('../../assets/images/add-a-prayer-icon.png')}
          style={{ width: 100, height: 100 }}
          resizeMode="contain"
        />
      </TouchableOpacity>

      <Modal
        visible={showAddMembersModal}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setShowAddMembersModal(false)}>
        <View style={localStyles.modalContainer}>
          <View style={localStyles.modalHeader}>
            <TouchableOpacity onPress={() => setShowAddMembersModal(false)}>
              <AntDesign name="arrowleft" size={24} color={ThemeColors.DARK} />
            </TouchableOpacity>
            <Text style={localStyles.modalTitle}>Add Members</Text>
            <TouchableOpacity 
              onPress={handleAddSelectedMembers}
              disabled={verifiedIds.length === 0}>
              <Text style={[
                localStyles.doneButton,
                {color: verifiedIds.length > 0 ? ThemeColors.PRIMARY : ThemeColors.DARK_GRAY}
              ]}>
                Done
              </Text>
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 20, alignItems: 'center'}}>
            <Text style={styles.ORText}>OR</Text>
            <TouchableOpacity onPress={getAllMembers}>
              <Text style={styles.BlueUnderLineText}>Browse From Contacts</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={membersListFromApi}
            renderItem={renderContacts}
            keyExtractor={item => item._id}
            contentContainerStyle={{paddingBottom: 20}}
            ListEmptyComponent={() => (
              <View style={localStyles.noContacts}>
                <Text style={localStyles.noContactsText}>No contacts found</Text>
              </View>
            )}
          />
        </View>
      </Modal>

      <ActionSheet
        gestureEnabled={false}
        ref={actionSheetRef}
        containerStyle={{
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          overflow: 'hidden',
          paddingHorizontal: 20,
          paddingVertical: 15,
          marginBottom: 10,
        }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View style={{marginTop: 15}}>
            <FlatList
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>No data found</Text>
                  </View>
                );
              }}
              data={groupDetail?.requestedUsers}
              renderItem={renderRequestedUsers}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{width: width, alignSelf: 'center'}}
            />
          </View>
        </ScrollView>
      </ActionSheet>
    </React.Fragment>
  );
};

const localStyles = StyleSheet.create({
  prayersContainer: {
    marginTop: 20,
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
  modalContainer: {
    flex: 1,
    backgroundColor: ThemeColors.WHITE,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: ThemeColors.LIGHT_GRAY,
  },
  modalTitle: {
    fontFamily: ThemeFonts.SEMIBOLD,
    fontSize: 18,
    color: ThemeColors.DARK,
  },
  doneButton: {
    fontFamily: ThemeFonts.SEMIBOLD,
    fontSize: 16,
  },
  contactRenderItemView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: ThemeColors.LIGHT_GRAY,
  },
  contactNameTextItem: {
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 16,
    color: ThemeColors.DARK,
  },
  contactPhoneTextItem: {
    fontFamily: ThemeFonts.REGULAR,
    fontSize: 14,
    color: ThemeColors.DARK_GRAY,
    marginTop: 3,
  },
  noContacts: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noContactsText: {
    fontFamily: ThemeFonts.REGULAR,
    fontSize: 16,
    color: ThemeColors.DARK_GRAY,
  },
});

export default ActiveGroupScreen;