import { StyleSheet, Dimensions, StatusBar } from 'react-native';
import { ThemeColors, ThemeFonts } from '../utils/Theme';
const { width, height } = Dimensions.get('window');
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

export default StyleSheet.create({
  ScrollViewContentContainerStyle: {
    //flex: 1,
    minHeight: height,
    backgroundColor: ThemeColors.WHITE,
  },
  MainContainer: {
    flex: 1,
    backgroundColor: ThemeColors.WHITE,
    paddingBottom: 60
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
    marginHorizontal: 10,
    marginVertical: 10,
  },
  HomeItemFirstLayer: {
    height: 101,
    width: 101,
    backgroundColor: '#e8e8e8',
    borderRadius: 25,
    transform: [{ rotate: '45deg' }],
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
  AddictionText: {
    fontSize: 10,
    fontFamily: ThemeFonts.SEMI_BOLD,
    color: ThemeColors.WHITE,
    marginTop: 5,
  },
  DescText: {
    fontSize: 20,
    fontFamily: ThemeFonts.REGULAR,
    color: ThemeColors.BLACK,
    marginTop: 8,
    textAlign: 'center',
  },
  DividerView: {
    width: width,
    height: 1,
    backgroundColor: '#707070',
    opacity: 0.3
  },
  ImagesText: {
    fontSize: 10,
    fontFamily: ThemeFonts.REGULAR,
    color: ThemeColors.BLACK,
    marginTop: 15,
  },
  contentContainerStyle: {
    width: width - 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  centeredViewSimple: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 30,
    alignSelf: 'center',
    paddingBottom: 50
  },
  centeredView: {
    flex: 1,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000c1',
  },
  modalView: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: width - 40,
    borderRadius: 30,
    borderColor: '#FFF',
    borderWidth: 1,
    paddingVertical: 40,
  },
  ModalTextStyle: {
    fontSize: 18,
    color: ThemeColors.DARK_GRAY,
    fontFamily: ThemeFonts.MEDIUM,
    marginBottom: 10,
    textAlign: 'center',
  },
  ButtonView: {
    width: width,
    height: 60,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0
  },
  ActionButton: {
    width: (width/ 2) -40,
    height: 50,
    flexDirection: 'row',
    backgroundColor: "#ECECEC",
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    justifyContent: 'center',
    alignItems:'center'
  },
  ActionButtonText:{
    fontSize: 14,
    color: ThemeColors.DARK_GRAY,
    fontFamily: ThemeFonts.MEDIUM,
  }
});
