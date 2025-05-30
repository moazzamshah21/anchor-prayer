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
import styles from '../styles/FinishPrayingFinalStyle';
import BackHeader from '../components/BackHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
const {width} = Dimensions.get('window');

const FinishPrayingFinalScreen = ({navigation, route}) => {
  const Array = [
    {
      id: 1,
      Name: 'S',
    },
    {
      id: 1,
      Name: 'M',
    },
    {
      id: 1,
      Name: 'T',
    },
    {
      id: 1,
      Name: 'W',
    },
    {
      id: 1,
      Name: 'T',
    },
    {
      id: 1,
      Name: 'F',
    },
    {
      id: 1,
      Name: 'S',
    },
  ];
  return (
    <React.Fragment>
      <BackHeader navigation={navigation} title="Login Group" />
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          <View style={{marginTop: 30}}>
            <View style={[styles.FirstSectionView, {marginBottom: 10}]}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <ImageBackground
                  source={require('../../assets/images/burn.png')}
                  style={{
                    width: 200,
                    height: 200,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  resizeMode="contain">
                  <Image
                    source={require('../../assets/images/current.png')}
                    style={{
                      width: 35,
                      height: 55,
                      marginTop: -10,
                    }}
                    resizeMode="contain"
                  />
                  <Text style={styles.CurrentText}>CURRENT{'\n'}STREAK!</Text>
                </ImageBackground>
              </View>
              <ScrollView horizontal>
                <View style={styles.HorizontalView}>
                  {Array.map((item, index) => {
                    return (
                      <View
                        style={{
                          marginVertical: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                          paddingHorizontal: 10,
                        }}>
                        <Image
                          source={require('../../assets/images/shortcurrent.png')}
                          style={{
                            width: 10,
                            height: 15,
                          }}
                          resizeMode="contain"
                        />
                        <Text style={styles.DaysText}>{item.Name}</Text>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
              <View style={{marginBottom: 10}}>
                <View style={styles.GrayDividerTwo} />
              </View>
              <Text style={styles.HeadingText}>
                YOUR REGULAR PRAYER DISCIPLINE IS GROWING!
              </Text>
              <View style={styles.CenteredView}>
                <View>
                  <ImageBackground
                    source={require('../../assets/images/burn.png')}
                    style={{
                      width: 90,
                      height: 90,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    resizeMode="contain">
                    <Text style={styles.CurrentText}>3{'\n'}DAYS</Text>
                  </ImageBackground>
                  <Text style={[styles.LongestStreakText, {marginTop: -2}]}>
                    LONGEST{'\n'}STREAK
                  </Text>
                </View>
                <View>
                  <ImageBackground
                    source={require('../../assets/images/burn.png')}
                    style={{
                      width: 90,
                      height: 90,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    resizeMode="contain">
                    <Text style={styles.CurrentText}>0{'\n'}WEEKS</Text>
                  </ImageBackground>
                  <Text style={[styles.LongestStreakText, {marginTop: -2}]}>
                    PERFECT{'\n'}WEEKS
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.FirstSectionView}>
              <View style={{marginTop: 10, alignItems: 'center'}}>
                <Text style={styles.WeeklyText}>WEEKLY GOAL</Text>
                <ImageBackground
                  source={require('../../assets/images/round1.png')}
                  style={{
                    width: 124,
                    height: 124,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  resizeMode="contain">
                  <View style={{alignItems: 'center'}}>
                    <Text style={styles.NumbersTExt}>25</Text>
                    <Text style={styles.NumbersUbTExt}>Minutes</Text>
                  </View>
                </ImageBackground>
                <Text style={styles.completedText}>you've completed!</Text>
                <Text style={styles.weekText}>
                  25 out of 5 minutes this week.
                </Text>
                <Image
                  source={require('../../assets/images/pray5.png')}
                  style={{
                    width: 101,
                    height: 101,
                  }}
                  resizeMode="contain"
                />
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    width: width - 120,
                    alignSelf: 'center',
                    marginTop: -10,
                  }}>
                  <View>
                    <ImageBackground
                      source={require('../../assets/images/round1.png')}
                      style={{
                        width: 80,
                        height: 80,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      resizeMode="contain">
                      <View style={{alignItems: 'center'}}>
                        <Text style={styles.NumbersTExt2}>10</Text>
                        <Text style={styles.NumbersUbTExt2}>Times</Text>
                      </View>
                    </ImageBackground>
                    <Text style={styles.SessionText}>PRAYER{'\n'}SESSION</Text>
                  </View>
                  <View>
                    <ImageBackground
                      source={require('../../assets/images/round1.png')}
                      style={{
                        width: 80,
                        height: 80,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      resizeMode="contain">
                      <View style={{alignItems: 'center'}}>
                        <Text style={styles.NumbersTExt2}>2</Text>
                        <Text style={styles.NumbersUbTExt2}>Prayers</Text>
                      </View>
                    </ImageBackground>
                    <Text style={styles.SessionText}>PRAYER{'\n'}FOR</Text>
                  </View>
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    width: width - 120,
                    alignSelf: 'center',
                    marginVertical: 10,
                  }}>
                  <View>
                    <ImageBackground
                      source={require('../../assets/images/round1.png')}
                      style={{
                        width: 80,
                        height: 80,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      resizeMode="contain">
                      <View style={{alignItems: 'center'}}>
                        <Text style={styles.NumbersTExt2}>1</Text>
                        <Text style={styles.NumbersUbTExt2}>Times</Text>
                      </View>
                    </ImageBackground>
                    <Text style={styles.SessionText}>PRAYER{'\n'}SESSION</Text>
                  </View>
                  <View>
                    <ImageBackground
                      source={require('../../assets/images/round1.png')}
                      style={{
                        width: 80,
                        height: 80,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      resizeMode="contain">
                      <View style={{alignItems: 'center'}}>
                        <Text style={styles.NumbersTExt2}>29</Text>
                        <Text style={styles.NumbersUbTExt2}>Minutes</Text>
                      </View>
                    </ImageBackground>
                    <Text style={styles.SessionText}>PRAYER{'\n'}FOR</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.FirstSectionView, {marginVertical: 10}]}>
              <View style={styles.VarshView}>
                <Text style={styles.PrayginText}>PRAYING FOR OTHERS</Text>
              </View>
              <View style={[styles.VarshView2, {marginVertical: 30}]}>
                <View style={styles.RawView}>
                  <Text style={styles.ZeroText}>0</Text>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.ZeroSubText}>PRAYING FOR OTHERS</Text>
                  </View>
                </View>
                <View style={styles.RawView}>
                  <Text style={styles.ZeroText}>0</Text>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.ZeroSubText}>PRAYING FOR OTHERS</Text>
                  </View>
                </View>
                <View style={styles.RawView}>
                  <Text style={styles.ZeroText}>0</Text>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.ZeroSubText}>PRAYING FOR OTHERS</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.Datetext}>*Since 12/12/2023</Text>
            </View>
            <View style={[styles.FirstSectionView, {marginVertical: 10}]}>
              <View style={styles.VarshView}>
                <Text style={styles.PrayginText}>ANSWERED PRAYERS</Text>
              </View>
              <View style={[styles.VarshView2, {marginVertical: 30}]}>
                <View style={styles.RawView}>
                  <Text style={styles.ZeroText}>0</Text>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.ZeroSubText}>PRAYING FOR OTHERS</Text>
                  </View>
                </View>
                <View style={styles.RawView}>
                  <Text style={styles.ZeroText}>0</Text>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.ZeroSubText}>PRAYING FOR OTHERS</Text>
                  </View>
                </View>
                <View style={styles.RawView}>
                  <Text style={styles.ZeroText}>0</Text>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.ZeroSubText}>PRAYING FOR OTHERS</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.Datetext}>*Since 12/12/2023</Text>
            </View>
            <View style={[styles.FirstSectionView, {marginVertical: 10}]}>
              <View style={styles.VarshView}>
                <Text style={styles.PrayginText}>OTHER</Text>
              </View>
              <View style={[styles.VarshView2, {marginVertical: 30}]}>
                <View style={styles.RawView}>
                  <Text style={styles.ZeroText}>0</Text>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.ZeroSubText}>PRAYING FOR OTHERS</Text>
                  </View>
                </View>
                <View style={styles.RawView}>
                  <Text style={styles.ZeroText}>0</Text>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.ZeroSubText}>PRAYING FOR OTHERS</Text>
                  </View>
                </View>
                <View style={styles.RawView}>
                  <Text style={styles.ZeroText}>0</Text>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.ZeroSubText}>PRAYING FOR OTHERS</Text>
                  </View>
                </View>
              </View>
              <Text style={styles.Datetext}>*Since 12/12/2023</Text>
            </View>
          </View>
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

export default FinishPrayingFinalScreen;
