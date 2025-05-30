import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ImageBackground, Image, Dimensions } from 'react-native';
import styles from '../styles/MyAnsweredPrayerStyle';
import HeaderBlack from '../components/HeaderBlack';
import { useDispatch, useSelector } from 'react-redux';
import MyPrayerItem from '../components/MyPrayerItem';
import * as commonAction from '../actions/Common/CommonAction';
import MyAnsweredPrayerItem from '../components/MyAnsweredPrayerItem';
const { width } = Dimensions.get('window');

const MyAnsweredPrayerScreen = ({ navigation, route }) => {

  const dispatch = useDispatch();

  const myAnsweredPrayerList = useSelector(state => state.CommonReducer.myAnsweredPrayerList);
  const [myPrayers, setMyPrayers] = useState([]);

  useEffect(() => {
    if (myAnsweredPrayerList) {
      setMyPrayers(myAnsweredPrayerList)
    }
  }, [myAnsweredPrayerList]);

  return (
    <React.Fragment>
      <HeaderBlack
        lessThenIcon
        Name={'ANSWERED'}
        navigation={navigation}
        noModal={true}
      />
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          {/* <Image
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
          </View> */}
          <Text style={styles.ActiveHeading}>Answered Prayers</Text>
          <Text style={styles.ActiveHeadingSub}>APPLICATION</Text>
          <View style={{ marginBottom: 10 }}>
            {myPrayers?.map((item, index) => {
              return (
                <MyAnsweredPrayerItem
                  item={item}
                  index={index}
                  navigation={navigation}
                  onPressPray={(index) => {
                    navigation.navigate("PrayerDetailScreen", { data: myPrayers, index: index, isEditable: true })
                  }}
                  onArchiveSuccess={(index) => {
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
    </React.Fragment>
  );
};

export default MyAnsweredPrayerScreen;
