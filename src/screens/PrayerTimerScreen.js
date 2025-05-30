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
import styles from '../styles/PrayerTimerStyle';
import BackHeader from '../components/BackHeader';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
const {width} = Dimensions.get('window');

const PrayerTimerScreen = ({navigation, route}) => {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isActive && !isPaused) {
      intervalRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // Timer completed
          clearInterval(intervalRef.current);
          setIsActive(false);
          // You could add a sound or vibration here
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, isPaused, minutes, seconds]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setIsPaused(false);
    setMinutes(1);
    setSeconds(0);
  };

  const increaseTime = () => {
    setMinutes(prev => Math.min(prev + 1, 60)); // Limit to 60 minutes
  };

  const decreaseTime = () => {
    setMinutes(prev => Math.max(prev - 1, 1)); // Minimum 1 minute
  };

  const formatTime = () => {
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <React.Fragment>
      <BackHeader navigation={navigation} title="PRAYER TIMER" />
      <ScrollView
        contentContainerStyle={styles.ScrollViewContentContainerStyle}
        showsVerticalScrollIndicator={false}>
        <View style={styles.MainContainer}>
          <View style={{justifyContent: 'space-between', flex: 0.7}}>
            <View style={{marginTop: 30}}>
              <Text style={styles.HowLongText}>
                How long would you like to pray?
              </Text>
            </View>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
                marginVertical: 20,
              }}>
              <TouchableOpacity onPress={decreaseTime}>
                <AntDesign name="minuscircle" size={30} color={ThemeColors.BLACK} />
              </TouchableOpacity>

              <ImageBackground
                source={require('../../assets/images/timer.png')}
                style={{
                  width: 194,
                  height: 194,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginHorizontal: 20,
                }}
                resizeMode="contain">
                <Text style={styles.MinuteText}>
                  {formatTime()}
                </Text>
              </ImageBackground>

              <TouchableOpacity onPress={increaseTime}>
                <AntDesign name="pluscircle" size={30} color={ThemeColors.BLACK} />
              </TouchableOpacity>
            </View>

            {!isActive ? (
              <TouchableOpacity
                onPress={handleStart}
                style={{alignItems: 'center', justifyContent: 'center'}}>
                <ImageBackground
                  source={require('../../assets/images/round1.png')}
                  style={{
                    width: 101,
                    height: 101,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  resizeMode="contain">
                  <Text style={styles.MinuteText}>START</Text>
                </ImageBackground>
              </TouchableOpacity>
            ) : (
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                {isPaused ? (
                  <TouchableOpacity
                    onPress={handleResume}
                    style={{marginHorizontal: 10}}>
                    <ImageBackground
                      source={require('../../assets/images/round1.png')}
                      style={{
                        width: 101,
                        height: 101,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      resizeMode="contain">
                      <Text style={styles.MinuteText}>RESUME</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={handlePause}
                    style={{marginHorizontal: 10}}>
                    <ImageBackground
                      source={require('../../assets/images/round1.png')}
                      style={{
                        width: 101,
                        height: 101,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      resizeMode="contain">
                      <Text style={styles.MinuteText}>PAUSE</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  onPress={handleReset}
                  style={{marginHorizontal: 10}}>
                  <ImageBackground
                    source={require('../../assets/images/round1.png')}
                    style={{
                      width: 101,
                      height: 101,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    resizeMode="contain">
                    <Text style={styles.MinuteText}>RESET</Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
        <View style={{alignItems: 'center', marginBottom: 10}}>
          <Image 
            source={require('../../assets/images/anchor.png')}
            style={{width: 37, height: 45}}
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

export default PrayerTimerScreen;