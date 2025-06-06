import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ImageBackground, 
  Image, 
  Dimensions,
  Animated,
  ActivityIndicator
} from 'react-native';
import styles from '../styles/PrayerDetailStyle';
import HeaderBlack from '../components/HeaderBlack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import PrayerService from '../services/Prayer/PrayerService';
import { showMessage } from 'react-native-flash-message';
import { useDispatch } from 'react-redux';
import * as commonAction from '../actions/Common/CommonAction';

const { width } = Dimensions.get('window');

const MyPrayerDetailScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const headerAnim = useRef(new Animated.Value(-100)).current;
  const footerAnim = useRef(new Animated.Value(100)).current;
  const dispatch = useDispatch();

  // Check for valid params
  if (!route.params || !route.params.prayerData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Prayer data not available</Text>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { prayerData, isEditable } = route.params;

  useEffect(() => {
    if (isVisible) {
      animateHeaderFooter(true);
      const timer = setTimeout(() => {
        animateHeaderFooter(false);
        setIsVisible(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const animateHeaderFooter = (show) => {
    Animated.timing(headerAnim, {
      toValue: show ? 0 : -100,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(footerAnim, {
      toValue: show ? 0 : 100,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const showHeaderAndFooter = () => {
    setIsVisible(true);
  };

  const handleOnPressBack = () => {
    navigation.goBack();
  };

  const onPressAnswered = async () => {
    if (!prayerData?._id) {
      showMessage({
        message: 'Invalid prayer data',
        type: 'danger',
      });
      return;
    }

    try {
      setIsLoading(true);
      var payload = {
        id: prayerData._id,
      };
      var response = await PrayerService.AnsweredPrayer(payload);
      if (response?.success) {
        showMessage({
          message: response?.message || 'Prayer marked as answered',
          type: 'success',
        });
        dispatch(commonAction.fetchMyPrayers());
        dispatch(commonAction.fetchMyAchivedPrayers());
        dispatch(commonAction.fetchMyAnsweredPrayers());
        navigation.goBack();
      } else {
        showMessage({
          message: response?.message || 'Failed to mark prayer as answered',
          type: 'danger',
        });
      }
    } catch (error) {
      showMessage({
        message: 'An error occurred',
        type: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <React.Fragment>
      <View style={styles.MainContainer}>
        <ImageBackground 
          source={require('../../assets/images/gradient-background.png')}
          style={{ width: '100%', height: '100%' }}
        >
          <TouchableOpacity 
            activeOpacity={1} 
            onPress={showHeaderAndFooter}
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Image
                source={require('../../assets/images/pray2.png')}
                style={{ width: 108, height: 84 }}
                resizeMode="contain"
              />
              <Text style={styles.HelloFamilyText}>{prayerData?.title || 'Untitled Prayer'}</Text>
              <Text style={styles.prayerBody}>{prayerData?.body || ''}</Text>
              {prayerData?.description && (
                <Text style={[styles.prayerDescription, { color: 'white' }]}>
                  {prayerData.description}
                </Text>
              )}
            </View>
          </TouchableOpacity>

          {/* Header */}
          <Animated.View style={[styles.header, { transform: [{ translateY: headerAnim }] }]}>
            <View style={styles.headerContainer}>
              <View style={styles.headerIconBox}>
                <TouchableOpacity onPress={handleOnPressBack}>
                  <FontAwesome5 name="angle-left" style={{ color: 'white' }} size={25} />
                </TouchableOpacity>
              </View>
              <View style={styles.headerContentBox}>
                <Text style={styles.headerText}>MY PRAYER</Text>
                <Text style={styles.headerSubText}>Personal Prayer</Text>
              </View>
              <View style={styles.headerIconBox} />
            </View>
          </Animated.View>

          {/* Footer */}
          <Animated.View style={[styles.footer, { transform: [{ translateY: footerAnim }] }]}>
            <View style={styles.headerContainer}>
              <View style={styles.headerIconBox}>
                {!prayerData?.isAnswered && isEditable && (
                  <TouchableOpacity onPress={onPressAnswered}>
                    <Feather name="check" style={{ color: 'white' }} size={25} />
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.headerContentBox} />
              <View style={styles.headerIconBox}>
                <TouchableOpacity onPress={() => navigation.navigate('PrayerTimerScreen')}>
                  <Ionicons name="timer-outline" style={{ color: 'white' }} size={25} />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </ImageBackground>
      </View>
    </React.Fragment>
  );
};

export default MyPrayerDetailScreen;