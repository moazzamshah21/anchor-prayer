import React, { useEffect, useState } from 'react';
import { CommonActions, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createDrawerNavigator,
  useDrawerProgress,
} from '@react-navigation/drawer';
import { navigationRef } from './NavigationRef';
import LocalStorage from '../utils/LocalStorage';
import Animated from 'react-native-reanimated';
import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { ThemeColors, ThemeFonts } from '../utils/Theme';
import {
  DonnationIcon,
  FeedIcon,
  GroupIcon,
  PayerCircleIcon,
  PayerJournalIcon,
  ReminderIcon,
  SettingIcon,
} from '../../assets/svg/SvgIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';

import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordEmailScreen from '../screens/ForgotPasswordEmailScreen';
import VerificationCodeScreen from '../screens/VerificationCodeScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import EmailVerifyScreen from '../screens/EmailVerifyScreen';
import HomeScreen from '../screens/HomeScreen';
import FinishPrayingScreen from '../screens/FinishPrayingScreen';
import GroupScreen from '../screens/GroupScreen';
import ReminderScreen from '../screens/ReminderScreen';
import DonationScreen from '../screens/DonationScreen';
import SettingScreen from '../screens/SettingScreen';
import FeedScreen from '../screens/FeedScreen';
import CreatePrayScreen from '../screens/CreatePrayScreen';
import PrayScreen from '../screens/PrayScreen';
import ActivePrayerScreen from '../screens/ActivePrayerScreen';
import MyPrayerScreen from '../screens/MyPrayerScreen';
import MyAnsweredPrayerScreen from '../screens/MyAnsweredPrayerScreen';
import MyAcrhivedPrayerScreen from '../screens/MyAcrhivedPrayerScreen';
import NewFeedScreen from '../screens/NewFeedScreen';
import GroupLoginScreen from '../screens/GroupLoginScreen';
import ActiveGroupScreen from '../screens/ActiveGroupScreen';
import GroupListScreen from '../screens/GroupListScreen';
import CreateGroupScreen from '../screens/CreateGroupScreen';
import FeedsListScreen from '../screens/FeedsListScreen';
import PrayerDetailScreen from '../screens/PrayerDetailScreen';
import EditPrayerScreen from '../screens/EditPrayerScreen';
import PrayerTimerScreen from '../screens/PrayerTimerScreen';
import PrayerListScreen from '../screens/PrayerListScreen';
import FinishPrayingFinalScreen from '../screens/FinishPrayingFinalScreen';
import ConfirmPrayScreen from '../screens/ConfirmPrayScreen';
import HelloPrayerScreen from '../screens/HelloPrayerScreen';
import ReminderListScreen from '../screens/ReminderListScreen';
import CreateReminderScreen from '../screens/CreateReminderScreen';
import DonationListScreen from '../screens/DonationListScreen';
import AddPrayerScreen from '../screens/AddPrayerScreen';
import GuidedPrayerScreen from '../screens/GuidedPrayerScreen';
import GuidedPrayerDetailScreen from '../screens/GuidedPrayerDetailScreen';
import CreateFeedScreen from '../screens/CreateFeedScreen';
import FeedDetailScreen from '../screens/FeedDetailScreen';
import CreateFeedPrayersScreen from '../screens/CreateFeedPrayersScreen';
import MyGroupListScreen from '../screens/MyGroupListScreen';
import MyPrayerDetailScreen from '../screens/MyPrayerDetailScreen';
import { useSelector } from 'react-redux';
import FeedPrayerDetailScreen from '../screens/FeedPrayerDetailScreen';
import AddFeedPrayerScreen from '../screens/AddFeedPrayerScreen';
import GroupAddPrayerScreen from '../screens/GroupAddPrayerScreen';
import GroupPrayerDetailScreen from '../screens/GroupPrayerDetailScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  const myAnsweredPrayerList = useSelector(state => state.CommonReducer.myAnsweredPrayerList);
  const myArchivedPrayerList = useSelector(state => state.CommonReducer.myArchivedPrayerList);
  const [groupIdState, setgroupIdState] = useState(null);
  const { navigation } = props;
  const styles = StyleSheet.create({
    MainContainer: {
      flex: 1,
      backgroundColor: ThemeColors.WHITE,
    },
    ContentContainer: {
      flexGrow: 1,
    },
    LogoContainer: {
      height: 100,
      paddingHorizontal: 15,
      justifyContent: 'center',
    },
    LogoText: {
      fontFamily: ThemeFonts.SEMI_BOLD,
      fontSize: 20,
      color: ThemeColors.BLACK,
    },
    MenuItem: {
      height: 60,
      justifyContent: 'center',
      paddingHorizontal: 15,
    },
    MenuItemTouch: {
      flexDirection: 'row',
    },
    MenuItemText: {
      paddingLeft: 15,
      fontFamily: ThemeFonts.MEDIUM,
      fontSize: 15,
      color: ThemeColors.BLACK,
    },
    MenuItemText2: {
      fontFamily: ThemeFonts.SEMI_BOLD,
      fontSize: 15,
      color: '#2196F3',
    },
    TextView: {},
    CompanyBrandingText: {
      fontFamily: ThemeFonts.MEDIUM,
      color: ThemeColors.BLACK,
      fontSize: 15,
      textAlign: 'center',
      paddingBottom: 15,
      paddingTop: 30,
    },
  });

  const getGroupId = async () => {
    const groupId = await LocalStorage.GetData('groupId');
    return groupId;
  };

  useEffect(() => {
    const onLoad = async () => {
      setgroupIdState(await getGroupId());
    };
    onLoad();
  }, []);

  return (
    <Animated.View style={styles.MainContainer}>
      <View style={styles.ContentContainer}>
        <View style={styles.LogoContainer}>
          <Text style={styles.LogoText}>Prayer Application</Text>
        </View>
        <View style={styles.MenuContainer}>
          <View style={styles.MenuItem}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MyPrayerScreen');
              }}
              style={styles.MenuItemTouch}>
              <PayerJournalIcon />
              <Text style={styles.MenuItemText}>My Prayer</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.MenuItem}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('GuidedPrayerScreen');
              }}
              style={styles.MenuItemTouch}>
              <PayerCircleIcon />
              <Text style={styles.MenuItemText}>Guided Prayers</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.MenuItem}>
            <TouchableOpacity
              style={styles.MenuItemTouch}
              onPress={() => {
                navigation.navigate(
                  // groupIdState == null ? 'Group' : 'ActiveGroupScreen',
                  'Group',
                );
              }}>
              <GroupIcon />
              <Text style={styles.MenuItemText}>Group</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.MenuItem}>
            <TouchableOpacity
              style={styles.MenuItemTouch}
              onPress={() => {
                navigation.navigate('Reminder');
              }}>
              <ReminderIcon />
              <Text style={styles.MenuItemText}>Reminders</Text>
            </TouchableOpacity>
          </View>

          {/* <View style={styles.MenuItem}>
            <TouchableOpacity
              style={styles.MenuItemTouch}
              onPress={() => {
                navigation.navigate('Donation');
              }}>
              <DonnationIcon />
              <Text style={styles.MenuItemText}>Donations</Text>
            </TouchableOpacity>
          </View> */}
          <View style={styles.MenuItem}>
            <TouchableOpacity
              style={styles.MenuItemTouch}
              onPress={() => {
                navigation.navigate('Feed');
              }}>
              <FeedIcon />
              <Text style={styles.MenuItemText}>Feeds</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.MenuItem}>
            <TouchableOpacity
              style={styles.MenuItemTouch}
              onPress={() => {
                navigation.navigate('FinishPrayingFinalScreen');
              }}>
              <FeedIcon />
              <Text style={styles.MenuItemText}>My Activity</Text>
            </TouchableOpacity>
          </View>
          {
            myAnsweredPrayerList?.length > 0 && (
              <View style={styles.MenuItem}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('MyAnsweredPrayerScreen');
                  }}
                  style={styles.MenuItemTouch}>
                  <Feather name="check" style={{ color: '#000' }} size={22} />
                  <Text style={styles.MenuItemText}>Answered Prayer</Text>
                </TouchableOpacity>
              </View>
            )
          }
          {
            myArchivedPrayerList?.length > 0 && (
              <View style={styles.MenuItem}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('MyAcrhivedPrayerScreen');
                  }}
                  style={styles.MenuItemTouch}>
                  <EvilIcons name="archive" style={{ color: '#000' }} size={22} />
                  <Text style={styles.MenuItemText}>Acrhived Prayer</Text>
                </TouchableOpacity>
              </View>
            )
          }
          <View style={styles.MenuItem}>
            <TouchableOpacity
              style={styles.MenuItemTouch}
              onPress={() => {
                navigation.navigate('Setting');
              }}>
              <SettingIcon />
              <Text style={styles.MenuItemText}>Settings</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
      <View style={styles.FooterContainer}>
        <View style={styles.MenuContainer}>
          <View style={styles.MenuItem}>
            <TouchableOpacity
              onPress={() => {
                LocalStorage.RemoveData('token');
                navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                    routes: [{ name: 'SignIn' }],
                  }),
                );
              }}>
              <Text style={styles.MenuItemText2}>LOG OUT</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.TextView}>
          <Text style={styles.CompanyBrandingText}>
            Designed by:{'\n'}digitalsoftwarelabs.com
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const DrawerNavigator = ({ isLogin = false }) => {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, animationEnabled: false }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName={'Home'}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ animationEnabled: false }}
      />
      <Drawer.Screen
        name="Group"
        component={GroupScreen}
        options={{ animationEnabled: false }}
      />
      <Drawer.Screen
        name="Reminder"
        component={ReminderScreen}
        options={{ animationEnabled: false }}
      />
      <Drawer.Screen
        name="Donation"
        component={DonationScreen}
        options={{ animationEnabled: false }}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingScreen}
        options={{ animationEnabled: false }}
      />
      <Drawer.Screen
        name="Feed"
        component={FeedScreen}
        options={{ animationEnabled: false }}
      />
    </Drawer.Navigator>
  );
};

