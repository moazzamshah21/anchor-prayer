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
    justifyContent: 'center',
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
