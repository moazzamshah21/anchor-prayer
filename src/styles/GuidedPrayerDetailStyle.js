export default StyleSheet.create({
  ScrollViewContentContainerStyle: {
    flex: 1,
    backgroundColor: ThemeColors.WHITE,
  },
  MainContainer: {
    flex: 1,
    backgroundColor: ThemeColors.WHITE,
    justifyContent: 'center',
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
  AddictionText: {
    fontSize: 14,
    fontFamily: ThemeFonts.REGULAR,
    color: ThemeColors.WHITE,
    marginTop: 5,
  },
  LogoText: {
    fontSize: 15,
    textAlign: 'center',
    fontFamily: ThemeFonts.MEDIUM,
    color: ThemeColors.BLACK,
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