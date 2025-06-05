import {StyleSheet, Dimensions} from 'react-native';
import {ThemeColors, ThemeFonts} from '../utils/Theme';

const {width} = Dimensions.get('window');

// Fallback colors if ThemeColors are undefined
const colors = {
  primary: ThemeColors.PRIMARY || '#6DA75B',
  white: ThemeColors.WHITE || '#FFFFFF',
  black: ThemeColors.BLACK || '#000000',
  darkGray: ThemeColors.DARK_GRAY || '#333333',
  lightGray: ThemeColors.LIGHT_GRAY || '#F5F5F5',
  error: ThemeColors.ERROR || '#FF0000',
};

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  searchField: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  searchIcon: {
    color: colors.darkGray,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: ThemeFonts.MEDIUM,
    color: colors.darkGray,
    paddingVertical: 0,
  },
  feedsListContainer: {
    margin: 20,
  },
  feedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 0,
    marginBottom: 10,
    backgroundColor: colors.darkGray['50'] || '#F0F0F0',
    borderRadius: 10,
  },
  feedIconContainer: {
    marginRight: 15,
  },
  feedIconBackground: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
  },
  feedIcon: {
    width: 20,
    height: 14,
    marginTop: -5,
  },
  feedTextContainer: {
    flex: 1,
  },
  feedTitle: {
    fontSize: 16,
    fontFamily: ThemeFonts.MEDIUM,
    color: colors.black,
    marginBottom: 5,
  },
  feedStatsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heartIcon: {
    width: 10,
    height: 10,
  },
  likeIcon: {
    width: 10,
    height: 10,
    marginLeft: -2,
  },
  viewedText: {
    fontSize: 10,
    fontFamily: ThemeFonts.MEDIUM,
    color: colors.black,
    marginLeft: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.white,
  },
  errorText: {
    color: colors.error,
    fontFamily: ThemeFonts.REGULAR,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 5,
  },
  retryText: {
    color: colors.white,
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
    color: colors.darkGray,
    textAlign: 'center',
  },
});