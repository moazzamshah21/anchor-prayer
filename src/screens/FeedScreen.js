import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,
  TextInput,
} from 'react-native';
import styles from '../styles/FeedStyle';
import BackHeader from '../components/BackHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
const {width} = Dimensions.get('window');

const FeedScreen = ({navigation, route}) => {
  // const Array = [
  //   {
  //     id: 1,
  //   },
  //   {
  //     id: 2,
  //   },
  //   {
  //     id: 3,
  //   },
  //   {
  //     id: 4,
  //   },
  //   {
  //     id: 5,
  //   },
  // ];
  return (
    <React.Fragment>
      <BackHeader navigation={navigation} title="Feeds" />
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          <View style={{paddingHorizontal: 20, marginTop: 20}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CreateFeedScreen'); // Changed from CreatePrayScreen to CreateFeedScreen
              }}
              style={styles.CreateAddBTnView}>
              <Text style={styles.CreateAddBTnText}>Create/Add Feed</Text>
            </TouchableOpacity>
            {/* <View style={styles.SearchFieldView}>
              <AntDesign
                name="search1"
                style={{color: ThemeColors.DARK_GRAY}}
                size={20}
              />
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '85%',
                }}>
                <TextInput
                  placeholder="Search For Feed"
                  placeholderTextColor={ThemeColors?.DARK_GRAY}
                  style={{
                    textAlign: 'center',
                    fontSize: 15,
                    textAlign: 'center',
                    fontFamily: ThemeFonts.MEDIUM,
                    color: ThemeColors?.DARK_GRAY,
                    width: '100%',
                    paddingLeft: 20,
                  }}
                />
              </View>
            </View> */}
            <View style={{marginTop: 20}}>
              <Text style={styles.FeaturedText}>Featured</Text>
              <Image
                source={require('../../assets/images/selected.png')}
                style={{width: width - 50, height: width / 2 + 50}}
                resizeMode="contain"
              />
              {/* <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ActivePrayerScreen');
                }}
                style={{marginTop: -75, marginLeft: -20}}>
                <ImageBackground
                  source={require('../../assets/images/blackbg.png')}
                  style={{
                    width: 120,
                    height: 120,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  resizeMode="contain">
                  <Image
                    source={require('../../assets/images/blackbook.png')}
                    style={{width: 28, height: 20}}
                    resizeMode="contain"
                  />
                </ImageBackground>
              </TouchableOpacity> */}
            </View>
          </View>
          {/* <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View style={{flexDirection: 'row'}}>
              {Array.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('ActivePrayerScreen');
                    }}
                    style={{alignItems: 'center'}}>
                    <ImageBackground
                      source={require('../../assets/images/blackbg.png')}
                      style={{
                        width: 110,
                        height: 110,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      resizeMode="contain">
                      <Image
                        source={require('../../assets/images/blackbook.png')}
                        style={{width: 28, height: 20}}
                        resizeMode="contain"
                      />
                    </ImageBackground>
                    <Text style={styles.HealingText}>Healing{'\n'}Pray</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView> */}
          <View style={{paddingTop: 15}}>
            <View style={styles.GrayDivider} />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('FeedsListScreen');
              }}>
              <Text style={styles.AnchorText}>Anchor Feeds</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={{paddingTop: 15}}>
            <View style={styles.GrayDivider} />
            <Text style={styles.AnchorText}>Churches</Text>
          </View>
          <View style={{paddingTop: 15}}>
            <View style={styles.GrayDivider} />
            <Text style={styles.AnchorText}>Organization</Text>
          </View>
          <View style={{paddingTop: 15, marginBottom: 20}}>
            <View style={styles.GrayDivider} />
            <Text style={styles.AnchorText}>Groups</Text>
          </View> */}
        </View>

        <View style={{alignItems: 'center', marginBottom: 10}}>
          <Text style={styles.LogoText}>
            Designed by:{'\n'}digitalsoftwarelabs.com
          </Text>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default FeedScreen;