const StackNavigator = ({ isLogin = false }) => {
  return (
    <Stack.Navigator
      initialRouteName={isLogin ? 'Dashboard' : 'SignIn'}
      screenOptions={{ headerShown: false, animationEnabled: false }}>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="ForgotPasswordEmail"
        component={ForgotPasswordEmailScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="VerificationCode"
        component={VerificationCodeScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="EmailVerify"
        component={EmailVerifyScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="Dashboard"
        component={DrawerNavigator}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="FinishPrayingScreen"
        component={FinishPrayingScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="CreatePrayScreen"
        component={CreatePrayScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="PrayScreen"
        component={PrayScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="ActivePrayerScreen"
        component={ActivePrayerScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="MyPrayerScreen"
        component={MyPrayerScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="MyPrayerDetailScreen"
        component={MyPrayerDetailScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="MyAnsweredPrayerScreen"
        component={MyAnsweredPrayerScreen}
        options={{ animationEnabled: false }}
      />
       <Stack.Screen
        name="MyAcrhivedPrayerScreen"
        component={MyAcrhivedPrayerScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="NewFeedScreen"
        component={NewFeedScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="CreateFeedScreen"
        component={CreateFeedScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="GroupLoginScreen"
        component={GroupLoginScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="ActiveGroupScreen"
        component={ActiveGroupScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="GroupListScreen"
        component={GroupListScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="GroupAddPrayerScreen"
        component={GroupAddPrayerScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="GroupPrayerDetailScreen"
        component={GroupPrayerDetailScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="CreateGroupScreen"
        component={CreateGroupScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="FeedsListScreen"
        component={FeedsListScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="PrayerDetailScreen"
        component={PrayerDetailScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="EditPrayerScreen"
        component={EditPrayerScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="PrayerTimerScreen"
        component={PrayerTimerScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="PrayerListScreen"
        component={PrayerListScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="FeedPrayerDetailScreen"
        component={FeedPrayerDetailScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="AddFeedPrayerScreen"
        component={AddFeedPrayerScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="FinishPrayingFinalScreen"
        component={FinishPrayingFinalScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="ConfirmPrayScreen"
        component={ConfirmPrayScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="HelloPrayerScreen"
        component={HelloPrayerScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="ReminderListScreen"
        component={ReminderListScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="CreateReminderScreen"
        component={CreateReminderScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="DonationListScreen"
        component={DonationListScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="AddPrayerScreen"
        component={AddPrayerScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="GuidedPrayerScreen"
        component={GuidedPrayerScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="GuidedPrayerDetailScreen"
        component={GuidedPrayerDetailScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="FeedDetailScreen"
        component={FeedDetailScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="CreateFeedPrayersScreen"
        component={CreateFeedPrayersScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="MyGroupListScreen"
        component={MyGroupListScreen}
        options={{ animationEnabled: false }}
      />
    </Stack.Navigator>
  );
};

const MainNavigator = () => {
  const [isLogin, setIsLogin] = useState(null);

  useEffect(() => {
    const onLoad = async () => {
      const token = await LocalStorage.GetData('token');
      setIsLogin(token !== null);
    };
    onLoad();
    return () => {
      onLoad();
    };
  }, []);

  return isLogin !== null ? (
    <NavigationContainer ref={navigationRef}>
      <StackNavigator isLogin={isLogin} />
    </NavigationContainer>
  ) : null;
};

export default MainNavigator;
