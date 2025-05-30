import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  StyleSheet,
} from 'react-native';
import styles from '../styles/GroupStyle';
import BackHeader from '../components/BackHeader';
import {ThemeFonts} from '../utils/Theme';
import ReminderListScreen from './ReminderListScreen';

const ReminderScreen = ({navigation, route}) => {
  return (
    <React.Fragment>
      <BackHeader navigation={navigation} title="Reminder" />
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          <View style={styles.MainBody}>
            <Image
              resizeMode={'center'}
              style={styles.MainIconImage}
              source={require('../../assets/images/edit-icon.png')}
            />
            <Text style={styles.CreateGroupText}>
              Create a{' '}
              <Text style={{fontFamily: ThemeFonts.SEMI_BOLD}}>Reminder</Text>
              {'\n'}Now!
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CreateReminderScreen');
              }}>
              <Image
                resizeMode={'center'}
                style={styles.AddIconImage}
                source={require('../../assets/images/add-icon.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.MainBody}>
            <TouchableOpacity
            onPress={() => {
              navigation.navigate('ReminderListScreen');
            }}>
              <Text style={styles.ReminderListButton}>
              <Text style={styles.ButtonText}>Reminder List</Text>
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={styles.TextView}>
              <Text style={styles.CompanyBrandingText}>
                Designed by:{'\n'}digitalsoftwarelabs.com
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};




export default ReminderScreen;
