import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
const {width, height} = Dimensions.get('window');
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export default StyleSheet.create({
  ScrollViewContentContainerStyle: {
    flex: 1,
  },
  MainContainer: {
    flex: 1,
    backgroundColor: ThemeColors.WHITE,
  },
  NotificationsText: {
    fontSize: 20,
    fontFamily: ThemeFonts.SEMI_BOLD,
    color: ThemeColors.BLACK,
  },
  RealTimeText: {
    fontSize: 15,
    fontFamily: ThemeFonts.MEDIUM,
    color: ThemeColors.BLACK,
  },
  GrayDivider: {
    height: 1,
    width: width,
    backgroundColor: ThemeColors?.DARK_GRAY,
    alignSelf: 'center',
  },
  SaveAndContinueBtn: {
    backgroundColor: '#ABD6DF',
    width: width - 50,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  SaveTExt: {
    fontSize: 20,
    fontFamily: ThemeFonts.MEDIUM,
    color: ThemeColors.BLACK,
  },
  LogoText: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: ThemeFonts.MEDIUM,
    color: ThemeColors.BLACK,
  },
});
