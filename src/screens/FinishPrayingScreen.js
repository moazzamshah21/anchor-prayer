import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';
import styles from '../styles/FinishPrayingStyle';
import Header from '../components/Header';
import HeaderBlack from '../components/HeaderBlack';
import { PRAYER_TYPES } from '../utils/Config';

const FinishPrayingScreen = ({ navigation, route }) => {
  const { PrayerCircle = '' } = route?.params;
  return (
    <React.Fragment>
      <HeaderBlack Name={'FINISH PRAYING'} navigation={navigation} />
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          <View style={styles.HomeItemView}>
            <View style={styles.HomeItemMainLayer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(
                    PrayerCircle == 'Yes'
                      ? 'ActivePrayerScreen'
                      : 'CreatePrayScreen',
                    {
                      name: PRAYER_TYPES.ADORATION,
                    },
                  );
                }}>
                <ImageBackground
                  source={require('../../assets/images/bg.png')}
                  style={{
                    width: 190,
                    height: 190,
                    justifyContent: 'center',
                  }}
                  resizeMode="contain">
                  <View
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.AddictionText}>Adoration</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
            <View style={styles.HomeItemMainLayer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(
                    PrayerCircle == 'Yes'
                      ? 'ActivePrayerScreen'
                      : 'CreatePrayScreen',
                    {
                      name: PRAYER_TYPES.CONFESSION,
                    },
                  );
                }}>
                <ImageBackground
                  source={require('../../assets/images/bg.png')}
                  style={{ width: 190, height: 190, justifyContent: 'center' }}
                  resizeMode="contain">
                  <View
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.AddictionText}>Confession</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.HomeItemView}>
            <View style={styles.HomeItemMainLayer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(
                    PrayerCircle == 'Yes'
                      ? 'ActivePrayerScreen'
                      : 'CreatePrayScreen',
                    {
                      name: PRAYER_TYPES.THANKSGIVING,
                    },
                  );
                }}>
                <ImageBackground
                  source={require('../../assets/images/bg.png')}
                  style={{ width: 190, height: 190, justifyContent: 'center' }}
                  resizeMode="contain">
                  <View
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.AddictionText}>Thanksgiving</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
            <View style={styles.HomeItemMainLayer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(
                    PrayerCircle == 'Yes'
                      ? 'ActivePrayerScreen'
                      : 'CreatePrayScreen',
                    {
                      name: PRAYER_TYPES.SUPPLICATION,
                    },
                  );
                }}>
                <ImageBackground
                  source={require('../../assets/images/bg.png')}
                  style={{ width: 190, height: 190, justifyContent: 'center' }}
                  resizeMode="contain">
                  <View
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.AddictionText}>Supplication</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.HomeItemView}>
            <View style={styles.HomeItemMainLayer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(
                    PrayerCircle == 'Yes'
                      ? 'ActivePrayerScreen'
                      : 'CreatePrayScreen',
                    {
                      name: PRAYER_TYPES.INTERCESSION,
                    },
                  );
                }}>
                <ImageBackground
                  source={require('../../assets/images/bg.png')}
                  style={{ width: 190, height: 190, justifyContent: 'center' }}
                  resizeMode="contain">
                  <View
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.AddictionText}>Intercession</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
            <View style={styles.HomeItemMainLayer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(
                    PrayerCircle == 'Yes'
                      ? 'ActivePrayerScreen'
                      : 'CreatePrayScreen',
                    {
                      name: PRAYER_TYPES.MEDITATION,
                    },
                  );
                }}>
                <ImageBackground
                  source={require('../../assets/images/bg.png')}
                  style={{ width: 190, height: 190, justifyContent: 'center' }}
                  resizeMode="contain">
                  <View
                    style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.AddictionText}>Meditation</Text>
                  </View>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <Image
            source={require('../../assets/images/anchor.png')}
            style={{ width: 37, height: 45 }}
            resizeMode="contain"
          />
          <Text style={styles.LogoText}>
            Designed by:{'\n'}digitalsoftwarelabs.com
          </Text>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default FinishPrayingScreen;
