import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { ThemeColors, ThemeFonts } from '../utils/Theme';
const { width, height } = Dimensions.get('window');
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export default StyleSheet.create({
  ScrollViewContentContainerStyle: {
    //minHeight: height - statusBarHeight,
    backgroundColor: '#73B541',
  },
  MainContainer: {
    flex: 1,
    backgroundColor: '#73B541',
    justifyContent: 'center',
    alignItems: 'center',
  },
  CreateAddBTnView: {
    borderRadius: 10,
    borderColor: '#6DA75B',
    borderWidth: 1,
    borderStyle: 'dashed',
    paddingVertical: 15,
  },
  CreateAddBTnText: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: ThemeFonts.REGULAR,
    color: '#6DA75B',
  },
  SearchFieldView: {
    borderRadius: 10,
    paddingVertical: 6,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  FeaturedText: {
    fontSize: 15,
    fontFamily: ThemeFonts.REGULAR,
    color: ThemeColors?.BLACK,
  },
  HealingText: {
    fontSize: 15,
    fontFamily: ThemeFonts.SEMI_BOLD,
    color: ThemeColors?.BLACK,
    textAlign: 'center',
  },
  GrayDivider: {
    width: width,
    height: 1,
    backgroundColor: ThemeColors?.DARK_GRAY,
  },
  AnchorText: {
    fontSize: 15,
    fontFamily: ThemeFonts.MEDIUM,
    color: ThemeColors?.BLACK,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  LogoText: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: ThemeFonts.MEDIUM,
    color: ThemeColors.BLACK,
  },
  HelloText: {
    fontSize: 16,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
  },
  ViewedText: {
    fontSize: 6,
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.MEDIUM,
    marginLeft: 5,
  },
  HelloFamilyText: {
    fontSize: 25,
    color: ThemeColors.WHITE,
    fontFamily: ThemeFonts.SEMI_BOLD,
    marginTop: 10,
  },
  CommentBoxStyle: {
    flexGrow: 1,
    backgroundColor: '#D1E6C0',
    borderRadius: 30,
    paddingHorizontal: 25,
    width: 42,
    height: 42,
  },
  PrayNowBtnText: {
    fontSize: 12,
    color: ThemeColors.DARK_GRAY,
    fontFamily: ThemeFonts.SEMI_BOLD,
  },
  PrayNowBtn: {
    borderRadius: 25,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  EditThisView: {
    backgroundColor: '#5D9335',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  PrayerText: {
    fontSize: 15,
    color: ThemeColors.WHITE,
    fontFamily: ThemeFonts.REGULAR,
  },
});
