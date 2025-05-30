import { StyleSheet } from 'react-native';
import { ThemeColors, ThemeFonts } from '../utils/Theme';

export default StyleSheet.create({
  ScrollViewContentContainerStyle: {
    flexGrow: 1,
    backgroundColor: ThemeColors.WHITE,
  },
  MainContainer: {
    flex: 1,
    backgroundColor: ThemeColors.WHITE,
    paddingHorizontal: 15,
  },
  PageTitleView: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  PageMainTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: ThemeColors.BLACK,
    marginTop: 20,
  },
  HomeItemView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  HomeItemMainLayer: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  AddictionText: {
    fontSize: 11,
    fontFamily: ThemeFonts.REGULAR,
    color: ThemeColors.WHITE,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  LogoText: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: ThemeFonts.MEDIUM,
    color: ThemeColors.BLACK,
    marginTop: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ThemeColors.WHITE,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: ThemeFonts.REGULAR,
    color: ThemeColors.BLACK,
  },
});