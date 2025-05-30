import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import styles from '../styles/GroupStyle';
import BackHeader from '../components/BackHeader';
import {ThemeFonts} from '../utils/Theme';

const GroupScreen = ({navigation, route}) => {
  return (
    <React.Fragment>
      <BackHeader navigation={navigation} title="Group" />
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          <View style={styles.MainBody}>
            <Image
              resizeMode={'center'}
              style={styles.MainIconImage}
              source={require('../../assets/images/group-icon.png')}
            />
            <Text style={styles.CreateGroupText}>
              Create a{' '}
              <Text style={{fontFamily: ThemeFonts.SEMI_BOLD}}>New Group</Text>
              {'\n'}Now!
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CreateGroupScreen');
              }}>
              <Image
                resizeMode={'center'}
                style={styles.AddIconImage}
                source={require('../../assets/images/add-icon.png')}
              />
            </TouchableOpacity>
            <Text style={styles.ORText}>OR</Text>
            {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate('GroupLoginScreen');
              }}
              style={styles.ButtonView}>
              <Text style={styles.ButtonText}>Login To A Group</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity
              onPress={() => {
                navigation.navigate('GroupListScreen');
              }}
              style={styles.ButtonView}>
              <Text style={styles.ButtonText}>Join A Group</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('MyGroupListScreen');
              }}
              style={styles.ButtonView}>
              <Text style={styles.ButtonText}>My Groups</Text>
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

export default GroupScreen;
