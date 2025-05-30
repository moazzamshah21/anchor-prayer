import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Modal,
  View,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import MainNavigator from '../navigations/MainNavigator';
import FlashMessage from 'react-native-flash-message';
import { ThemeColors, ThemeFonts } from '../utils/Theme';
import { useDispatch, useSelector } from 'react-redux';
import Contacts from 'react-native-contacts';
import * as groupAction from '../actions/Group/GroupAction';
import * as commonAction from '../actions/Common/CommonAction';

const LoadingScreen = () => {
  const isLoading = useSelector(state => state.CommonReducer.loading);
  const isDarkMode = useColorScheme() === 'dark';
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(commonAction.fetchMyPrayers());
    dispatch(commonAction.fetchMyAchivedPrayers());
    dispatch(commonAction.fetchMyAnsweredPrayers());
  }, []);

  useEffect(() => {
    const onPressGetAllContants = () => {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      })
        .then(res => {
          Contacts.getAll()
            .then(contacts => {
              const lastSixDigitsArray = contacts.map(contact => {
                const cleanedNumber = contact.phoneNumbers[0]?.number.replace(
                  /-/g,
                  '',
                );
                return cleanedNumber.slice(-6);
              });
              dispatch(groupAction.getContactList(lastSixDigitsArray));
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(error => {
          console.error('Permission error: ', error);
        });
    };
    onPressGetAllContants();
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <React.Fragment>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <MainNavigator />
        <FlashMessage position="top" />
      </SafeAreaView>
      <Modal animationType="fade" transparent={true} visible={isLoading}>
        <View style={styles.LoadingContainer}>
          <View
            style={
              useColorScheme() === 'dark'
                ? styles.LoadingIndicatorBox2
                : styles.LoadingIndicatorBox
            }>
            <ActivityIndicator
              color={
                useColorScheme() === 'dark'
                  ? ThemeColors.WHITE
                  : ThemeColors.BLACK
              }
              size="large"
            />
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  LoadingContainer: {
    flex: 1,
    backgroundColor: '#00000090',
    justifyContent: 'center',
    alignItems: 'center',
  },
  LoadingIndicatorBox: {
    width: 70,
    height: 70,
    backgroundColor: ThemeColors.WHITE,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: ThemeColors.BLACK,
    shadowColor: ThemeColors.WHITE,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
  LoadingIndicatorBox2: {
    width: 70,
    height: 70,
    backgroundColor: ThemeColors.BLACK,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: ThemeColors.WHITE,
    shadowColor: ThemeColors.BLACK,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default LoadingScreen;
