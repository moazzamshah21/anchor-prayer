import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
const {width, height} = Dimensions.get('window');
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export default StyleSheet.create({
  ScrollViewContentContainerStyle: {
    flex: 1,
    backgroundColor: ThemeColors.WHITE,
  },
  MainContainer: {
    flex: 1,
    backgroundColor: ThemeColors.WHITE,
  },
  PageTitleView: {
    paddingHorizontal: 15,
  },
  PageMainTitle: {
    fontSize: 15,
    paddingVertical: 20,
    textAlign: 'center',
    fontFamily: ThemeFonts.SEMI_BOLD,
    color: ThemeColors.BLACK,
    marginTop: 30,
  },
  PageSubTitle: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: ThemeFonts.MEDIUM,
    color: ThemeColors.BLACK,
    paddingHorizontal: 12,
  },
  HomeItemView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  HomeItemMainLayer: {
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HomeItemFirstLayer: {
    height: 101,
    width: 101,
    backgroundColor: '#e8e8e8',
    borderRadius: 25,
    transform: [{rotate: '45deg'}],
    justifyContent: 'center',
    alignItems: 'center',
  },
  HomeItemSecondLayer: {
    height: 96,
    width: 96,
    backgroundColor: '#ABD6DF',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  HomeItemThirdLayer: {
    height: 92,
    width: 92,
    backgroundColor: '#73B541',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  LogoText: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: ThemeFonts.MEDIUM,
    color: ThemeColors.BLACK,
  },
  BibleReference: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 5,
    fontWeight: '900',
  },
});
