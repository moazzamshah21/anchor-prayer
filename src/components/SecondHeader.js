import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from 'react-native';
import React from 'react';
import { GradientColors, ThemeColors, ThemeFonts } from '../utils/Theme';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';
import EntypoIcon from 'react-native-vector-icons/Entypo';
const { width, height } = Dimensions.get('window');

const SecondHeader = ({ navigation, title = "", subTitle = "", backButtonGradient = GradientColors.GREEN, backButtonColor = '#5da441' }) => {

  const handleOnPressMenu = () => {
    navigation.goBack();
  }

  return (
    <View
      style={styles.MainContainer}>
      <LinearGradient
        colors={GradientColors.GREEN}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.LinearGradientContainer}>
        <View style={styles.IconView}>
          <View style={styles.IconRing}>
            <TouchableOpacity onPress={handleOnPressMenu}>
              <LinearGradient
                colors={backButtonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.IconCircleLinearGradient}>
                <View style={[styles.IconCircle, { backgroundColor: backButtonColor }]}>
                  <EntypoIcon name="chevron-small-left" style={{ color: ThemeColors.WHITE }} size={30} />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.TextView}>
          <Text style={styles.MainTitleText}>{title}</Text>
          <Text style={styles.SubTitleText}>{subTitle}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

export default SecondHeader;

const styles = StyleSheet.create({
  MainContainer: {
    height: 100,
    backgroundColor: ThemeColors?.WHITE,
    flexDirection: 'row',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    overflow: 'hidden'
  },
  LinearGradientContainer: {
    height: 100,
    width: width,
    flexDirection: 'row'
  },
  IconView: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  IconRing: {
    width: 53,
    height: 53,
    borderRadius: 53 / 2,
    borderWidth: 1,
    borderColor: ThemeColors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  IconCircleLinearGradient: {
    width: 53,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center'
  },
  IconCircle: {
    width: 43,
    height: 43,
    borderRadius: 43 / 2,
    backgroundColor: '#59a03d',
    justifyContent: 'center',
    alignItems: 'center'
  },
  TextView: {
    height: 100,
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  MainTitleText: {
    textAlign: 'right',
    color: ThemeColors.WHITE,
    fontFamily: ThemeFonts.SEMI_BOLD,
    fontSize: 20
  },
  SubTitleText: {
    textAlign: 'right',
    color: ThemeColors.WHITE,
    fontFamily: ThemeFonts.MEDIUM,
    fontSize: 10,
    opacity: 0.6
  },
  ProfileText: {
    fontSize: 15,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
  },
});
