import {StyleSheet, Dimensions, StatusBar, Platform} from 'react-native';
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
  // Additional styles for dynamic functionality
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ThemeColors.WHITE,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: ThemeColors.WHITE,
  },
  errorText: {
    color: ThemeColors.ERROR,
    fontFamily: ThemeFonts.REGULAR,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    padding: 10,
    backgroundColor: ThemeColors.PRIMARY,
    borderRadius: 5,
  },
  retryText: {
    color: ThemeColors.WHITE,
    fontFamily: ThemeFonts.MEDIUM,
  },
  noResults: {
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noResultsText: {
    fontFamily: ThemeFonts.REGULAR,
    fontSize: 16,
    color: ThemeColors.DARK_GRAY,
    textAlign: 'center',
  },
});