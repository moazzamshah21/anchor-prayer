import React, {createRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,
  TextInput,
  PermissionsAndroid,
  FlatList,
} from 'react-native';
import styles from '../styles/CreateGroupStyle';
import BackHeader from '../components/BackHeader';
import Octicons from 'react-native-vector-icons/Octicons';
import Contacts from 'react-native-contacts';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
import GroupService from '../services/Group/GroupService';
import {showMessage} from 'react-native-flash-message';
import ActionSheet from 'react-native-actions-sheet';
import {useSelector} from 'react-redux';
const {width} = Dimensions.get('window');

const CreateGroupScreen = ({navigation, route}) => {
  const contactList = useSelector(state => state.GroupReducer.contactList);
  const [groupCreatorName, setGroupCreatorName] = useState('');
  const [groupPassword, setGroupPassword] = useState('');
  const [groupPasswordAgain, setGroupPasswordAgain] = useState('');
  const [groupMembers, setGroupMembers] = useState('');
  const [verifiedIds, setVerifiedIds] = useState([]);
  const [verifiedNames, setVerifiedNames] = useState([]);
  const [membersListFromApi, setMembersListFromApi] = useState([]);
  const actionSheetRef = createRef();
  const OpenCommentSheet = () => {
    actionSheetRef.current?.setModalVisible(true);
  };

  const CloseCommentSheet = () => {
    actionSheetRef.current?.setModalVisible(false);
  };

  const onPressCreateGroup = async () => {
    if (groupCreatorName == '') {
      showMessage({
        message: 'Please enter group name',
        type: 'danger',
      });
    } else if (groupPassword == '') {
      showMessage({
        message: 'Please enter password',
        type: 'danger',
      });
    } else if (groupPassword != groupPasswordAgain) {
      showMessage({
        message: 'Please not matched',
        type: 'danger',
      });
    } else {
      var payload = {
        name: groupCreatorName,
        password: groupPassword,
        members: verifiedIds,
      };
      var response = await GroupService.CreateGroup(payload);
      if (response?.success) {
        setGroupCreatorName('');
        setGroupPassword('');
        setGroupPasswordAgain('');
        setVerifiedNames([]);
        showMessage({
          message: response?.message,
          type: 'success',
        });
        navigation.goBack();
      } else {
        showMessage({
          message: response?.message,
          type: 'danger',
        });
      }
    }
  };

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

  useEffect(() => {
    getAllMembers();
  }, []);

  const onPressGetAllContants = () => {
    OpenCommentSheet();
  };

  const handleVerifyToggle = item => {
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

  const renderContacts = ({item, index}) => {
    const isVerified = verifiedIds.includes(item._id);
    return (
      <View key={`${index}`} style={styles.ContactRenderItemView}>
        <View style={{marginLeft: 10}}>
          <Text style={styles.NameTextItem}>{item?.fullName}</Text>
          <Text style={styles.ContactTextItem}>{item?.phoneNumber}</Text>
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

  const onPressDoneButton = () => {
    CloseCommentSheet();
    setGroupMembers(verifiedNames.join(', '));
  };

  return (
    <React.Fragment>
      <BackHeader navigation={navigation} title="Create Group" />
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          <View style={{marginTop: 25}}>
            <Text style={styles.LoginDetailsHeading}>Create a Group</Text>
          </View>
          <View>
            <View style={{marginTop: 15}}>
              <View style={styles.TextInputStyle}>
                <TextInput
                  onChangeText={x => setGroupCreatorName(x)}
                  value={groupCreatorName}
                  style={{
                    fontSize: 15,
                    fontFamily: ThemeFonts.MEDIUM,
                    color: ThemeColors.DARK_GRAY,
                    width: '80%',
                    textAlign: 'center',
                  }}
                  placeholder="Group/Creator Name"
                  placeholderTextColor={ThemeColors.LIGHT_GRAY}
                />
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <View style={styles.TextInputStyle}>
                <TextInput
                  onChangeText={x => setGroupPassword(x)}
                  value={groupPassword}
                  style={{
                    fontSize: 15,
                    fontFamily: ThemeFonts.MEDIUM,
                    color: ThemeColors.DARK_GRAY,
                    width: '80%',
                    textAlign: 'center',
                  }}
                  placeholder="Group Password"
                  placeholderTextColor={ThemeColors.LIGHT_GRAY}
                  secureTextEntry
                />
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <View style={styles.TextInputStyle}>
                <TextInput
                  onChangeText={x => setGroupPasswordAgain(x)}
                  value={groupPasswordAgain}
                  style={{
                    fontSize: 15,
                    fontFamily: ThemeFonts.MEDIUM,
                    color: ThemeColors.DARK_GRAY,
                    width: '80%',
                    textAlign: 'center',
                  }}
                  placeholder="Enter Password Again"
                  placeholderTextColor={ThemeColors.LIGHT_GRAY}
                  secureTextEntry
                />
              </View>
            </View>
            <View style={{marginTop: 10}}>
              <View style={styles.TextInputStyle}>
                <TextInput
                  onChangeText={x => setGroupMembers(x)}
                  value={groupMembers}
                  style={{
                    fontSize: 15,
                    fontFamily: ThemeFonts.MEDIUM,
                    color: ThemeColors.DARK_GRAY,
                    width: '80%',
                    textAlign: 'center',
                  }}
                  placeholder="Group Members"
                  placeholderTextColor={ThemeColors.LIGHT_GRAY}
                />
              </View>
            </View>
          </View>
          <View style={{marginTop: 20}}>
            <Text style={styles.ORText}>OR</Text>
            <TouchableOpacity
              onPress={() => {
                onPressGetAllContants();
              }}>
              <Text style={styles.BlueUnderLineText}>Browse From Contacts</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{marginBottom: 29}}>
          <TouchableOpacity
            onPress={() => {
              onPressCreateGroup();
            }}
            style={styles.CreateAGroupView}>
            <Text style={styles.CreateText}>Create A Group</Text>
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
              data={membersListFromApi}
              renderItem={renderContacts}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={{width: width, alignSelf: 'center'}}
            />
            <TouchableOpacity
              onPress={() => {
                onPressDoneButton();
              }}
              style={styles.DontBtnView}>
              <Text style={styles.DoneTextBtn}>Done</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ActionSheet>
    </React.Fragment>
  );
};

export default CreateGroupScreen;
