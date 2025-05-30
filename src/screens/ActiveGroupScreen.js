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
} from 'react-native';
import styles from '../styles/ActiveGroupStyle';
import BackHeader from '../components/BackHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
import LocalStorage from '../utils/LocalStorage';
import GroupService from '../services/Group/GroupService';
import {showMessage} from 'react-native-flash-message';
import ActionSheet from 'react-native-actions-sheet';
import Octicons from 'react-native-vector-icons/Octicons';
const {width} = Dimensions.get('window');

const ActiveGroupScreen = ({navigation, route}) => {
  const actionSheetRef = createRef();
  const [groupDetail, setGroupDetail] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const onLoadGroupDetail = async () => {
    var groupId = await LocalStorage.GetData('groupId');
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

  useEffect(() => {
    onLoadGroupDetail();
  }, []);

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

  const onPressLikeDisLike = async () => {
    if (isLike == false) {
      var groupId = await LocalStorage.GetData('groupId');
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
      var groupId = await LocalStorage.GetData('groupId');
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

  const onPressApproveBtn = async id => {
    var groupId = await LocalStorage.GetData('groupId');
    var payload = {
      groupId: groupId,
      requesterId: id,
    };
    var response = await GroupService.Approve(payload);
    if (response?.success) {
      onLoadGroupDetail();
      showMessage({
        message: response?.message,
        type: 'success',
      });
    } else {
      showMessage({
        message: response?.message,
        type: 'danger',
      });
    }
  };

  const renderRequestedUsers = ({item, index}) => {
    return (
      <View key={`${index}`} style={styles.ContactRenderItemView}>
        <View style={{marginLeft: 10}}>
          <Text style={styles.NameTextItem}>{item?.fullName} Umair</Text>
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

  return (
    <React.Fragment>
      <BackHeader navigation={navigation} title="Login Group" />
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          <View style={{marginTop: 30}}>
            <Text style={styles.LoginDetailsHeading}>Active Groups</Text>
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
                  <Text style={styles.DescText}>Pray for Meditation:</Text>
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
                      LocalStorage.RemoveData('groupId');
                      navigation.navigate('Group');
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
                    <Text style={styles.PrayNowText}>Pray{'\n'}Now</Text>
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
          </View>
        </View>
        <View style={{marginBottom: 25}}>
          <TouchableOpacity
            style={[
              styles.CommentOrMessageView,
              {backgroundColor: isSelected ? '#73B541' : '#EDEDED'},
            ]}>
            <Text
              style={[
                styles.CommentOrMessageText,
                {color: isSelected ? ThemeColors?.WHITE : '#6DA75B'},
              ]}>
              Comment or Message
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center', marginBottom: 10}}>
          <Text style={styles.LogoText}>
            Designed by:{'\n'}digitalsoftwarelabs.com
          </Text>
        </View>
      </ScrollView>

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

export default ActiveGroupScreen;
