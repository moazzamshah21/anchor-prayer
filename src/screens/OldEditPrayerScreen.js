import React, {useState, useRef, useEffect} from 'react';
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
import styles from '../styles/EditPrayerStyle';
import BackHeader from '../components/BackHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
const {width} = Dimensions.get('window');

const OldEditPrayerScreen = ({navigation, route}) => {
  const {PrayStarted, item} = route?.params;
  const [timerClosed, setTimerClosed] = useState(false);

  useEffect(() => {
    setTimerClosed(false);
  }, [PrayStarted]);

  return (
    <React.Fragment>
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/pray2.png')}
              style={{width: 108, height: 84}}
              resizeMode="contain"
            />
            <Text style={styles.HelloFamilyText}>{item?.title}</Text>
          </View>
        </View>
        <View>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.EditThisView}>
              <Text style={styles.PrayerText}>EDIT THIS PRAYER</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: width - 50,
              alignSelf: 'center',
              marginVertical: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PrayerListScreen');
              }}>
              <Entypo
                name="menu"
                style={{color: ThemeColors.WHITE}}
                size={28}
              />
            </TouchableOpacity>
            {PrayStarted == 'Yes' && timerClosed == false && (
              <TouchableOpacity
                onPress={() => {
                  setTimerClosed(true);
                }}
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  source={require('../../assets/images/Layer2.png')}
                  style={{width: 23, height: 23}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
            {PrayStarted == 'Yes' && timerClosed == false ? (
              <Text
                style={[
                  styles.PrayerText,
                  {color: '#9DCC7A', fontFamily: ThemeFonts.SEMI_BOLD},
                ]}>
                00:60
              </Text>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('PrayerTimerScreen');
                }}>
                <Image
                  source={require('../../assets/images/clock.png')}
                  style={{width: 23, height: 23}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

export default OldEditPrayerScreen;
