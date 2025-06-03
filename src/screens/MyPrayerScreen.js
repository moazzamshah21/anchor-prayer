// MyPrayerScreen.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,
} from 'react-native';
import styles from '../styles/MyPrayerStyle';
import HeaderBlack from '../components/HeaderBlack';
import { ThemeColors } from '../utils/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { showMessage } from 'react-native-flash-message';
import PrayerService from '../services/Prayer/PrayerService';
import ActivePrayerItem from '../components/ActivePrayerItem';
import { useDispatch, useSelector } from 'react-redux';
import MyPrayerItem from '../components/MyPrayerItem';
import * as commonAction from '../actions/Common/CommonAction';
const { width } = Dimensions.get('window');

const MyPrayerScreen = ({ navigation, route }) => {

  const dispatch = useDispatch();

  const myPrayerList = useSelector(state => state.CommonReducer.myPrayerList);
  const [myPrayers, setMyPrayers] = useState([]);

  const GetMyPrayers = async () => {
    var response = await PrayerService.GetMyPrayers();
    if (response?.success) {
      setMyPrayers(response?.data);
    } else {
      showMessage({
        message: response?.message,
        type: 'danger',
      });
    }
  };

  useEffect(() => {
    if (myPrayerList) {
      setMyPrayers(myPrayerList)
    }
  }, [myPrayerList]);

  return (
    <React.Fragment>
      <HeaderBlack
        lessThenIcon
        Name={'MY PRAYERS'}
        navigation={navigation}
        noModal={true}
      />
      {
        myPrayerList.length == 0 ? (
          <ScrollView
            contentContainerStyle={styles.ScrollViewContentContainerStyle}
            showsVerticalScrollIndicator={false}>
            <View style={styles.MainContainer2}>
              <Image
                source={require('../../assets/images/blackhand.png')}
                style={{ width: 108, height: 88 }}
                resizeMode="contain"
              />
              <Text style={styles.DescText}>
                Add your first prayer to use{'\n'}the Pray Now feature.
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddPrayerScreen');
                }}>
                <Image
                  source={require('../../assets/images/plusplus.png')}
                  style={{ width: 105, height: 105, marginTop: 10 }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center', marginBottom: 10 }}>
              <Text style={styles.LogoText}>
                Designed by:{'\n'}digitalsoftwarelabs.com
              </Text>
            </View>
          </ScrollView>
        ) : (
          <ScrollView
            contentContainerStyle={styles.ScrollViewContentContainerStyle}
            showsVerticalScrollIndicator={false}>
            <View style={styles.MainContainer}>
              <Image
                source={require('../../assets/images/my-prayers-background.png')}
                style={{
                  width: width,
                  height: width - 150,
                  alignSelf: 'center',
                }}
                resizeMode="cover"
              />
              <View>
                <ImageBackground
                  source={require('../../assets/images/bookbg.png')}
                  style={{
                    width: 120,
                    height: 120,
                    marginTop: -60,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  resizeMode="contain">
                  <Image
                    source={require('../../assets/images/blackbook.png')}
                    style={{
                      width: 28,
                      height: 20,
                      marginTop: -5,
                    }}
                    resizeMode="contain"
                  />
                </ImageBackground>
              </View>
              <Text style={styles.ActiveHeading}>My Prayers</Text>
              <Text style={styles.ActiveHeadingSub}>PERSONAsL</Text>
              <View style={{ marginBottom: 10 }}>
              {myPrayers?.map((item, index) => {
        return (
          <MyPrayerItem
            item={item}
            index={index}
            navigation={navigation}
            onArchiveSuccess={() => {
              dispatch(commonAction.fetchMyPrayers());
              dispatch(commonAction.fetchMyAchivedPrayers());
              dispatch(commonAction.fetchMyAnsweredPrayers());
            }}
          />
        );
      })}
              </View>
            </View>
            <View style={{ alignItems: 'center', marginBottom: 10 }}>
              <Text style={styles.LogoText}>
                Designed by:{'\n'}digitalsoftwarelabs.com
              </Text>
            </View>
          </ScrollView>

          
        )
      }
    </React.Fragment>
  );
};

export default MyPrayerScreen;