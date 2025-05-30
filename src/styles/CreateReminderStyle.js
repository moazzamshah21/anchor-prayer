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
    justifyContent: 'center',
    flexGrow: 1,
  },
  MainBody: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  MainIconImage: {
    height: 120,
  },
  AddIconImage: {
    height: 80,
  },
  CreateGroupText: {
    paddingVertical: 15,
    fontSize: 20,
    fontFamily: ThemeFonts.REGULAR,
    textAlign: 'center',
    color: ThemeColors.BLACK,
  },
  CompanyBrandingText: {
    fontFamily: ThemeFonts.MEDIUM,
    color: ThemeColors.BLACK,
    fontSize: 15,
    textAlign: 'center',
    paddingBottom: 15,
    paddingTop: 30,
  },
  CalenderView1: {
    marginTop: 30,
  },
  TextInputStyle: {
    width: width - 40,
    height: 51,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    marginTop: 10,
  },
  BtnStyleView: {
    width: width - 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ABD6DF',
    borderRadius: 10,
  },
  ReminderNameTexr: {
    fontSize: 15,
    fontFamily: ThemeFonts.BOLD,
    color: ThemeColors.BLACK,
    textAlign: 'center',
  },
});
