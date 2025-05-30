import {StyleSheet, Dimensions} from 'react-native';
import {ThemeColors, ThemeFonts} from '../utils/Theme';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  ScrollViewContentContainerStyle: {
    minHeight: height - 24,
  },
  MainContainer: {
    flex: 1,
    backgroundColor: ThemeColors.WHITE,
  },
  EmailIconContainer: {
    width: width,
    height: width - 50,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  AppLogoImage: {
    width: 35,
    height: 35,
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 10,
  },
  VerifyEmailIconImage: {
    width: width - 100,
    height: width - 100,
  },
  ContentContainer: {
    backgroundColor: ThemeColors.WHITE,
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  TitleText: {
    textAlign: 'center',
    color: ThemeColors.BLACK,
    fontFamily: ThemeFonts.SEMI_BOLD,
    fontSize: 20,
  },
  SubTitleText: {
    textAlign: 'center',
    color: ThemeColors.GRAY,
    fontFamily: ThemeFonts.REGULAR,
    fontSize: 18,
  },
  ResendCodeTextContainer: {
    marginVertical: 15,
  },
  ResendCodeTextTouch: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  ResendCodeText: {
    fontSize: 18,
    color: ThemeColors.DARK_GRAY,
    fontFamily: ThemeFonts.MEDIUM,
  },
  ChangeEmailTextContainer: {
    marginVertical: 15,
  },
  ChangeEmailTextTouch: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  ChangeEmailText: {
    fontSize: 18,
    color: ThemeColors.DARK_GRAY,
    fontFamily: ThemeFonts.MEDIUM,
    textDecorationLine: 'underline',
  },
  centeredView: {
    flex: 1,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000e8',
  },
  modalView: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: width - 40,
    borderRadius: 30,
    borderColor: '#FFF',
    borderWidth: 1,
    paddingVertical: 15,
    paddingBottom: 25
  },
  ModalTextStyle: {
    fontSize: 18,
    color: ThemeColors.DARK_GRAY,
    fontFamily: ThemeFonts.MEDIUM,
    marginBottom: 10,
    textAlign: 'center',
  },

});
