import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
const {width, height} = Dimensions.get('window');
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export default StyleSheet.create({
  ScrollViewContentContainerStyle: {
    flex: 1,
    backgroundColor: ThemeColors?.WHITE,
  },
  MainContainer: {
    flex: 1,
    backgroundColor: ThemeColors.WHITE,
    alignItems: 'center',
  },
  DonateUsText: {
    fontSize: 25,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.SEMI_BOLD,
    textAlign: 'center',
  },
  DonatePriceView: {
    width: 82,
    height: 54,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: ThemeColors?.DARK_GRAY,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  DonatePriceText: {
    fontSize: 17,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.SEMI_BOLD,
  },
  GiftText: {
    fontSize: 18,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.REGULAR,
  },
  DonateNowBtn: {
    paddingHorizontal: 40,
    backgroundColor: ThemeColors?.BLACK,
    paddingVertical: 17,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  DonateNowBtnText: {
    fontSize: 18,
    color: ThemeColors.WHITE,
    fontFamily: ThemeFonts.REGULAR,
  },
  LogoText: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: ThemeFonts.MEDIUM,
    color: ThemeColors.BLACK,
  },
  DonateNowBtn2: {
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  DonateNowBtnText2: {
    fontSize: 14,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.REGULAR,
    textDecorationLine: 'underline',
    fontStyle: 'italic',
  },
  NodataFoundText: {
    fontSize: 14,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.REGULAR,
  },
  ReminderListMainView: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 15,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: ThemeColors?.BLACK,
    marginVertical: 5,
    width: width - 50,
    justifyContent: 'space-between',
  },
  ReminderNameText: {
    fontSize: 15,
    fontFamily: ThemeFonts.SEMI_BOLD,
    color: ThemeColors.BLACK,
  },
  ReminderNameText2: {
    fontSize: 12,
    fontFamily: ThemeFonts.REGULAR,
    color: ThemeColors.BLACK,
  },
});
