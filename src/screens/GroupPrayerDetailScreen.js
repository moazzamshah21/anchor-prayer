import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ImageBackground, 
  Image, 
  Dimensions,
  Animated
} from 'react-native';
import styles from '../styles/PrayerDetailStyle';
import HeaderBlack from '../components/HeaderBlack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const GroupPrayerDetailScreen = ({ navigation, route }) => {
  const { prayerData, title } = route.params;
  const [isVisible, setIsVisible] = useState(false);
  const headerAnim = useRef(new Animated.Value(-100)).current;
  const footerAnim = useRef(new Animated.Value(100)).current;

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
              <Text style={styles.HelloFamilyText}>{prayerData.title}</Text>
              <Text style={styles.HelloFamilyText2}>{prayerData.description}</Text>
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
                <Text style={styles.headerText}>{title}</Text>
                <Text style={styles.headerSubText}>Group Prayer</Text>
              </View>
              <View style={styles.headerIconBox} />
            </View>
          </Animated.View>

          {/* Footer */}
          <Animated.View style={[styles.footer, { transform: [{ translateY: footerAnim }] }]}>
            <View style={styles.headerContainer}>
              <View style={styles.headerIconBox} />
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

export default GroupPrayerDetailScreen;